import { readdirSync, statSync, copyFileSync, renameSync, existsSync } from 'fs';

import path from 'path';


const publicDir = 'public'; // Папка с вашими статическими файлами
const distDir = 'dist'; // Папка, куда будут скопированы сжатые файлы



function getPublicFiles(folder) {
    const files = []
    const  items = readdirSync(folder);

    items.forEach(file => {
       //console.log('file: ', file)
        const filePath = path.join(folder, file)
        if (statSync(filePath).isFile() && file.search(/(\.gz)$/)>=0 ) {
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

function getPublicFiles__3() {
    const files = []

        //} else if (statSync(filePath).isDirectory()) {
             //console.log('subdir....: ', file, filePath)

    readdirSync(publicDir).forEach(file => {
             //console.log('subdir....: ', file, filePath)
        //if existsSync(path.join(publicDir, file + '.gz')); // Проверяем наличие сжатого файла
          //.search(/\.(svg|js|mjs|cjs|json|css|html|wasm|svg)$/)
    });
    return files
}


function getPublicFiles__old2() {
    return readdirSync(publicDir).filter(file => {
        return existsSync(path.join(publicDir, file + '.gz')); // Проверяем наличие сжатого файла
          //.search(/\.(svg|js|mjs|cjs|json|css|html|wasm|svg)$/)
    });
}

function copyGzFiles() {
    const files = getPublicFiles(publicDir);
    files.forEach(file => {
        //const gzFile = path.join(publicDir, file + '.gz');
        //const gzFile = path.join(publicDir, file);
        const gzFile = file;
        //const destFile = path.join(distDir, path.basename(gzFile));
             //console.log('subdir....: ',  gzFile)
        const destFile = path.join(distDir, gzFile.replace( RegExp(`^${publicDir}`) , `` ) );
        renameSync(gzFile, destFile);
        //console.log(`Сжатый файл ${gzFile} скопирован в ${destFile}`);
    });
}

copyGzFiles();
