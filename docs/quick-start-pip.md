# Quick start with the `ia` Python package

If you're familiar with Python, you can use the `ia` package to access and manage the content at the Internet Archive.

It's assumed that you're familiar with the nomenclature used at the Internet Archive. If not, see [Definitions](index.html#definitions).

To quickly get started with the `ia` package:

1.  Install the package by running the following command: `pip install internetarchive`.
    (For more methods of installing the package, see [Installation](internetarchive/installation).)
1.  Try out some operations:
    -  Get the metadata of an item.
    
        ```python
          from internetarchive import get_item
          item = get_item('<unique_item_identifier>')
          for k,v in item.metadata.items():
              print(print(k,":",v))
        ```

       (More details are at [Read the metadata of an item](tutorial-read-item-metadata.md)).
    -  Upload an item to the Internet Archive.
     
        ```python
          from internetarchive import get_item
          md = {'collection': 'test_collection', 'title': 'My New Item', 'mediatype': 'movies'}
          r = item.upload('<identifier>', files=['film.txt', 'film.mov'], metadata=md, access_key='YoUrAcCEssKey', secret_key='youRSECRETKEY')
          r[0].status_code
        ```
       
       (More details are at [Create an item](tutorial-create-item.md)).