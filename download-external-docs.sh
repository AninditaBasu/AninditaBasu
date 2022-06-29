#!/bin/bash
#
# Download docs from other repos, and put them in place
# where the auto-doc generation will pick them up
#

set -e
set -x

rm -rf tmp
mkdir -p tmp

# Views API
git clone git@git.archive.org:ia/unclouded.git tmp/unclouded
rm -rf docs/views
cp tmp/unclouded/docs/index.md docs/views.md
cp tmp/unclouded/docs/views_api.md docs/

# Interntarchive CLI/Python lib
git clone https://github.com/jjjake/internetarchive.git tmp/internetarchive
pip install tmp/internetarchive/
rm -rf docs/internetarchive
cp -a tmp/internetarchive/docs/source docs/internetarchive
cp -a tmp/internetarchive/AUTHORS.rst docs/..
cp -a tmp/internetarchive/CONTRIBUTING.rst docs/..
cp -a tmp/internetarchive/HISTORY.rst docs/..


# Metadata Schema
mkdir -p docs/metadata-schema
python make_metadata_schema_markdown.py > docs/metadata-schema/index.md
