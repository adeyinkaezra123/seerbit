/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   border: "#f3f5eb",
      //   input: "#f3f5eb",
      //   ring: "#f3ccaa",
      //   background: "#ffffff",
      //   foreground: "#f4f5f9",
      //   primary: {
      //     DEFAULT: "#f3f5eb",
      //     foreground: "#ffffff",
      //   },
      //   secondary: {
      //     DEFAULT: "#f4f6fc",
      //     foreground: "#f3f5eb",
      //   },
      //   destructive: {
      //     DEFAULT: "#962d1f",
      //     foreground: "#fafafa",
      //   },
      //   muted: {
      //     DEFAULT: "#f4f6fc",
      //     foreground: "#6b6b6b",
      //   },
      //   accent: {
      //     DEFAULT: "#f4f6fc",
      //     foreground: "#f3f5eb",
      //   },
      //   popover: {
      //     DEFAULT: "#ffffff",
      //     foreground: "#f4f5f9",
      //   },
      //   card: {
      //     DEFAULT: "#ffffff",
      //     foreground: "#f4f5f9",
      //   },
      // },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: `0.5rem`,
        md: `calc(0.5rem - 2px)`,
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: [
          "Urbanist, sans-serif",

          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32',
          },
        ],
      },
    },
    plugins: [],
  },
};
