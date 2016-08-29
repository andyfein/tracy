import './lcmodel-map.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
//import { d3 } from 'meteor/d3js:d3';
//

import { Regions } from '../../api/regions/regions.js';
import { Comps } from '../../api/comps/comps.js';

Template.LcModel_map.onCreated(function lcModelMapOnCreated() {
  //TODO validate
});

Template.LcModel_map.onRendered(function lcModelMaponRendered() {
});

Template.LcModel_map.helpers({
  regionArgs(region, regions) {
	return {
	  region,
	  regions,
	}
  },
  regions() {
	const compsArray = this.comps.fetch();
	const regions = _.pluck(compsArray, 'siteLocation');
	const counts = _.chain(regions).countBy().pairs().value();
	return counts;
  },
  selectedComponents(){
	regionId = Session.get('currentRegion'); 
	console.log(regionId);
	return Comps.find({ siteLocation: regionId });
  },
  currentRegion(){
	regionId =  Session.get('currentRegion'); 
	return Regions.findOne(regionId).name;
  }
});

Template.LcModel_map.events({
  'click .js-show-comps'() {
	Session.set('currentRegion', this.region[0]);
	$('#modal-show-comps').openModal();
  },
});

Template.RegionBubble.helpers({
  centerX(region) {
	const regionId = region[0];
	if (regionId === 'undefined') {
	  return 20;
	}
	const regionG = $('#' + regionId)[0];
	if (regionG) {
	  const bbox = regionG.getBBox();
	  return bbox.x + (bbox.width/2);
	}

  },
  centerY(region) {
	const regionId = region[0];
	if (regionId === 'undefined') {
	  return 630;
	}
	const regionG = $('#' + regionId)[0];
	if (regionG) {
	  const bbox = $('#' + regionId)[0].getBBox();
	  return bbox.y + (bbox.height/2);
	}
  },
  radius(region, regions) {
	const max = Math.max.apply(Math,regions.map(function(o){return o[1];}));
	const rscale = d3.scale.linear().domain([1, max]).range([3,18]);
	const count = region[1];
	return rscale(count);
  },

});
