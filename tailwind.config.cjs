/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Source Sans 3"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['Cinzel', 'Palatino Linotype', 'Georgia', 'Times New Roman', 'serif']
            }
        }
    },
    plugins: []
};
