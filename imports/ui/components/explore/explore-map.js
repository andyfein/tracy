/* global d3 */
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { Session } from 'meteor/session';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { CountryCodes } from 'meteor/3stack:country-codes';

import './explore-map.html';
import '../legend.html';
import { Comps } from '../../../api/comps/comps.js';
import { RiskModels } from '../../../api/riskmodels/riskmodels.js';

import '../risk-select.js';

Template.Explore_map.onCreated(function exploreMapOnCreated() {
  this.autorun(() => {
	new SimpleSchema({
	  lcModelId: { type: SimpleSchema.RegEx.id },
	  comps: { type: Mongo.Cursor },
	  riskModel: { type: RiskModels._helpers },
	}).validate(Template.currentData());
  });
});

Template.Explore_map.onRendered(function exploreMapOnRendered() {
});

Template.Explore_map.helpers({
  regionArgs(region, regions) {
	return {
	  riskModel: this.riskModel,
	  region,
	  regions,
	}
  },
  regionCounts() {
	const compsArray = this.comps.fetch();
	const regions = _.pluck(compsArray, 'siteLocation');
	const counts = _.chain(regions).countBy().pairs().value();
	return counts;
  },
  selectedComponents(){
	const regionId = Session.get('currentRegion'); 
	return Comps.find({ siteLocation: regionId });
  },
  currentRegion(){
	return  Session.get('currentRegion'); 
  },
  currentRegionName() {
	return CountryCodes.countryName(Session.get('currentRegion'));
  }
});

Template.Explore_map.events({
  'click .js-show-comps'() {
	Session.set('currentRegion', this.region[0]);
	$('#modal-show-comps').openModal();
  },
});

Template.RegionBubble.onCreated(function regionBubbleOnCreated() {
  this.state = new ReactiveDict();
  this.state.setDefault({
	centerX: 0,
	centerY: 0,
	radius: 1,
  });
});

Template.RegionBubble.onRendered(function regionBubbleOnRendered() {
	const data = Template.currentData();
	const regionId = data.region[0];
	if (regionId === 'undefined') {
	  this.state.set('centerX', 20);
	  this.state.set('centerY', 20);
	} else {
	  const regionG = $('#' + regionId)[0];
	  if (regionG) {
		const bbox = regionG.getBBox();
		this.state.set('centerX', bbox.x + (bbox.width/2));
		this.state.set('centerY', bbox.y + (bbox.height/2));
	  }
	}

	const max = Math.max.apply(Math, data.regions.map(function(o){return o[1];}));
	const rscale = d3.scale.linear().domain([1, max]).range([3,18]);
	const count = data.region[1];
	this.state.set('radius', rscale(count));
});

Template.RegionBubble.helpers({
  centerX() {
	return Template.instance().state.get('centerX');
  },
  centerY() {
	return Template.instance().state.get('centerY');
  },
  radius() {
	return Template.instance().state.get('radius');
  },
  risk() {
	//TODO very ugly, rewrite!
	const regionId = this.region[0]; 
	const regions = this.riskModel.regions;

	// find risk values of comp location
	let regionRisks = null;
	for (let i = 0; i < regions.length; i++) {
	  if (regions[i].regionId == regionId) {
		regionRisks = regions[i];
	  }
	}

	// find corresponding risk rating
	if(!regionRisks) {
	  return 'risk-unknown';
	} else {
	  let riskValue = regionRisks[Session.get('selectedRisk')];
	  if (Session.equals('selectedRisk','s')) {
		riskValue = Math.max(regionRisks['cl'], regionRisks['eo'], regionRisks['fl'], regionRisks['fs'], regionRisks['sb'], regionRisks['hs'], regionRisks['wh']);
	  }
	  if (riskValue === 0) {
		return 'risk-low';
	  } else if (riskValue === 1) {
		return 'risk-medium';
	  } else if (riskValue === 2) {
		return 'risk-high';
	  } else {
		return 'risk-unknown';
	  }
	}
  }
});
