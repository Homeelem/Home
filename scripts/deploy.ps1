# PowerShell Universal Deploy Script
# Works on Windows PowerShell and PowerShell Core

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

try {
    # Step 1: Build the client
    Write-Host "📦 Building client..." -ForegroundColor Yellow
    npm run build:client

    # Step 2: Remove existing docs directory if it exists
    if (Test-Path "docs") {
        Write-Host "🗑️  Removing existing docs directory..." -ForegroundColor Yellow
        Remove-Item -Path "docs" -Recurse -Force
    }

    # Step 3: Move dist/spa to docs
    if (Test-Path "dist/spa") {
        Write-Host "📁 Moving dist/spa to docs..." -ForegroundColor Yellow
        Move-Item -Path "dist/spa" -Destination "docs"
    } else {
        Write-Host "❌ dist/spa directory not found. Make sure the build completed successfully." -ForegroundColor Red
        exit 1
    }

    # Step 4: Git operations
    Write-Host "📝 Adding docs to git..." -ForegroundColor Yellow
    git add docs

    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m "bundle update"

    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "📋 Next steps:" -ForegroundColor Cyan
    Write-Host "   - Push changes: git push" -ForegroundColor White
    Write-Host "   - Deploy to your hosting platform" -ForegroundColor White

} catch {
    Write-Host "❌ Deployment failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
