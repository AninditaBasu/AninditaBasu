---
layout: default
title: Doc tools
nav_order: 4
---

# {{ page.title }}

{: .no_toc }

## On this page

{: .no_toc .text-delta }

- TOC
   {:toc}
   
These scripts were written to make the everyday life of a writer easier.

{% for entry in site.data.tools.tools %}

## {{ entry.name }}

{{ entry.type }}

{{ entry.desc }}

[Code]({{ entry.code }}){: .btn .btn-purple }&nbsp;&nbsp;
{% if entry.demo %}[App]({{ entry.demo }}){: .btn .btn-purple }{% endif %}

![tool screenshot]({{ entry.picture }})

<hr/>

{% endfor %}



