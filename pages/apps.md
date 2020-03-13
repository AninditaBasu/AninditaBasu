---
layout: default
title: Apps
---
# {{ page.title }}

<ul>
{% for entry in site.data.app.app %}
<li>{{ entry.name }}, {{ entry.type }}, {{ entry.demo }}, {{ entry.code }}</li>
{% endfor %}
</ul>
