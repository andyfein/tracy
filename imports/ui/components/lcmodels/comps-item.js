import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { CountryCodes } from 'meteor/3stack:country-codes';
import { Session } from 'meteor/session';
//import { $ } from 'meteor/jquery';

import './comps-item.html';
import { Comps } from '../../../api/comps/comps.js';
import { RiskModels } from '../../../api/riskmodels/riskmodels.js';

import {
 updatePosition,
 remove,
 toggleRetract,
} from '../../../api/comps/methods.js';

Template.Comps_item.onCreated(function compsItemOnCreated() {
  this.autorun(() => {
    new SimpleSchema({
      comp: { type: Comps._helpers },
	  riskModel: { type: RiskModels._helpers },
	  width: { type: Number },
	  height: { type: Number },
      moving: { type: Boolean, optional: true },
      onMovingChange: { type: Function },
      connecting: { type: Boolean, optional: true },
      onConnectingChange: { type: Function },
      onConnectingChildChange: { type: Function },
      tempX: { type: Number, decimal: true },
      tempY: { type: Number, decimal: true },
      gridX: { type: Number },
      gridY: { type: Number },
      gridWidth: { type: Number },
      gridHeight: { type: Number },
	  currentScale: { type: Number, decimal: true },
    }).validate(Template.currentData());
  });
  
  this.state = new ReactiveDict();
  this.state.setDefault({
	//offsetX: 0,
	//offsetY: 0,
	showActions: false,
  });

});

Template.Comps_item.helpers({
  retractedComps() {
	return [
	  {
		x: -20,
		y: -20,
		risk: 'risk-unknown',
	  },
	  {
		x: -15,
		y: -15,
		risk: 'risk-low',
	  },
	  {
		x: -10,
		y: -10,
		risk: 'risk-medium',
	  },
	  {
		x: -5,
		y: -5,
		risk: 'risk-high',
	  }
	];
  },
  transform() {
	//const state = Template.instance().state;


	if (this.moving) {
	  return 'translate(' + (this.tempX) + ',' + (this.tempY) + ')';
	} else {
	  return 'translate(' + this.comp.x * this.gridWidth + ',' + this.comp.y * this.gridHeight + ')';
	}
  },
  risk() {
	//TODO very ugly, rewrite, maybe move to publishComposite?
	const regionId = this.comp.siteLocation; 
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
		riskValue = Math.max(regionRisks['cl'], regionRisks['eo'], regionRisks['fa'], regionRisks['fl'], regionRisks['fs'], regionRisks['sb'], regionRisks['hs'], regionRisks['wh']);
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
	const locationName = CountryCodes.countryName(locationId);
	if(locationName) {
	  return locationName;
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
  'mousedown .component'(event) {
	if(event.button != 0) return;
	event.preventDefault();
	event.stopPropagation();
	//const state = templateInstance.state;

	//const offset = $(templateInstance.firstNode).offset();
	//state.set('offsetX', event.pageX - offset.left);
	//state.set('offsetY', event.pageY - offset.top);
	this.onMovingChange(true);
  },
  'mouseup .component'() {
	updatePosition.call({ 
	  compId: this.comp._id,
	  newX: this.gridX,
	  newY: this.gridY,
	});
  },
  'mouseover'(event, templateInstance) {
	templateInstance.state.set('showActions', true);
	this.onConnectingChildChange(true);
  },
  'mouseout'(event, templateInstance) {
	templateInstance.state.set('showActions', false);
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

  },
  'mouseup .js-edit-comp'(event) {
	event.stopPropagation();
	event.preventDefault();
  },
  'click .js-retract'(event) {
	event.stopPropagation();
	event.preventDefault();
	toggleRetract.call({ compId: this.comp._id });
  },
  'mouseup .js-retract'(event) {
	event.stopPropagation();
	event.preventDefault();

  },
  'mousedown .js-retract'(event) {
	event.stopPropagation();
	event.preventDefault();

  }


});
