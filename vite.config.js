import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// TO CONNECT TO GH PAGES DIRECTLY: base: '/TMDB_Movie_App/', 
// https://vitejs.dev/config/
export default defineConfig({
  base: '/<REPO>/',
  plugins: [react()],
})

