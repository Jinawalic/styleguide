/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#0b8260',
                    custom: '#e6f4f2',
                },
                success: '#10B981',
                warning: '#F59E0B',
                danger: '#F43F5E',
                info: '#3B82F6',
                slate: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                },
            },
            fontFamily: {
                heading: ["Inter", "sans-serif"],
                body: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [],
}
