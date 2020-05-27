---
layout: default
title: Fun apps
---
#### {{ page.title }}

<p>Or, weekend projects that stretch to fill all the time available.</p>
<p class="small">These apps will not work for the rest of the month of May 2020 because all the 550 hours of my free Heroku plan this month are used up (Tarjuma and Mahabharat seemed particularly popular). Things should be back on track from June 1, 2020 when you click the <b>App</b> button.</p>

{% for entry in site.data.app.app %}
<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
	  <div class="row">
      <div class="col-sm-8">
      <h5>{{ entry.name }} </h5>
      <p class="lead">{{ entry.type }}.</p>
	  <p>{{ entry.desc }}</p>
	  <p class="mt-2"><a href="{{ entry.demo }}" class="btn btn-success" target="_blank">App</a>&nbsp;&nbsp;{% if entry.code %}<a href="{{ entry.code }}" class="btn btn-success" target="_blank">Code</a>{% endif %}</p>
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



