#!/usr/bin/env node

import { existsSync, rmSync, renameSync } from 'fs';
import { readFileSync, writeFileSync } from 'fs';

console.log('🚀 Starting move to docs process...');

try {
  // Step 1: Preserve CNAME file if it exists
  const cnamePath = 'docs/CNAME';
  let cnameContent = null;
  if (existsSync(cnamePath)) {
    console.log('📄 Preserving CNAME file...');
    cnameContent = readFileSync(cnamePath, 'utf8');
  }

  // Step 2: Check if dist/spa exists before proceeding
  const distSpaPath = 'dist/spa';
  if (!existsSync(distSpaPath)) {
    console.error('❌ dist/spa directory not found. Make sure the build completed successfully.');
    process.exit(1);
  }

  // Step 3: Remove existing docs directory if it exists
  const docsPath = 'docs';
  if (existsSync(docsPath)) {
    console.log('🗑️  Removing existing docs directory...');
    rmSync(docsPath, { recursive: true, force: true });
  }

  // Step 4: Move dist/spa to docs
  console.log('📁 Moving dist/spa to docs...');
  renameSync(distSpaPath, docsPath);

  // Step 5: Remove remaining dist folder if it exists
  const distPath = 'dist';
  if (existsSync(distPath)) {
    console.log('🗑️  Removing remaining dist folder...');
    rmSync(distPath, { recursive: true, force: true });
  }

  // Step 6: Restore CNAME file if it existed
  if (cnameContent !== null) {
    console.log('📄 Restoring CNAME file...');
    writeFileSync(cnamePath, cnameContent);
  }

  console.log('✅ Move to docs completed successfully!');
  console.log('📁 Files moved to: docs/');

} catch (error) {
  console.error('❌ Move to docs failed:', error.message);
  process.exit(1);
}