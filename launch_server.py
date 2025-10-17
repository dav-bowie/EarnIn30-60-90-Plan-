#!/usr/bin/env python3
"""
EarnIn AI Marketing Portfolio Server
Simple HTTP server to launch your portfolio website
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom log format
        print(f"[{self.date_time_string()}] {format % args}")

def main():
    # Change to the directory containing this script
    script_dir = Path(__file__).parent.absolute()
    os.chdir(script_dir)
    
    print("EarnIn AI Marketing Portfolio Server")
    print("=" * 50)
    print(f"Serving from: {script_dir}")
    print(f"Server URL: http://localhost:{PORT}")
    print(f"Portfolio: http://localhost:{PORT}/aesthetic-index.html")
    print("=" * 50)
    print("Press Ctrl+C to stop the server")
    print()
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"Server started successfully on port {PORT}")
            
            # Auto-open browser
            try:
                webbrowser.open(f'http://localhost:{PORT}/aesthetic-index.html')
                print("Opening portfolio in your default browser...")
            except Exception as e:
                print(f"Could not auto-open browser: {e}")
                print(f"Please manually open: http://localhost:{PORT}/aesthetic-index.html")
            
            print()
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"Port {PORT} is already in use. Please try a different port or stop the existing server.")
            print("You can change the PORT variable in this script to use a different port.")
        else:
            print(f"Server error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
