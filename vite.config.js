import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],                    
  base: "/portfolioMartons",             
  server: { host: true },                
  build: {
    chunkSizeWarningLimit: 1200,         
    rollupOptions: {
      output: {
        manualChunks: {                  
          vendor: ['react', 'react-dom'],
          three: ['three'], 
          icons: ['react-icons/si'],
        }
      }
    },
  },
});
