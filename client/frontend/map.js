// Logic for map view

Template.map.onRendered(function() {
  Session.set('currentMode', 'map');

  document.querySelector('.component-list-card').setAttribute('style', '');

  var zoom = d3.behavior.zoom()
  .scaleExtent([1, 9])
  .on("zoom", move);


  var width = document.getElementById('container').offsetWidth;
  var containerHeight = document.getElementById('container').offsetHeight;
  var height = 700;

  var topo,projection,path,svg,g;

  var unknownCountryId = 'DDESWWrxDWj3iz2Km';



  setup(width,height);

  function setup(width,height){
	projection = d3.geo.mercator()
	.translate([(width/2), (height/2)])
	.scale( width / 2 / Math.PI);

	path = d3.geo.path().projection(projection);

	svg = d3.select("#container").append("svg")
	.attr("width", width)
	.attr("height", height)
	.call(zoom)
	.attr('class', 'svg-map')
	.append("g");

	g = svg.append("g");

	svg.append('rect')
	.attr('width', 180)
	.attr('height', 20)
	.attr('fill', 'white')
	.attr('stroke-width', 1)
	.attr('stroke', 'rgb(0,0,0)')
	.attr('x', 0)
	.attr('y', containerHeight - 20);

	

	svg.append('text')
	.text('Unknown Site Location:')
	.attr('x', 5)
	.attr('y', containerHeight - 5);


  }

  var worldCollection = World.find({});
  var countriesCollection = Countries.find({});
  var countriesAdded = false;

  this.autorun(function() {
	if(!Session.get('worldLoaded') 
	  || !Session.get('countriesLoaded')
	  || !Session.get('selectedValue')) return;


	var world = worldCollection.fetch()[0]
	var worldmap = topojson.feature(world, world.objects.countries).features
	var topo = worldmap;
	draw(topo);


	var countries = countriesCollection.fetch();
	if(! countriesAdded) {
	  countries.forEach(function(i){
		if (i._id == unknownCountryId) {
		  svg.append("svg:circle")
		  .attr("cx", 165)
		  .attr("cy", containerHeight-10)
		  .attr("fill", getColor(unknownCountryId))
		  .attr('filter', 'url(#drop-shadow)')
		  .attr("r", 10)
		  .attr('data-country', unknownCountryId)
		  .attr('class', 'country-select country-' + unknownCountryId);
		} else {

		  addpoint(i.lng, i.lat, i._id);
		}
	  });
	  countriesAdded = true;
	} else {

	  for (var i = 0; i < countries.length; i++) {
		if (countries[i]._id == unknownCountryId) return;
		var point = document.querySelector('.country-' + countries[i]._id);
		point.setAttribute('fill', getColor(countries[i]._id));
	  }

	}
  });




  function draw(topo) {
	var country = g.selectAll(".country").data(topo);

	country.enter().insert("path")
	.attr("class", "country")
	.attr("d", path)
	.attr("id", function(d,i) { return d.id; })
	.style("fill", '#444444');

  }


  function redraw() {
	width = document.getElementById('container').offsetWidth;
	height = document.getElementById('container').offsetHeight;
	
	d3.select('svg').remove();
	setup(width,height);
	draw(topo);
  }


  function move() {

	var t = d3.event.translate;
	var s = d3.event.scale; 
	zscale = s;
	var h = 1;


	t[0] = Math.min(
	  (width/height)  * (s - 1), 
	  Math.max( width * (1 - s), t[0] )
	);

	t[1] = Math.min(
	  h * (s - 1) + h * s, 
	  Math.max(height  * (1 - s) - h * s, t[1])
	);

	zoom.translate(t);
	g.selectAll('.country').attr("transform", "translate(" + t + ")scale(" + s + ")");

	var countries = countriesCollection.fetch();

	for (var i = 0; i < countries.length; i++) {
	  if (countries[i]._id == unknownCountryId) continue;
	  var point = document.querySelector('.country-' + countries[i]._id);
	  var baseX = Number(point.getAttribute('data-x'));
	  var baseY = Number(point.getAttribute('data-y'));
	  point.setAttribute('cx', baseX * s);
	  point.setAttribute('cy', baseY * s);
	  point.setAttribute('transform', 'translate(' + t + ')');
	}


  }


  //function to add points and text to the map (used in plotting capitals)
  function addpoint(lat,lon,id) {

	var gpoint = g.append("g").attr("class", "gpoint");
	var x = projection([lat,lon])[0];
	var y = projection([lat,lon])[1];

	gpoint.append("svg:circle")
	.attr("cx", x)
	.attr("cy", y)
	.attr('data-x', x)
	.attr('data-y', y)
	.attr("fill", getColor(id))
	.attr('filter', 'url(#drop-shadow)')
	.attr("r", 10)
	.attr('data-country', id)
	.attr('class', 'country-select country-' + id);


  }

  function getColor(id) {
	var selectedValue = Session.get('selectedValue');
	var country = Countries.findOne({_id: id});
	var riskRating;
	if (selectedValue == 's') {
	  riskRating = Math.max(country.cl, 
							country.eo, 
							country.fa, 
							country.fl, 
							country.fs, 
							country.hs, 
							country.wh);
	} else {
	  riskRating = Number(country[selectedValue]);
	}

	if (riskRating === -1) return 'gray';
	if (riskRating === 0) return 'green';
	if (riskRating === 1) return 'orange';
	if (riskRating === 2) return 'red';
  }

});

Template.map.events({
  'click .country-select': function(event, template) {
	event.preventDefault();
	event.stopPropagation();

	Session.set('selectedCountryId', event.target.getAttribute('data-country'));
  }

});
