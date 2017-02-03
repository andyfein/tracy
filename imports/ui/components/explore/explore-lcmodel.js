/* global d3 */
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';

import './explore-lcmodel.html';

import { LcModelTree } from '../lcmodel.js';
import '../legend.html';
import '../risk-select.js';

import './explore-comp-item.js';
import './explore-connect-item.js';

import { RiskModels } from '../../../api/riskmodels/riskmodels.js';

Template.Explore_lcmodel.onCreated(function exploreLcModelOnCreated() {
  this.autorun(() => {
    new SimpleSchema({
	  lcModelId: { type: SimpleSchema.RegEx.Id },
      comps: { type: Mongo.Cursor },
      connects: { type: Mongo.Cursor },
	  // FIXME: I have no idea what RiskModels._helpers does - RiskModels.schema doesn't work as I think it should
      riskModel: { type: RiskModels._helpers },
    }).validate(Template.currentData());
  });

  this.state = new ReactiveDict();
  this.state.setDefault({
	// canvas settings
	gridWidth: 250,
	gridHeight: 200,
	compWidth: 185,
	compHeight: 135,

	// panning canvas
	panning: false,
	oldMouseX: 0,
	oldMouseY: 0,
	currentPanX: 0,
	currentPanY: 0,
	currentScale: 1,
  });

  this.gridX = () => {
	return Math.round((this.state.get('currentMoveX') - this.state.get('currentPanX') - (this.state.get('compWidth') / 2)) / this.state.get('gridWidth'));
  };

  this.gridY = () => {
	return Math.round((this.state.get('currentMoveY') - this.state.get('currentPanY') - (this.state.get('compHeight') /2)) / this.state.get('gridHeight'));
  };

});

Template.Explore_lcmodel.onRendered(function exploreLcModelOnRendered() {
  const initX = ($(window).width() / 2) - (this.state.get('compWidth') /2),
	initY = this.state.get('compHeight');
  this.state.set('currentPanX', initX); 
  this.state.set('currentPanY', initY); 

  let lcModel;
  lcModel = new LcModelTree('#lcmodel-canvas', Template.currentData().riskModel);
  let comps = Template.currentData().comps;
  let connects = Template.currentData().connects;
  let wasInit = false
  Tracker.autorun(() => {
	// FIXME only to prevent rerun when selected risk changes ... normally, this shouldn't even be necessary ??
	if (!wasInit) {
	  lcModel.setCompsAndConnects(comps.fetch(), connects.fetch());
	  wasInit = true;
	}
  });
  //Template.currentData().comps.observe({
  //  added: function(doc) {
  //    lcModel.addComp(doc);
  //  }
  //});
  //Template.currentData().connects.observe({
  //  added: function(doc) {
  //    lcModel.addConnect(doc);
  //  }
  //});
  //
  Tracker.autorun(() => {
    if(Session.get('selectedRisk')) {
      lcModel.updateRisks();
    }
    
  });
});

Template.Explore_lcmodel.helpers({
  compArgs(comp) {
	const state = Template.instance().state;
	return {
	  comp,
	  riskModel: this.riskModel,
	  width: state.get('compWidth'),
	  height: state.get('compHeight'),
	  gridWidth: state.get('gridWidth'),
	  gridHeight: state.get('gridHeight'),
	};
  },
  connectArgs(connect) {
	const state = Template.instance().state;
	const parent = connect && connect.parent();
	const child = connect && connect.child();
	return {
	  connect,
	  parent,
	  child,
	  compWidth: state.get('compWidth'),
	  compHeight: state.get('compHeight'),
	  gridWidth: state.get('gridWidth'),
	  gridHeight: state.get('gridHeight'),
	};
  },
  transform() {
	const state = Template.instance().state;
	
	const panX = state.get('currentPanX'),
	  panY = state.get('currentPanY'),
	  scale = state.get('currentScale');

	return 'transform: translate(' + panX+ 'px,' + panY + 'px)scale(' + scale + ')';
  },
});

Template.Explore_lcmodel.events({
//  'mousedown .canvas'(event, templateInstance) {
//	if(event.button != 0) return;
//	event.preventDefault();
//	const state = templateInstance.state;
//
//	state.set('panning', true);
//	state.set('oldMouseX', event.pageX);
//	state.set('oldMouseY', event.pageY);
//  },
//  'mousemove'(event, templateInstance) {
//	const state = templateInstance.state;
//
//	//tracking mouse for moving components -> TODO performance optimization?
//	state.set('currentMoveX', event.pageX);
//	state.set('currentMoveY', event.pageY);
//
//	if(state.get('panning')) {
//	  const newMouseX = event.pageX,
//	  newMouseY = event.pageY;
//	  const diffPanX = newMouseX - state.get('oldMouseX'),
//	  diffPanY = newMouseY - state.get('oldMouseY');
//	  state.set('oldMouseX', newMouseX);
//	  state.set('oldMouseY', newMouseY);
//	  state.set('currentPanX', state.get('currentPanX') + diffPanX);
//	  state.set('currentPanY', state.get('currentPanY') + diffPanY);
//	} 
//  },
//  'mouseup'(event, templateInstance) {
//	const state = templateInstance.state;
//	
//	if(state.get('panning')) {
//	  state.set('panning', false);
//	  state.set('lastPanX', state.get('currentPanX'));
//	  state.set('lastPanY', state.get('currentPanY'));
//	}
//  },
//  'wheel svg'(event, templateInstance) {
//	const state = templateInstance.state;
//	const direction = event.originalEvent.deltaY;
//
//	if (direction > 0) {
//	  state.set('currentScale', state.get('currentScale') - 0.1);
//	} else if (direction < 0) {
//	  state.set('currentScale', state.get('currentScale') + 0.1);
//	}
//  },
});
