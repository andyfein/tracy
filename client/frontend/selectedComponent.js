// Logic for selected Component Card
Template.selectedComponent.onRendered(function() {
  this.autorun(function() {
	if (!Session.get('selectedComponentId')) return;
	var comp = Comps.findOne({_id: Session.get('selectedComponentId')});

	drawActivities(comp.activities)
	function drawActivities(activities) {
	  var width = 20, padding = 15;
	  var boxLength = (activities.length * width) 
	  + ((activities.length - 1) * padding);
	  var xPos = (200 - boxLength) / 2;
	  d3.select('#currentActivities').selectAll('use').remove();
	  for (var i = 0; i < activities.length; i++) {
		d3.select('#currentActivities')
		.append("svg:use")
		.attr('xlink:href', '#icon-' + activities[i])
		.attr('x', xPos);
		xPos += (width + padding);
	  }
	}
  });
});

Template.selectedComponent.helpers({
  currentComponent: function() {
	if (Session.get('selectedComponentId')) {
	  var component = Comps.findOne({_id: Session.get('selectedComponentId')});

	  var currentValue = Session.get('selectedValue');
	  var country = Countries.findOne({_id: component.siteLocation});
	  var riskRating, risk;
	  if (currentValue == 's') {
		riskRating = Math.max(country.cl,
							  country.eo,
							  country.fa,
							  country.fl,
							  country.fs,
							  country.hs,
							  country.wh);
	  } else {
		riskRating = Number(country[currentValue]);
	  }

	  if (riskRating === -1) risk = 'undefined';
	  if (riskRating === 0) risk = 'low';
	  if (riskRating === 1) risk = 'medium';
	  if (riskRating === 2) risk = 'high';

	  component.country = country.name;
	  component.risk = risk;

	  return component;

	}
  }
});
