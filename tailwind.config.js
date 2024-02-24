/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      boxShadow: {
        'strong-bottom': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
      },
      // Define custom screen sizes
      screens: {
        'xs': '480px',   // Extra small screen / phone
        'sm': '640px',   // Small screen / phone
        'md': '768px',   // Medium screen / tablet
        'lg': '1024px',  // Large screen / desktop
        'xl': '1280px',  // Extra large screen / wide desktop
        '2xl': '1536px', // 2X Large screen / wide desktop
      },
      // Define custom colors
      colors: {
        'primary': '#ff3e00',  // Primary color
        'secondary': '#00ff3e', // Secondary color
        'accent': '#3e00ff',    // Accent color
        'green':'#DAF7A6',
        "grey":"#f5f5f5",
        "whiteS":"#f8f8ff",
        'aqua':"#47a89b",
        "dark":"#A9A9A9"
        
        // Add other colors as needed
      },
      // Define custom font sizes
      fontSize: {
        'xs': '.75rem',      // Extra small text
        'sm': '.875rem',     // Small text
        'base': '1rem',      // Base text size
        'lg': '1.125rem',    // Large text
        'xl': '1.25rem',     // Extra large text
        '2xl': '1.5rem',     // 2X Large text
        '3xl': '1.875rem',   // 3X Large text
        '4xl': '2.25rem',    // 4X Large text
        '5xl': '3rem',       // 5X Large text
        // Add other sizes as needed
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
