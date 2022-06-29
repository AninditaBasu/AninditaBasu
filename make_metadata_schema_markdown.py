from internetarchive import get_item
from jinja2 import Environment, FileSystemLoader


def prepare_examples(item):
    """Prepare each fields examples for markdown template.

    This function edits the item in place.
    """
    for f in item.schema['metadata_schema']:
        _example = list()
        for e in f.get('example', list()):
            _example.append('\n```\n{}\n```\n'.format(e))

        if _example:
            f['example'] = '\n'.join(_example)

        _accepted_values = list()
        for v in f.get('accepted values', list()):
            _accepted_values.append('`{}`'.format(v.strip()))

        if _accepted_values:
            f['accepted values'] = ','.join(_accepted_values)

    for f in item.schema['files_schema']:
        _example = list()
        if not f:
            continue
        for e in f.get('example', list()):
            _example.append('\n```\n{}\n```\n'.format(e))

        if _example:
            f['example'] = '\n'.join(_example)

        _accepted_values = list()
        for v in f.get('accepted values', list()):
            _accepted_values.append('`{}`'.format(v.strip()))

        if _accepted_values:
            f['accepted values'] = ','.join(_accepted_values)



if __name__ == '__main__':
    env = Environment(loader=FileSystemLoader('templates/'),
                      trim_blocks=True, lstrip_blocks=True)
    item = get_item('ia-metadata')
    prepare_examples(item)

    template = env.get_template('mds.md.j2')
    output = template.render(item=item)
    print(output)
