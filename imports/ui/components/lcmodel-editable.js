/* global d3, Materialize */
// d3 needs to get passed a var in some functions even if it's not used
/* eslint no-unused-vars: ["error", {"argsIgnorePattern": "d3Ignored"}] */

import {_} from 'meteor/underscore';
import { CountryCodes } from 'meteor/3stack:country-codes';
import { $ } from 'meteor/jquery';

import { LcModelTree } from './lcmodel.js';

import {
  insert, 
  remove,
} from '../../api/comps/methods.js';

import {
  connect,
} from '../../api/connects/methods.js';

export class LcModelTreeEditable extends LcModelTree {

  constructor(element, riskModel, lcModelId, templateInstance) {
    super(element, riskModel, lcModelId);
    this.updateMode = false;
    this.removeMode = false;
	this.currentParent = null;
	this.currentUpdate = null;
	this.templateState = templateInstance.state;
  }

  updateComp(comp) {
	// error prone...
	this.nodes.forEach(function(node) {
	  if(node._id == comp._id) {
		node.name = comp.name;
		node.siteLocation = comp.siteLocation;
		node.firmName = comp.siteLocation;
		node.contacted = comp.contacted;
		node.visited = comp.visited;
		node.negotiating = comp.negotiating;
	  }
	});
	//this.nodes = _.map(this.nodes, function(node) {
	//  if (node._id == comp._id) {
	//	console.log('found');
	//	return comp;
	//  }
	//});
	this.currentUpdate.name = comp.name;
	this.currentUpdate.siteLocation = comp.siteLocation;
	this.currentUpdate.firmName = comp.firmName;
	this.currentUpdate.contacted = comp.contacted;
	this.currentUpdate.visited = comp.visited;
	this.currentUpdate.negotiating = comp.negotiating;
	this.renderTree();
  }
  
  removeComp(comp) {
	this.nodes = _.reject(this.nodes, function(node) {
		return node._id == comp._id;
	});
	this.currentParent.children = _.reject(this.currentParent.children, function(node) {
		return node._id == comp._id;
	});
	this.removeMode = true;

	this.renderTree();
  }


  onNodeEnter(nodeEnter) {
	super.onNodeEnter(nodeEnter);
	nodeEnter.append('circle')
	.classed('action', true)
	.classed('edit-action-add', true)
	.attr('cx', 92.5)
	.attr('cy', 135)
	.attr('r', 7)
	.style('display', 'none')
	.on('mouseover', function(d3Ignored) {
	  d3.select(this).attr('r', 10);
	})
	.on('mouseout', function(d3Ignored) {
	  d3.select(this).attr('r', 7);
	})
	.on('click', (d) => {
	  this.updateMode = d._id;
	  this.currentParent = d;
	  insert.call({
		  lcmodelId: this.lcModelId,
		  //parentCompId: state.get('parentComp')._id,
		  x: Number(0),
		  y: Number(0),
		}, (error, result) => {
		  connect.call({
			lcmodelId: this.lcModelId,
			parentCompId: d._id,
			childCompId: result,
		  });
		});
	});

	nodeEnter.append('use')
	.classed('action', true)
	.classed('edit-action', true)
	.attr('xlink:href', '#ic_delete')
	.style('display', 'none')
	.attr('x', 161)
	.attr('y', 109)
	.on('click', (d) => {
	  this.updateMode = d.parent._id;
	  this.currentParent = d.parent;
	  remove.call({ compId: d._id });
	});

	nodeEnter.append('use')
	.classed('action', true)
	.classed('edit-action', true)
	.attr('xlink:href', '#ic_edit')
	.style('display', 'none')
	.attr('x', 5)
	.attr('y', 109)
	.on('click', (d) => {
	  this.updateMode = d._id;
	  this.currentUpdate = d;
	  this.templateState.set('editComp', _.omit(d, ['children', '_children', 'parent']));
	  $('#modal-edit-comp').openModal();
	  $('#comp-sitelocation').material_select();
	  Materialize.updateTextFields();
	});
  }

  onNodeUpdate(nodeUpdate) {
	super.onNodeUpdate(nodeUpdate);
	nodeUpdate.selectAll('.edit-action')
	.delay(500)
	.style('display', function(d3Ignored) {
	  //return d._children ? 'none' : 'initial';
	  return 'initial';
	});
	nodeUpdate.selectAll('.edit-action-add')
	.delay(500)
	.style('display', function(d) {
	  return d._children ? 'none' : 'initial';
	});

	let knownComponents = nodeUpdate.filter(function(d) {
	  return (d.name || d.firmName || d.siteLocation);
	});
	knownComponents.selectAll('text.name')
	.text(function(d) {
	  return d.name;
	});
	knownComponents.selectAll('text.firmName')
	.text(function(d) {
	  return d.firmName
	});
	knownComponents.selectAll('text.siteLocation')
	.text(function(d) {
	  const locationName = CountryCodes.countryName(d.siteLocation);
	  return locationName ? locationName : 'unknown';
	});
//	let unknownComponents = nodeUpdate.filter(function(d) {
//	  return !(d.name || d.firmName || d.siteLocation);
//	});
//	unknownComponents.selectAll('text')
//	.text('...');


  }

  onNodeExit(nodeExit) {
	super.onNodeExit(nodeExit);
	nodeExit.selectAll('.edit-action, .edit-action-add')
	.duration(250)
	.style('display', 'none');
  }
}
