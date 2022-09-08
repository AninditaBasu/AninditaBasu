# Quick start with the `ia` command line tool

One of the most common ways that we've seen developers use for accessing and managing the content at the Internet Archive is by using the command-line interface (CLI) tool. The following steps help you get started quickly with this tool.

(For details on the CLI tool, see [Archive.org command line tool](internetarchive/cli).)

It's assumed that:

* You're using a Unix-like environment.
* You're comfortable with the command line interface and `cURL`.

It's also assumed that you're familiar with the nomenclature used at the Internet Archive. If not, see [Definitions](index.html#definitions).

To quickly get started with the `ia` CLI:

1.  Download the Python binary by running the following command: `curl -LOs https://archive.org/download/ia-pex/ia`
1.  Make the binary an executable file by running the following command: `chmod +x ia`.
1.  Create a configuration file with your `archive.org` login credentials by running the following command: `ia configure`. When prompted, enter the credentials that you used for creating an Internet Archive account.
    The information is saved to `$HOME/.config/ia.ini` or, if you don't have a `.config` directory in `$HOME`, to `$HOME/.ia`.
    If you don’t have an Internet Archive account yet, go to [https://archive.org/account/login](https://archive.org/account/login) and sign up.
1.  Try out some operations:
    -  Get the metadata of an item by running the following command: `ia metadata <unique_item_identifier>`.
        For example, to read the metadata of the song called `We are the world`, run: `ia metadata U_S_A_For_Africa_We_Are_The_World`. (Here's a more detailed tutorial on [finding the unique item identifier](tutorial-find-identifier-item).)
    -  Upload an item to the Internet Archive by running a command with the following syntax: `ia upload <identifier> file1 file2 --metadata="mediatype:texts" --metadata="param:arg"`,
        where `<identifier>` is a unique string. (Here's a more detailed tutorial on [creating an item](tutorial-create-item).)