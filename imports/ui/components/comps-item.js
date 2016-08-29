import './comps-item.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { $ } from 'meteor/jquery';

import { Comps } from '../../api/comps/comps.js';
import { Regions } from '../../api/regions/regions.js';
import { RiskModels } from '../../api/riskmodels/riskmodels.js';

import {
 updatePosition,
 remove,
} from '../../api/comps/methods.js';

Template.Comps_item.onCreated(function compsItemOnCreated() {
  this.autorun(() => {
    new SimpleSchema({
      comp: { type: Comps._helpers },
	  selectedValue: { type: String },
	  riskModelId: { type: String },
	  width: { type: Number },
	  height: { type: Number },
      moving: { type: Boolean, optional: true },
      onMovingChange: { type: Function },
      connecting: { type: Boolean, optional: true },
      onConnectingChange: { type: Function },
      onConnectingChildChange: { type: Function },
      tempX: { type: Number },
      tempY: { type: Number },
      gridX: { type: Number },
      gridY: { type: Number },
      gridWidth: { type: Number },
      gridHeight: { type: Number },
    }).validate(Template.currentData());
  });
  
  this.state = new ReactiveDict();
  this.state.setDefault({
	offsetX: 0,
	offsetY: 0,
	showActions: false,
  });

});

Template.Comps_item.helpers({
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
  hidden() {
	const state = Template.instance().state;
	if(!state.get('showActions')) {
	  return 'hidden';
	}
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

Template.Comps_item.events({
  'mousedown .component'(event, instance) {
	if(event.button != 0) return;
	event.preventDefault();
	event.stopPropagation();
	const state = instance.state;

	const offset = $(instance.firstNode).offset();
	state.set('offsetX', event.pageX - offset.left);
	state.set('offsetY', event.pageY - offset.top);
	this.onMovingChange(true);
  },
  'mouseup'() {
	updatePosition.call({ 
	  compId: this.comp._id,
	  newX: this.gridX,
	  newY: this.gridY,
	});
  },
  'mouseover'(event, instance) {
	instance.state.set('showActions', true);
	this.onConnectingChildChange(true);
  },
  'mouseout'(event, instance) {
	instance.state.set('showActions', false);
	this.onConnectingChildChange(false);
  },
  'mousedown .js-connect'(event) {
	event.stopPropagation();
	event.preventDefault();

	this.onConnectingChange(true);
  },
  'mousedown .js-delete'(event) {
	event.stopPropagation();
	event.preventDefault();
  },
  'click .js-delete'() {
	remove.call({ compId: this.comp._id });
  },
  'mousedown .js-edit-comp'(event) {
	event.stopPropagation();
	event.preventDefault();
  }
});
