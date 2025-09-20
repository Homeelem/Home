import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = 'dist/spa';
const destDir = 'docs';

// Function to recursively copy directory
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDir(srcPath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Check if source directory exists
if (!fs.existsSync(srcDir)) {
  console.error(`Error: Source directory '${srcDir}' does not exist.`);
  console.error('Please run "npm run build:client" first.');
  process.exit(1);
}

// Remove existing docs directory if it exists
if (fs.existsSync(destDir)) {
  console.log(`Removing existing '${destDir}' directory...`);
  fs.rmSync(destDir, { recursive: true, force: true });
}

// Copy files from dist/spa to docs
console.log(`Copying files from '${srcDir}' to '${destDir}'...`);
copyDir(srcDir, destDir);

console.log('✅ Build output successfully moved to docs folder!');
console.log(`📁 Files copied to: ${path.resolve(destDir)}`);
