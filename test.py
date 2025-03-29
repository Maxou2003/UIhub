import requests

url = "http://localhost:5000/api/profile/image/67d0499f239dcbb47a3f8e97"

with open('file.png', 'wb') as f:
    f.write(requests.get(url).content)