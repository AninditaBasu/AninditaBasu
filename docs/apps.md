---
layout: default
title: Fun apps
nav_order: 5
---

# {{ page.title }}
   
These are weekend projects.

If an app doesn't work when you click **App**, it could be because all my free hours this month at the hosting service are used up. The app should be back when limits are automatically reset on the 1st day of the next month.

<hr/>

{% for entry in site.data.apps.apps %}

## {{ entry.name }}

{{ entry.desc }}

{% if entry.code %}[See the code]({{ entry.code }}){: .btn .btn-purple .mr-4  }{% endif %}&nbsp;&nbsp;
{% if entry.demo %}[See the App]({{ entry.demo }}){: .btn .btn-purple .mr-4  }{% endif %}

![app screenshot]({{ entry.picture }})

<hr/>

{% endfor %}



