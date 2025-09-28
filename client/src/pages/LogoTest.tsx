export default function LogoTest() {
  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Logo Test Page</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Direct Image Test</h2>
            <img 
              src="/logo.png" 
              alt="Home Elem Logo" 
              className="h-16 w-16 object-contain border border-gray-300"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Small" className="h-4 w-4 object-contain border" />
              <img src="/logo.png" alt="Medium" className="h-8 w-8 object-contain border" />
              <img src="/logo.png" alt="Large" className="h-16 w-16 object-contain border" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Network Test</h2>
            <button 
              onClick={() => {
                fetch('/logo.png')
                  .then(response => {
                    console.log('Logo response:', response.status, response.headers.get('content-type'));
                    return response.blob();
                  })
                  .then(blob => {
                    console.log('Logo blob:', blob.size, blob.type);
                  })
                  .catch(error => {
                    console.error('Logo fetch error:', error);
                  });
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              Test Logo Fetch
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Console Output</h2>
            <p className="text-sm text-muted-foreground">
              Check the browser console for detailed error messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
