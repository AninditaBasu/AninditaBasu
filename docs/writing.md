---
layout: default
title: Writing samples
nav_order: 2
---

# {{ page.title }}

{% for entry in site.data.writings.writings %}

-  {{ entry.name }}

    {{ entry.desc }} See [{{ entry.link_text }}]({{ entry.link }}).

{% endfor %}