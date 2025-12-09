export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mycustom: ['MyCustomFont', 'sans-serif'], 
        manrope: ['Manrope', 'sans-serif'],
            },
      colors: {
        customYellow: '#FFCD0F', 
      },
    },
  },
  plugins: [],
};
