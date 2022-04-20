---
layout: default
title: Tooling ideas
nav_order: 4
---

# {{ page.title }}

These scripts explore some ideas around documentation tooling.

{% for entry in site.data.tools.tools %}

<hr/>

## {{ entry.name }}

{{ entry.type }}

{{ entry.desc }}

[Code]({{ entry.code }}){: .btn .btn-purple }&nbsp;&nbsp;
{% if entry.demo %}[Demo]({{ entry.demo }}){: .btn .btn-purple }{% endif %}

![tool screenshot]({{ entry.picture }})

{% endfor %}



