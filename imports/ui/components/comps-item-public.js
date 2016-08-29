import './comps-item-public.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { $ } from 'meteor/jquery';

import { Comps } from '../../api/comps/comps.js';
import { Regions } from '../../api/regions/regions.js';
import { RiskModels } from '../../api/riskmodels/riskmodels.js';

Template.Comps_item_public.onCreated(function compsItemOnCreated() {
  this.autorun(() => {
    new SimpleSchema({
      comp: { type: Comps._helpers },
      selectedValue: { type: String },
      riskModelId: { type: String },
      width: { type: Number },
      height: { type: Number },
      gridWidth: { type: Number },
      gridHeight: { type: Number },
    }).validate(Template.currentData());
  });
  

});

Template.Comps_item_public.helpers({
  transform() {
	const state = Template.instance().state;

	if (this.moving) {
	  return 'translate(' + (this.tempX - state.get('offsetX')) + ',' + (this.tempY - state.get('offsetY')) + ')';
	} else {
	  return 'translate(' + this.comp.x * this.gridWidth + ',' + this.comp.y * this.gridHeight + ')';
	}
  },
  risk() {
	//TODO very ugly, rewrite!
	const riskModelId = Template.currentData().riskModelId;
	const regionId = Template.currentData().comp.siteLocation; 
	const regions = RiskModels.findOne({ _id: riskModelId }).regions;
	let regionRisks = null;
	
	for (let i = 0; i < regions.length; i++) {
	  if (regions[i].regionId == regionId) {
		regionRisks = regions[i];
	  }
	}
	
	if(!regionRisks) {
	  return 'risk-unknown';
	}

	let riskValue = regionRisks[this.selectedValue];
	if (this.selectedValue == 's') {
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

  },
  strokeWidth() {
	return 2;
  },
  locationName(locationId) {
	if (locationId) {
	  return Regions.findOne({ _id: locationId }).name;
	} else {
	  return 'unknown';
	}
  },
  isUnknown() {
	const name = Template.currentData().comp.name;
	const firmName = Template.currentData().comp.firmName;
	const siteLocation = Template.currentData().comp.siteLocation;

	return (name || firmName || siteLocation);
	
  }
});

Template.Comps_item_public.events({
});
