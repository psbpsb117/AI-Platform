import http.server
import socketserver
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class GnuHttpHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Serve preview.html as default index for instant interactive experience
        if self.path == '/' or self.path == '/index.html':
            self.path = '/preview.html'
        return super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), GnuHttpHandler) as httpd:
        print(f"GNU Pioneers Platform Web Server running at http://localhost:{PORT}/")
        print(f"Serving directory: {DIRECTORY}")
        sys.stdout.flush()
        httpd.serve_forever()
