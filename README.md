# Public API docs in restructured text read the docs format.


## To install the tool in your virtualenv

    virtualenv v
    source v/bin/activate
    pip install -r requirements.txt

Copy in docs from the other projects, so far this is from views api, and
internetarchive github project.

    # from this directory, tool is CWD sensitive
    ./download-external-docs.sh

## To build the html docs

    . v/bin/activate
    cd docs
    make html

## To build the docs and view them while you edit them

    . v/bin/activate
    cd docs
    make html
    sphinx-autobuild --host 0.0.0.0 --port 3141 . _build/html

## To create an interactive experience for your API

You'll need an API specifications file in the JSON format.

1.  Put the JSON file in the `docs/_static` folder.
2.  In the same folder, create a copy of the `api_sandbox_template.html` file, and name it to whatever you want.
3.  In a text editor, open the file you created in the previous step, and specify the name of your JSON file in line 19 (the `url` parameter).
4.  Add a link to this `HTML` file on the APIs page of the portal. To do so:
    1.  Open the `docs/index-apis.rst` file.
	2.  Locate your API in the table of that page.
	3.  In the row for your API, add the `HTML` file in the fourth column (the one titled 'Interactive documentation).