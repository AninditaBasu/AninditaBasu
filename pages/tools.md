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
	  {% if entry.demo %}<p class="mt-2"><a href = "{{ entry.demo }} class="btn btn-success">See demo</a></p>{% endif %}
	  <p class="mt-2"><a href = "{{ entry.code }}" class="btn btn-success">See code</a></p>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->
{% endfor %}



