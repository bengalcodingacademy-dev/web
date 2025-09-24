// tailwind.config.js (minimal for v4)
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bca-black': '#0a0a0a',
        'bca-white': '#ffffff',
        'bca-red': '#ff1a1a',
        'bca-gold': '#ffb209',
        'bca-cyan': '#00c3ff',
      },
      borderRadius: {
        'xl': '14px',
      },
      boxShadow: {
        'soft': '0 6px 20px rgba(0, 0, 0, 0.25)',
      },
    },
  },
};
