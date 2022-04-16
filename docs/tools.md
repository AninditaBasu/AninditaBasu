---
layout: default
title: Doc tools
nav_order: 4
---

# {{ page.title }}

These scripts were written to make the everyday life of a writer easier.

## Table of contents

{: .no_toc .text-delta }

- TOC
   {:toc}

{% for entry in site.data.tool.tool %}

## {{ entry.name }}

{{ entry.type }}

{{ entry.desc }}

{% if entry.demo %}[App]({{ entry.demo }}){% endif %}&nbsp;&nbsp;
{% if entry.code %}[Code]({{ entry.code }}){% endif %}

![tool screenshot]({{ entry.picture }})

{% endfor %}



