/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#f8fafc',
                surface: '#ffffff',
                brand: '#2563eb',
                danger: '#dc2626',
                safe: '#059669',
                muted: '#64748b',
                border: '#e2e8f0',
            },
        },
    },
    plugins: [],
}
