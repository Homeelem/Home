#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync, renameSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting deployment process...');

try {
  // Step 1: Build the client
  console.log('📦 Building client...');
  execSync('npm run build:client', { stdio: 'inherit' });

  // Step 2: Remove existing docs directory if it exists
  const docsPath = 'docs';
  if (existsSync(docsPath)) {
    console.log('🗑️  Removing existing docs directory...');
    rmSync(docsPath, { recursive: true, force: true });
  }

  // Step 3: Move dist/spa to docs
  const distSpaPath = 'dist/spa';
  if (existsSync(distSpaPath)) {
    console.log('📁 Moving dist/spa to docs...');
    renameSync(distSpaPath, docsPath);
  } else {
    console.error('❌ dist/spa directory not found. Make sure the build completed successfully.');
    process.exit(1);
  }

  // Step 4: Git operations
  console.log('📝 Adding docs to git...');
  execSync('git add docs', { stdio: 'inherit' });

  console.log('💾 Committing changes...');
  execSync('git commit -m "bundle update"', { stdio: 'inherit' });

  console.log('✅ Deployment completed successfully!');
  console.log('📋 Next steps:');
  console.log('   - Push changes: git push');
  console.log('   - Deploy to your hosting platform');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
