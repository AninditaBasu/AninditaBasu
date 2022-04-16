---
layout: default
title: Fun apps
nav_order: 5
---

# {{ page.title }}

These are weekend projects.

If any of these apps don't work when you click the **App** button, it could be all 550 hours of my free Heroku plan this month are used up. Things should be back on track when the limits are reset on the 1st day of the next month.

## Table of contents

{: .no_toc .text-delta }

- TOC
   {:toc}

{% for entry in site.data.app.app %}

## {{ entry.name }}

{{ entry.type }}

{{ entry.desc }}

{% if entry.demo %}[App]({{ entry.demo }}){% endif %}&nbsp;&nbsp;
{% if entry.code %}[Code]({{ entry.code }}){% endif %}

![app screenshot]({{ entry.picture }})

{% endfor %}



