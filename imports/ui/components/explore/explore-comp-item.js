import { Template } from 'meteor/templating';
import { CountryCodes } from 'meteor/3stack:country-codes';
import { Session } from 'meteor/session';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import './explore-comp-item.html';
import { Comps } from '../../../api/comps/comps.js';
import { RiskModels } from '../../../api/riskmodels/riskmodels.js';

Template.Explore_comp_item.onCreated(function compsItemOnCreated() {
  this.autorun(() => {
    new SimpleSchema({
	  // TODO see comment in explore-lcmodel.js
      comp: { type: Comps._helpers },
	  riskModel: { type: RiskModels._helpers },
      width: { type: Number },
      height: { type: Number },
      gridWidth: { type: Number },
      gridHeight: { type: Number },
    }).validate(Template.currentData());
  });
  

});

Template.Explore_comp_item.helpers({
  transform() {
	return 'translate(' + this.comp.x * this.gridWidth + ',' + this.comp.y * this.gridHeight + ')';
  },
  locationName(locationId) {
	const locationName = CountryCodes.countryName(locationId);
	if(locationName) {
	  return locationName;
	} else {
	  return 'unknown';
	}
  },

  risk() {
	//TODO very ugly, rewrite maybe move to publishComposite?
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
  },
  isUnknown() {
	const name = Template.currentData().comp.name;
	const firmName = Template.currentData().comp.firmName;
	const siteLocation = Template.currentData().comp.siteLocation;

	return (name || firmName || siteLocation);
  }
});
