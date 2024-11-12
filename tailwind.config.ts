import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotateBorder: {
          "0%": {
            borderImageSource:
              "linear-gradient(109.02deg, rgba(252, 178, 37, 0.79) -7.73%, rgba(72, 72, 72, 0) 36.72%)",
          },
          "100%": {
            borderImageSource:
              "linear-gradient(469.02deg, rgba(252, 178, 37, 0.79) -7.73%, rgba(72, 72, 72, 0) 36.72%)",
          },
        },
      },
      animation: {
        rotateBorder: "rotateBorder 2s linear infinite",
      },
      boxShadow: {
        "custom-navbar": "0px 2px 4px 0px rgba(67, 67, 67, 0.25)",
      },
      fontFamily: {
        dansans: ["var(--font-dm-sans)"],
      },
      backgroundImage: {
        "node-icon-gradient":
          "linear-gradient(270deg, #FF884D 0%, #D7875F 100%)",
        "answer-node-1":
          "linear-gradient(270deg, rgba(60, 73, 255, 0.54) 0%, rgba(150, 157, 255, 0.54) 100%);",
        "answer-node-2": `linear-gradient(270deg, rgba(140, 66, 237, 0.54) 0%, rgba(202, 168, 247, 0.54) 100%);`,

        "answer-node-3": `linear-gradient(270deg, rgba(140, 66, 237, 0.54) 0%, rgba(202, 168, 247, 0.54) 100%)`,
        "answer-node-4": `linear-gradient(270deg, rgba(0, 127, 76, 0.4) 0%, rgba(107, 233, 182, 0.4) 100%)`,

		'blue-gradient': `linear-gradient(0deg, #363636, #363636), linear-gradient(270deg, rgba(60, 73, 255, 0.54) 0%, rgba(150, 157, 255, 0.54) 100%)`,
        'light-blue-gradient': `linear-gradient(0deg, #363636, #363636), linear-gradient(270deg, rgba(14, 97, 161, 0.73) 0%, rgba(20, 130, 214, 0.73) 100%)`,
        'purple-gradient': `linear-gradient(0deg, #363636, #363636), linear-gradient(270deg, rgba(140, 66, 237, 0.54) 0%, rgba(202, 168, 247, 0.54) 100%)`,
        'green-gradient': `linear-gradient(0deg, #363636, #363636), linear-gradient(270deg, rgba(0, 127, 76, 0.4) 0%, rgba(107, 233, 182, 0.4) 100%)`,
      },
      colors: {
        "prompt-card": "rgba(33, 32, 32, 1)",
        "prompt-card-1": "rgba(23, 23, 23, 0.8)",
        "prompt-card-icon": "rgba(252, 178, 37, 1)",
        "prompt-card-subeheading": "rgba(118, 118, 118, 1)",
        "prompt-card-input": "rgba(35, 35, 35, 1)",
        "prompt-card-input-border": "rgba(72, 72, 72, 1)",
        "blue-1": "rgba(0, 82, 204, 1)",
        "slate-1": "rgba(255, 255, 255, 1)",
        "navbar-bg": "rgba(23, 23, 23, 1)",
        "search-bg": "rgba(255, 255, 255, 0.05)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
