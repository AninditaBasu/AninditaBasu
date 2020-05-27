---
layout: default
title: Doc tools
---
#### {{ page.title }}

<p>Or, scripts to make the everyday life of a writer easier</p>

{% for entry in site.data.tool.tool %}
<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
	  <div class="row">
      <div class="col-sm-8">
      <h5>{{ entry.name }} </h5>
      <p>{{ entry.desc }}</p>
	  {% if entry.demo %}<p class="mt-2"><a href="{{ entry.demo }}" class="btn btn-success" target="_blank">Demo</a></p>{% endif %}
	  <p class="mt-2"><a href="{{ entry.code }}" class="btn btn-success" target="_blank">Download</a></p>
	  {% assign taglist = entry.tags | split: ", " %}	  
	  <p>{% for item in taglist %}<span class="badge badge-secondary">{{ item }}</span>&nbsp;&nbsp;{% endfor %}</p>
	  </div><!-- col-sm-8 -->
	  <div class="col-sm-4">
	  <img src="{{ entry.picture }}" alt="tool screenshot" class="mr-3 mt-3 rounded img-fluid img-thumbnail">
	  </div><!-- col-sm-4 -->
      </div><!-- row -->
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->
{% endfor %}



