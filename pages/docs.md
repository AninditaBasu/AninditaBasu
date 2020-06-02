---
layout: default
title: Writing samples
---
#### {{ page.title }}

<p>Or, how I earn my bread and butter</p>

{% for entry in site.data.doc.doc %}
<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
      <h5>{{ entry.name }} </h5>
      <p>{{ entry.desc }}</p>
	  <p>See <a href="{{ entry.link }}" target="_blank" rel="noopener noreferrer">{{ entry.link_text }}</a>.</p>
	  {% assign taglist = entry.tags | split: ", " %}	  
	  <p>{% for item in taglist %}<span class="badge badge-secondary">{{ item }}</span>&nbsp;&nbsp;{% endfor %}</p>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->
{% endfor %}