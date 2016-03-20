// Logic for graph view

Template.graph.onRendered(function(){
  Session.set('currentMode', 'graph');

  var diagram = new tracy.Diagram();

  document.querySelector('.component-list-card')
  .setAttribute('style', 'display:none;');
  var width = document.getElementById('container').offsetWidth;
  var containerHeight = document.getElementById('container').offsetHeight;
  var height = 700;

  var svg = d3.select('#container').append('svg');
  svg.selectAll().remove();

  var zoom = d3.behavior.zoom()
  .scaleExtent([-5, 9])
  .on("zoom", move);
  svg.attr('width', '100%')
  .attr('height', '100%')
  .call(zoom);

  var t = [0,0];
  var s = 1;

  function move() {

	t = d3.event.translate;
	s = d3.event.scale; 
	zscale = s;
	var h = 1;

	var width = 1000;
	var height = 600;

	zoom.translate(t);
	componentGroup.attr("transform", "translate(" + t + ")scale(" + s + ")");
	linkGroup.attr("transform", "translate(" + t + ")scale(" + s + ")");
  }
  // handles to link and component element groups
  var linkGroup = svg.append('svg:g');
  var componentGroup = svg.append('svg:g');
  var links= linkGroup.selectAll('g');
  var components = componentGroup.selectAll('g'); 
  var initialized = false;
  this.autorun(function() {
	if(!Session.get('countriesLoaded') || 
	   !Session.get('componentsLoaded') || 
	   !Session.get('linksLoaded')) return;

	var components = Comps.find({}).fetch();
	var links = Links.find({}).fetch();

	if (!initialized) {
	  for (var i = 0; i < components.length; i++) {
		diagram.addComponent(components[i]);
	  }
	  for (var i = 0; i < links.length; i++) {
		diagram.addLink(links[i]);
	  }
	  drawComponents();
	  drawLinks();
	  initialized = true;
	} else {
	  for (var i = 0; i < components.length; i++) {
		var rect = document.querySelector('.component-' + components[i]._id);
		rect.setAttribute('fill', getColor(components[i].siteLocation));
	  }
	  Session.get('selectedValue')

	}

  });

  function drawLinks() {
	links = links.data(diagram.links, function(d) { return d._id; });


	var enteringLinks = links.enter().append('svg:g');
	enteringLinks.append('svg:path')
	.attr('class', 'link')
	.style('marker-end', 'url(#end-arrow)')



	redrawLinks();

	// remove old links
	links.exit().remove();
  }
  function redrawLinks() {
	links.selectAll('path').attr('d', function(d) {
	  d.sourceX = d.source.x + (d.source.width/2);
	  d.sourceY = d.source.y - 10;//+ d.source.height + 10;
	  d.targetX = d.target.x + (d.target.width/2); 
	  d.targetY = d.target.y + d.target.height + 10; 

	  return 'M' + d.sourceX + ',' + d.sourceY + 'L' + d.targetX + ',' + d.targetY;
	});
  }
  function getColor(id) {
	var currentValue = Session.get('selectedValue');
	var country = Countries.findOne({_id: id});
	var riskRating;
	if (currentValue == 's') {
	  riskRating = Math.max(country.cl, country.eo, country.fa, 
							country.fl, country.fs, country.hs, country.wh);
	} else {
	  riskRating = Number(country[currentValue]);
	}

	if (riskRating === -1) return 'gray';
	if (riskRating === 0) return 'green';
	if (riskRating === 1) return 'orange';
	if (riskRating === 2) return 'red';
  }
  function drawComponents() {
	components = components.data(diagram.components, function(d) { 
	  return d._id; 
	});

	var enteringComponents = components.enter().append('svg:g')
	.attr('transform', function(d) {
	  return 'translate(' + d.x + ',' + d.y + ')';	
	});
	enteringComponents.append('svg:rect')
	.attr('rx', 2)
	.attr('ry', 2)
	.attr('width', 200)
	.attr('height', 200)
	.attr('class', function(d) {
	  return 'component-' + d._id;
	})
	.on('click', function(d) {
	  Session.set('selectedComponentId', d._id);
	})
	.attr('fill', function(d) { 
	  return getColor(d.siteLocation);
	})
	.attr('filter', 'url(#drop-shadow)');


	enteringComponents.append('svg:text')
	.attr('x', 16)
	.attr('y', 36)
	.attr('class', 'mdl-card__title-text tracy-component-text')
	.attr('id', function(d) {return 'name_component_' + d._id})
	.text(function(d){ return d.name; });

	enteringComponents.append('svg:text')
	.attr('x', 16)
	.attr('y', 90)
	.attr('class', 'mdl-card__supporting-text tracy-component-text ' + 
		  'tracy-component-text-supporting')
	.attr('id', function(d) {return 'firmName_component_' + d._id})
	.text(function(d){ return d.firmName; });
	enteringComponents.append('svg:text')
	.attr('x', 16)
	.attr('y', 108)
	.attr('class', 'mdl-card__supporting-text tracy-component-text ' +
		  'tracy-component-text-supporting')
	.attr('id', function(d) {return 'siteLocation_component_' + d._id})
	.text(function(d){ 
	  var country = Countries.findOne({_id: d.siteLocation});
	  return country.name; 
	});



	enteringComponents.append('svg:g')
	.attr('transform', 'translate(0,150)')
	.attr('id', function(d) {return 'activities_' + d._id; });

	enteringComponents.each(function(d) { 
	  drawActivities(d._id, d.activities);
	});



	components.exit().remove();
  }

  function drawActivities(id, activities) {
	var width = 20, padding = 15;
	var boxLength = (activities.length * width) 
	+ ((activities.length - 1) * padding);
	var xPos = (200 - boxLength) / 2;
	for (var i = 0; i < activities.length; i++) {
	  d3.select('#activities_' + id)
	  .append("svg:use")
	  .attr('xlink:href', '#icon-' + activities[i])
	  .attr('x', xPos);
	  xPos += (width + padding);
	}
  }

})
