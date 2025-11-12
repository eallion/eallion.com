import json
import requests

with open('assets/data/neodb/movie.json', encoding='utf-8') as f:
    data = json.load(f)['data']

api_urls = []
for item in data:
    api_urls.append(item['item']['api_url'])

api_urls = ['https://neodb.social' + url for url in api_urls]

details = []
for url in api_urls:
    response = requests.get(url)
    details.append(response.json())

with open('assets/data/neodb/movie_details.json', 'w', encoding='utf-8') as f:
    json.dump(details, f, ensure_ascii=False)
