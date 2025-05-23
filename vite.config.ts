import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    base: '/weather-spa-test',
});
