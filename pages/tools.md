---
layout: default
title: Tools
---
#### {{ page.title }}

<p>Or, scripts to make the everyday life of a writer easier</p>

{% for entry in site.data.tool.tool %}
<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body">
      <h5>{{ entry.name }} </h5>
      <p>{{ entry.desc }}.</p>
	  <p>See <a href = "{{ entry.demo }}">demo</a>.</p>
	  <p>See <a href = "{{ entry.code }}">code</a>.</p>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->
{% endfor %}



