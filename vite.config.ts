import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import gzipPlugin from 'rollup-plugin-gzip';
import { readdirSync, statSync, copyFileSync} from 'fs';
import { join, basename } from 'path';
import path from 'path';


function manualChunks(id:any) {
  //return null
  if (id.includes('/vue-router.mjs')) {
    //console.log('manualChunks_api: ', id)
    return 'router';
  }
  if (id.includes('/runtime-core.esm-bundler.js')) {
    //console.log('manualChunks_esm: ', id)
    return  'vendor' // 'core';
  }
  if (id.includes('node_modules')) {
    //console.log('manualChunks_vendor: ', id)
    return  'vendor' 
  }
  if (id.includes('/components/') || id.includes('/home.')) {
    //console.log('manualChunks_pages: ', id)
    return 'components';
  }
  if (id.includes('/pages/')) {
    //console.log('manualChunks_pages: ', id)
    return 'components' // 'pages';
  }

  //console.log('manualChunks_main: ', id)
  return null
  //return (id.split(/[/]/i)).slice(-1)[0].split('.').slice(0,-1).join('.')

}

function getPublicFiles(folder:string) {
    const files:string[] = []
    const  items = readdirSync(folder);

    items.forEach(file => {
       console.log('file: ', file)
        const filePath = join(folder, file)
        if (statSync(filePath).isFile() && file.search(/(\.gz)$/)===-1) {
            //return filePath;
            files.push(filePath)
        } else if (statSync(filePath).isDirectory()) {
             //console.log('subdir....: ', file, filePath)
           //files = files.concat(getPublicFiles(filePath));
             files.push( ...getPublicFiles(filePath))
           //return 
        }
        return null; // Игнорируем папки
    }) //.filter(r=>r!==null);

    //console.log('files....: ', files)

    return files
}


function getPublicFiles22(folder:string) {
    return readdirSync(folder).map(file => {
       console.log('file: ', file)
        const filePath = join(folder, file)
        if (statSync(filePath).isFile()) {
            return filePath;
        }
        return null; // Игнорируем папки
    }).filter(r=>r!==null);
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //splitVendorChunkPlugin(),
    //copyGzFiles(), // Добавляем наш пользовательский плагин
    gzipPlugin({filter: /\.(svg|js|mjs|cjs|json|css|html|wasm|svg)$/,
      additionalFiles: getPublicFiles( 'public'),
      //additionalFilesDelay: 1111,
    }),
  ],
  build: {
      //chunkSizeWarningLimit: 16

   rollupOptions: {

      output: {
        manualChunks,
        experimentalMinChunkSize: 3},

    },

  },
  server: {
      headers: {
        'Access-Control-Allow-Origin': '*'            
      },
      // open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8090, // CHANGE YOUR PORT HERE!
  },
  //base: './',
  //resolve: {
    //alias: {
      //src: path.resolve('src/'),
    //},
  //},
})
