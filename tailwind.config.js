/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      1: "2px",
      2: "4px",
      3: "8px",
      4: "10px",
      5: "12px",
      6: "16px",
      7: "18px",
      8: "20px",
      9: "24px",
      10: "28px",
      11: "32px",
      12: "40px",
      13: "48px",
      14: "56px",
      15: "64px",
    },
    extend: {
      colors: {
        transparent: "transparent",
        primary: {
          default: "#6713EF",
          10: "#f0e7fd",
          20: "#e1d0fc",
          30: "#d1b8fa",
          40: "#c2a1f9",
          50: "#b389f7",
          60: "#a471f5",
          70: "#955af4",
          80: "#8542f2",
          90: "#762bf1",
          100: "#6713EF",
        },
        neutral: {
          default: "#202020",
          0: "#202020",
          1: "#353C49",
          2: "#505866",
          3: "#B1B8C0",
          4: "#D9E0E8",
          5: "#E9EDF1",
          6: "#F2F4F6",
          7: "#F8F8F9",
          8: "#FFFFFF",
        },
        text: {
          0: "#353C49",
          1: "#676E7B",
          2: "#9198A0",
          3: "#B1B8C0",
          4: "#D1D6DA",
          5: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};