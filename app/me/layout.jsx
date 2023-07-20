import { Divider, Sidebar } from "@/components/layouts";

// export const metadata = {
//   title: "Store",
//   description: "Store - The place for all your purchases.",
// };
export default function UserLayout({ children }) {
  return (
    <body suppressHydrationWarning={true}>
      <section className="sm:py-7 bg-background shadow space-y-6 p-10 pb-16 md:block">
        <div className="container max-w-screen-xl mx-auto px-4 space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set your preferences.
          </p>
        </div>
        <Divider />

        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                {children}
              </article>
            </main>
          </div>
        </div>
      </section>
    </body>
  );
}
