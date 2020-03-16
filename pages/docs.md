---
layout: default
title: Writing samples
---
#### {{ page.title }}

<p>Or, how I earn my bread and butter</p>

{% for entry in site.data.docs.doc %}
<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body">
      <h5>{{ entry.name }} </h5>
      <p>{{ entry.desc }}.</p>
	  <p>See <a href = "{{ entry.link }}">{{ entry.link_text }}</a></p>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->
{% endfor %}