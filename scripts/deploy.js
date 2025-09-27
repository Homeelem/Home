#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync, renameSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting deployment process...');

try {
  // Step 1: Build the client
  console.log('📦 Building client...');
  execSync('npm run build:client', { stdio: 'inherit' });

  // Step 2: Preserve CNAME file if it exists
  const cnamePath = 'docs/CNAME';
  let cnameContent = null;
  if (existsSync(cnamePath)) {
    console.log('📄 Preserving CNAME file...');
    const { readFileSync } = await import('fs');
    cnameContent = readFileSync(cnamePath, 'utf8');
  }

  // Step 3: Remove existing docs directory if it exists
  const docsPath = 'docs';
  if (existsSync(docsPath)) {
    console.log('🗑️  Removing existing docs directory...');
    rmSync(docsPath, { recursive: true, force: true });
  }

  // Step 4: Move dist/spa to docs
  const distSpaPath = 'dist/spa';
  if (existsSync(distSpaPath)) {
    console.log('📁 Moving dist/spa to docs...');
    renameSync(distSpaPath, docsPath);
  } else {
    console.error('❌ dist/spa directory not found. Make sure the build completed successfully.');
    process.exit(1);
  }

  // Step 5: Restore CNAME file if it existed
  if (cnameContent !== null) {
    console.log('📄 Restoring CNAME file...');
    const { writeFileSync } = await import('fs');
    writeFileSync(cnamePath, cnameContent);
  }

  // Step 6: Git operations
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
