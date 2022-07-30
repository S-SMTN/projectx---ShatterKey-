import requests
import urllib.parse

class Card:
    def __init__(self, id, preview, description, keywords, url):
        self.id = id
        self.id_hash = f"#{id}"
        self.preview = preview
        self.description = description
        self.keywords = keywords
        self.url = url

    def __str__(self):
        return self.url

def shutter(description):
    head = {
    'Authorization': 'Bearer v2/b1FUckVIQWNabG92SWhxOWxXM2M1b2RFeW1ndUhGVWEvMzQxMDQ3Nzg5L2N1c3RvbWVyLzQvZThrVWFwWm15NHBhV09RM0s1dFQ4YmFkVmNWNlNlcnV3Ti10LXBoOXBfSTJTQ192eFNEVFlwdnplMTg3S3VORFd5d29kcHlaQUxuSTlSNmZsNXV1Si1oaVlFQmJTZVlIUnJYR0JIWlZSTHhUOW0tRk9rTW9IQVdFcUtIQnNWUjdNNy16djd1VlBQck1kMjF3dHNDdVd6N0pxV1BhUS01VlVoZlRIOGxHdlJuM2o5dDdtWUh6bTFZUUlGNUh5Q3ZGVXIwc3lTQ3VkcUNfZEJKOGlsODcwZy9fUW9vbC0xR3RabzJEeEt6S1h4YnR3'
    }
    url = f'https://api.shutterstock.com/v2/images/search'
    urlencode = {
        'query': description, # any searching str
        'page': '1',
        'view': 'full',
        'per_page': '100'
    }
    shutter_answer = requests.get(url, headers=head, params=urlencode).json()
    data = shutter_answer['data']

    # parsing previews
    """ rezult = []
    for i in data:
        preview = i['assets']['small_thumb']['url']
        rezult.append(preview) """

    # creating list of objects
    cards = list()
    for image in data:
        id = image['id']
        preview = image['assets']['small_thumb']['url']
        description = image['description']
        keywords = image['keywords']
        url = f"https://shutterstock.com/image/{id}"
        cards.append(Card(id, preview, description, keywords, url))


    # parsing keywords
    keywords = dict()
    for image in data:
        keys = image['keywords']
        for key in keys:
            if key in keywords:
                keywords[key] += 1
            else:
                keywords[key] = 1
    keywords = dict(sorted(keywords.items(), key=lambda item: item[1], reverse=True))

    return cards, keywords

