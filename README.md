# Public API docs in restructured text read the docs format.


To install the tool in your virtualenv:

    virtualenv v
    source v/bin/activate
    pip install -r requirements.txt

Copy in docs from the other projects, so far this is from views api, and
internetarchive github project.

    # from this directory, tool is CWD sensitive
    ./download-external-docs.sh

To build the html docs:

    . v/bin/activate
    cd docs
    make html


To build the docs and view them while you edit them:

    . v/bin/activate
    cd docs
    make html
    sphinx-autobuild --host 0.0.0.0 --port 3141 . _build/html
