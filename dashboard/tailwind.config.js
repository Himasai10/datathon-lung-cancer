/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                surface: '#121212',
                brand: '#3b82f6',
                danger: '#ef4444',
                safe: '#10b981',
            },
        },
    },
    plugins: [],
}
