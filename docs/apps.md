---
layout: default
title: Weekend projects
nav_order: 5
---

# {{ page.title }}

If an app doesn't work when you click **See the app**, it could be because all my free hours this month at the hosting service are used up.

{% for entry in site.data.apps.apps %}

<hr/>

## {{ entry.name }}

{{ entry.desc }}

{% if entry.code %}[See the code]({{ entry.code }}){: .btn .btn-purple .mr-4  }{% endif %}
{% if entry.demo %}[See the App]({{ entry.demo }}){: .btn .btn-purple .mr-4  }{% endif %}

![app screenshot]({{ entry.picture }})

{% endfor %}



