---
layout: default
title: Fun apps
---
#### {{ page.title }}

<p>Or, weekend projects that stretch to fill all the time available.</p>
<p class="small">If any of these apps don't work when you click the <b>App</b> button, the reason could be all of the 550 hours of my free Heroku plan this month are used up. Things should be back on track when the limits are reset on the 1st day of the next month.</p>

{% for entry in site.data.app.app %}
<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
	  <div class="row">
      <div class="col-sm-8">
      <h5>{{ entry.name }} </h5>
      <p class="lead">{{ entry.type }}</p>
	  <p>{{ entry.desc }}</p>
	  <p class="mt-2">{% if entry.demo %}<a href="{{ entry.demo }}" class="btn btn-success" target="_blank" rel="noopener noreferrer">App</a>{% endif %}&nbsp;&nbsp;{% if entry.code %}<a href="{{ entry.code }}" class="btn btn-success" target="_blank" rel="noopener noreferrer">Code</a>{% endif %}</p>
	  {% assign taglist = entry.tags | split: ", " %}	  
	  <p>{% for item in taglist %}<span class="badge badge-secondary">{{ item }}</span>&nbsp;&nbsp;{% endfor %}</p>
	  </div><!-- col-sm-8 -->
	  <div class="col-sm-4">
	  <img src="{{ entry.picture }}" alt="app screenshot" class="mr-3 mt-3 rounded img-fluid img-thumbnail">
	  </div><!-- col-sm-4 -->
      </div><!-- row -->
    </div><!-- card-body  -->	
  </div><!-- card -->
</div><!-- container mt-3 -->
{% endfor %}



