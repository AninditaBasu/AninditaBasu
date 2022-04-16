---
layout: default
title: CV
nav_order: 6
---

# {{ page.title }}

I can write documentation from scratch. I can also coach, guide, and handhold non-writers (for example, coders) when they write.

My interests include docs-as-code, REST APIs, information architecture, and DITA.

## Skills

-  Advanced: Markdown, HTML, reStructured Text, DITA, MkDocs
-  Intermediate: Jekyll, Swagger, Python, Git, Liquid
-  Beginner: Sphinx

## Career highlights

-  Set up a docs-like-code authoring toolchain
-  Defined style guidelines for in-product text
-  Defined style guidelines for videos
-  Implemented SEO practices, and laid down the process and guidelines
-  Implemented progressive disclosure
-  While creating wireframes for a product, filed a defensive patent disclosure

## Employment history

{% for entry in site.data.employment.employment reversed %}

### {{ entry.role }}

#### {{ entry.company }}, {{entry.year1}} to {{entry.year2}}

{% for item in entry.achievements %}
- {{item}}
{% endfor %}

{% endfor %}

## Certifications

{% for entry in site.data.certifications.certifications reversed %}

-  {{ entry.certificate }}, {{ entry.year }}, {{ entry.institution }}

{% endfor %}

## Education

{% for entry in site.data.education.education reversed %}

-  {{ entry.degree }}, {{ entry.institution }}

{% endfor %}