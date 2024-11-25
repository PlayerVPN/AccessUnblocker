import fs from 'fs/promises';
import fetch from 'node-fetch';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const UV_FILES = {
  'uv.bundle.js': 'https://raw.githubusercontent.com/titaniumnetwork-dev/Ultraviolet-Static/main/dist/uv.bundle.js',
  'uv.handler.js': 'https://raw.githubusercontent.com/titaniumnetwork-dev/Ultraviolet-Static/main/dist/uv.handler.js',
  'sw.js': 'https://raw.githubusercontent.com/titaniumnetwork-dev/Ultraviolet-Static/main/dist/uv.sw.js'
};

async function downloadUVFiles() {
  const uvDir = join(__dirname, 'public', 'uv');
  
  try {
    await fs.mkdir(uvDir, { recursive: true });
    
    for (const [filename, url] of Object.entries(UV_FILES)) {
      const response = await fetch(url);
      const content = await response.text();
      await fs.writeFile(join(uvDir, filename), content);
    }
    
    console.log('UV files downloaded successfully');
  } catch (err) {
    console.error('Error downloading UV files:', err);
    process.exit(1);
  }
}

downloadUVFiles();