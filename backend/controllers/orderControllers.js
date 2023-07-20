import getRawBody from "raw-body";
import axios from "axios";
import Order from "../models/order";
import APIFilters from "../utils/APIFilters";
import ErrorHandler from "../utils/errorHandler";


export const getOrders = async (req, res) => {
  const resPerPage = 2;
  const ordersCount = await Order.countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query.find().populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.query.id).populate(
    "shippingInfo user"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    order,
  });
};

export const myOrders = async (req, res) => {
  const resPerPage = 2;
  const ordersCount = await Order.countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query
    .find({ user: req.user._id })
    .populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

export const updateOrder = async (req, res) => {
  let order = await Order.findById(req.query.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  order = await Order.findByIdAndUpdate(req.query.id, {
    orderStatus: req.body.orderStatus,
  });

  res.status(200).json({
    success: true,
    order,
  });
};

export const deleteOrder = async (req, res) => {
  let order = await Order.findById(req.query.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
};

export const canReview = async (req, res) => {
  const productId = req.query.productId;

  const orders = await Order.find({
    user: req?.user?._id,
    "orderItems.product": productId,
  });

  let canReview = orders?.length >= 1 ? true : false;

  res.status(200).json({
    canReview,
  });
};

export const checkoutSession = async (req, res) => {
  const body = req?.body;
  const paymentOptions = {
    publicKey: `${process.env.SEERBIT_PUBLIC_KEY}`,
    currency: "NGN",
    country: "NG",
    amount: body?.totalAmount,
    email: req?.user?.email,
    name: req?.user?.name,
    productId: "",
    callbackUrl: `${process.env.API_URL}/me/orders?order_success=true`,
    paymentReference: `${new Date().getTime()}${req?.user?._id}`,
    productDescription: "",
  };

  const pp = {
    publicKey: `${process.env.SEERBIT_PUBLIC_KEY}`,
    amount: "5000.00",
    currency: "NGN",
    country: "NG",
    paymentReference: "643108207792124616573324",
    email: "test@emaildomain.com",
    productId: "64310880-2708933-427", //optional
    productDescription: "product description", //optional
    callbackUrl: "http:yourwebsite.com",
  };

  try {
    let authToken;
    await axios
      .post(`${process.env.SEERBIT_BASE_URL}/encrypt/keys`, {
        key: `${process.env.SEERBIT_PRIVATE_KEY}.${process.env.SEERBIT_PUBLIC_KEY}`,
      })
      .then(
        (res) => (authToken = res?.data?.data.EncryptedSecKey?.encryptedKey)
      );
    // console.log(authToken);
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${process.env.SEERBIT_BASE_URL}/payments`,
      paymentOptions,
      config
    );
    console.log(response);

    const data = response?.data;
    console.log(data);
    res.status(200).json({
      url: data.payments.redirectLink,
    });
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.status(500).json({ error: `Error fetching data from API: ${error}` });
  }
};



async function getCartItems(line_items) {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
}

export const webhook = async (req, res) => {
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );

      const orderItems = await getCartItems(line_items);
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };

      const order = await Order.create(orderData);
      res.status(201).json({ success: true });
    }
  } catch (error) {
    console.error(error);
  }
};
