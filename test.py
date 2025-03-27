import requests

url = "http://localhost:5000/images/d_banner.png"

with open('file.png', 'wb') as f:
    f.write(requests.get(url).content)