from http.server import HTTPServer, CGIHTTPRequestHandler
server_address = ("192.168.68.110", 8000)
httpd = HTTPServer(server_address, CGIHTTPRequestHandler)
httpd.serve_forever()

