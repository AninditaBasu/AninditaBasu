---
layout: default
title: Fun apps
nav_order: 5
---

# {{ page.title }}
   
These are weekend projects.

If any of these apps don't work when you click **App**, it could be all 550 hours of my free Heroku plan this month are used up. Things should be back on track when the limits are reset on the 1st day of the next month.

{% for entry in site.data.apps.apps %}

## {{ entry.name }}

{{ entry.type }}

{{ entry.desc }}

[Code]({{ entry.code }}){: .btn .btn-purple }&nbsp;&nbsp;
{% if entry.demo %}[App]({{ entry.demo }}){: .btn .btn-purple }{% endif %}

![app screenshot]({{ entry.picture }})

<hr/>

{% endfor %}



