/* global d3 */
// d3 needs to get passed a var in some functions even if it's not used
/* eslint no-unused-vars: ["error", {"argsIgnorePattern": "d3Ignored"}] */
import {_} from 'meteor/underscore';
import { Session } from 'meteor/session';
import { CountryCodes } from 'meteor/3stack:country-codes';

export class LcModelTree {
  constructor(element, riskModel, lcModelId) {
	this.lcModelId = lcModelId;
	this.baseSvg = d3.select(element);
	this.svgGroup = this.baseSvg.append('g');
	this.root = null;
	this.nodes = [];
	this.links = [];
	this.i = 0;
	this.riskModel = riskModel;
	this.tree = d3.layout.tree()
	.nodeSize([250, 250])
	.separation(function(a, b) {
	  return a.parent == b.parent ? 1 : 1.2;
	});
	this.diagonal = d3.svg.diagonal().projection(function(d) {
	  return [d.x, d.y];
	});
	let zoom = d3.behavior.zoom()
	.scaleExtent([0.2, 2])
	.on('zoom', () =>  {
	  this.svgGroup.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
	});
	this.baseSvg.call(zoom);
	this.baseSvg.attr('transform', 'translate(' + (window.innerWidth/2 - 185/2) + ',' + 100 + ')');

	this.tree.children()
	
  }

  addComp(comp) {
	if (comp.isRoot) {
	  this.root = comp;
	} 
	comp.riskClass = this.riskClass(comp);
	this.nodes.push(comp);
	this.renderTree();
  }
  addConnect(connect) {
	this.links.push(connect);
	this.renderTree();
  }
  updateRisks() {
	_.each(this.nodes, (node) => {
	  node.riskClass = this.riskClass(node);
	});
	//this.renderTree();
	this.updateTree(this.root);
  }

  findChildren(node) {
	let nodeLinks = _.where(this.links, {parentCompId: node._id});
	let children = [];
	nodeLinks.forEach((link) =>  {
	  let childId = link.childCompId;
	  let child = _.findWhere(this.nodes, {_id: childId})
	  // only add children if there are no collapsed ones already
	  if (child) {
		
		if (!this.updateMode)  {
		  child.children = this.findChildren(child);
		} else  if (!child._children){
		  child.children = this.findChildren(child);
		}
		children.push(child);
	  }
	});
//	node.hasUnknownRiskDesc = false;
//	node.hasLowRiskDesc = false;
//	node.hasMediumRiskDesc = false;
//	node.hasHighRiskDesc = false;

	return children;
  }

  renderTree() {
	if(!this.root) return;
	
	this.root.children = this.findChildren(this.root);

	this.root.x0 = 0;
	this.root.y0 = 0;

	function collapse(d) {
	  if(d.children.length > 0) {
		d._children = d.children;
		d._children.forEach(collapse);
		d.children = null;
	  }
	}
	if(!this.updateMode) {
	  this.root.children.forEach(collapse);
	}

	this.updateTree(this.root);

  }

  updateTree(source) {
	let nodes = this.tree.nodes(this.root).reverse(),
	  links = this.tree.links(nodes);

	

	//id needed?
	let node = this.svgGroup.selectAll('g.node')
	.data(nodes, (d) => { return d.id || (d.id = ++this.i)});

	//enter
	let nodeEnter = node.enter().append('g')
	.attr('class', 'node component')
	.attr('transform', function(d3Ignored) {
	  return 'translate(' + (source.x0 + 185/2) + ',' + (source.y0 + 135) + ')';
	});
	this.onNodeEnter(nodeEnter);	

	//node.select('circle.nodeCircle')
	//.attr('r', 4.5);
	
	//update
	let nodeUpdate = node.transition()
	.duration(750)
	.attr('transform', function(d) {
	  return 'translate(' + d.x + ',' + d.y + ')'
	});
	this.onNodeUpdate(nodeUpdate);
	//nodeUpdate.each((d) => {
	//  this.searchRetractedRisks(d);
	//});

	
	//exit
	let nodeExit = node.exit().transition()
	.duration(750)
	.attr('transform', function(d3Ignored) {
	  return 'translate(' + (source.x + 185/2) + ',' + (source.y + 135) + ')';
	})
	.remove();
	this.onNodeExit(nodeExit);

	this.searchRetractedRisks(this.root);
	d3.selectAll('g.retracted-nodes')
	.style('display', function(d) {
	  if (!d._children) {
	    return 'none';
	  } else {
		let numRect = +d.hasUnknownRiskDesc +d.hasLowRiskDesc +d.hasMediumRiskDesc +d.hasHighRiskDesc;
		let unknownChecked = false;
		let lowChecked = false;
		let mediumChecked = false;
		let highChecked = false;
		//console.log(d3.select(this).selectAll('rect'));
		d3.select(this).selectAll('rect').style('display', 'none');
		for (let i = 4; i >= 1; i--) {
		  if(i <= numRect) {
			let retRect = d3.select(this).select('.ret-rect-' + i)
			.style('display', 'initial');
			//remove all other classes from rect
			retRect.attr('class', 'ret-rect-' + i);
			if (d.hasUnknownRiskDesc && !unknownChecked) {
			  retRect.classed('risk-unknown', true);
			  unknownChecked = true;
			} 
			else if (d.hasLowRiskDesc && !lowChecked) {
			  retRect.classed('risk-low', true);
			  lowChecked = true;
			}
			else if (d.hasMediumRiskDesc && !mediumChecked) {
			  retRect.classed('risk-medium', true);
			  mediumChecked = true;
			}
			else if (d.hasHighRiskDesc && !highChecked) {
			  retRect.classed('risk-high', true);
			  highChecked = true;
			}
			
		  } 
		}
		return 'initial';
	  }
	});

	
	//update links
	let diagonal = d3.svg.diagonal()
	.source(function(d) {
	  return { x: d.source.x + 185/2, y: d.source.y + 135 };
	})
	.target(function(d) {
	  return { x: d.target.x + 185/2, y: d.target.y};
	});
	let transDiagonal = d3.svg.diagonal()
	.source(function(d) {
	  return { x: d.source.x + 185/2, y: d.source.y + 135 };
	})
	.target(function(d) {
	  return { x: d.target.x + 185/2, y: d.target.y + 135};
	});

	let link = this.svgGroup.selectAll('path.link')
	.data(links, function(d) {
	  return d.target.id;
	});
	link.enter().insert('path', 'g')
	.attr('class', 'link connector-line')
	.attr('d', function(d3Ignored) {
	  let o = {
		x: source.x0,
		y: source.y0
	  };
	  return transDiagonal({
		source: o,
		target: o,
	  });
	});

	link.transition()
	.duration(750)
	.attr('d', diagonal);

	link.exit().transition()
	.duration(750)
	.attr('d', function(d3Ignored) {
	  let o = {
		x: source.x,
		y: source.y
	  };
	  return transDiagonal({
		source: o,
		target: o
	  });
	})
	.remove();


	nodes.forEach(function(d) {
	  d.x0 = d.x;
	  d.y0 = d.y;
	});
  }

  riskClass(comp) {
	//TODO very ugly, rewrite maybe move to publishComposite?
	const regionId = comp.siteLocation; 
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

  onNodeEnter(nodeEnter) {
	//nodeEnter.each(function(d) {
	//	let thisNode = d3.select(this);
	//	thisNode.append('rect')
	//	.attr('x', -10)
	//	.attr('y', -10)
	//	.attr('class', 'risk-unknown')
	//	.attr('width', 1e-6)
	//	.attr('height', 1e-6)
	//	.attr('style', 'fill-opacity:1;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none');
	//});
	// 
	let retOffset = -5;
	let retractedNodes = nodeEnter.append('g')
	.attr('class', 'retracted-nodes')
	.style('display', function(d) {
	 return d._children ? 'initial' : 'none';
	})
	.on('mouseover', function(d3Ignored) {
	 d3.select(this).transition()
	 //.attr('x', myOffset + retOffset*2)
	 .attr('transform', 'translate(' + retOffset*2  + ',' + retOffset*2 + ')');
	})
	.on('mouseout', function(d3Ignored) {
	 d3.select(this).transition()
	 //.attr('x', myOffset)
	 .attr('transform', 'translate(' + 0 + ',' + 0 + ')');
	})
	.on('click', (d) => {
	 if (d.children) {
	   d._children = d.children;
	   d.children = null;
	 } else {
	   d.children = d._children;
	   d._children = null;
	 }
	 this.updateTree(d);
	});

	let retNum = 4;
	for (let i = retNum; i >= 1 ; i--){
	  let myOffset = retOffset * i;
  	  retractedNodes.append('rect')
	  .attr('x', myOffset)
	  .attr('y', myOffset)
	  .attr('class', 'risk-unknown')
	  .classed('ret-rect-' + i, true)
	  .attr('width', 1e-6)
	  .attr('height', 1e-6)
	  .attr('style', 'fill-opacity:1;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none')
	}

	
	nodeEnter.append('rect')
	.attr('class', (d) => {
	  return d.riskClass;
	})
	.classed('comp', true)
	.attr('width', 1e-6)
	.attr('height', 1e-6)
	.attr('style', 'fill-opacity:1;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none');

	

	this.appendText(nodeEnter);

	nodeEnter.append('use')
	.classed('action', true)
	.classed('arrow-down', true)
	.style('display', 'none')
	.attr('xlink:href', '#ic_arrow_down')
	.attr('x', 161)
	.on('click', (d) => {
	  if (d.children) {
		d._children = d.children;
		d.children = null;
	  } else {
		d.children = d._children;
		d._children = null;
	  }
	  this.updateTree(d);
	});


	nodeEnter.append('use')
	.classed('action', true)
	.classed('arrow-up', true)
	.style('display', 'none')
	.attr('xlink:href', '#ic_arrow_up')
	.attr('x', 161)
	.on('click', (d) => {
	  if (d.children) {
		d._children = d.children;
		d.children = null;
	  } else {
		d.children = d._children;
		d._children = null;
	  }
	  this.updateTree(d);
	});
  }

  searchRetractedRisks(node) {
	node.hasUnknownRiskDesc = false;
	node.hasLowRiskDesc = false;
	node.hasMediumRiskDesc = false;
	node.hasHighRiskDesc = false;
	let children = node._children || node.children;

	if (children) {
	  children.forEach((child) => {
		this.searchRetractedRisks(child);
		if (child.riskClass == 'risk-unknown' || child.hasUnknownRiskDesc) {
		  node.hasUnknownRiskDesc = true;
		}
		if (child.riskClass == 'risk-low' || child.hasLowRiskDesc) {
		  node.hasLowRiskDesc = true;
		}
		if (child.riskClass == 'risk-medium' || child.hasMediumRiskDesc) {
		  node.hasMediumRiskDesc = true;
		}
		if (child.riskClass == 'risk-high' || child.hasHighRiskDesc) {
		  node.hasHighRiskDesc = true;
		} 


	  });
	}
  }

  onNodeUpdate(nodeUpdate) {
	nodeUpdate.selectAll('use.arrow-up')
	.delay(500)
	.style('display', function(d) {
	  return d.children ? 'initial' : 'none';
	});
	nodeUpdate.selectAll('use.arrow-down')
	.delay(500)
	.style('display', function(d) {
	  return d._children ? 'initial' : 'none';
	});

	//.attr('transform', function(d) {
	//  if (d._children) {
	//	return 'translate(161,0)rotate(180)';
	//  } else if (d._children) {
	//	return 'translate(161,0)rotate(0)';
	//  }
	//});
	//


		//.;

	nodeUpdate.selectAll('rect')
	.attr('width', 185)
	.attr('height', 135)
	nodeUpdate.selectAll('rect.comp')
	.each(function(d) {
	  d3.select(this).classed('risk-unknown', false);
	  d3.select(this).classed('risk-low', false);
	  d3.select(this).classed('risk-medium', false);
	  d3.select(this).classed('risk-high', false);
	  d3.select(this).classed(d.riskClass, true);
	});
	//.attr('class', (d) => {
	//  return d.riskClass;
	//});

	nodeUpdate.selectAll('use.activity')
	.style('fill-opacity', 1e-6);

	let contactedComponents = nodeUpdate.filter(function(d) {
	  return d.contacted;
	});
	contactedComponents.selectAll('use.activity-contacted')
	.delay(500)
	.duration(250)
	.style('fill-opacity', 1);

	let visitedComponents = nodeUpdate.filter(function(d) {
	  return d.visited;
	});
	visitedComponents.selectAll('use.activity-visited')
	.delay(500)
	.duration(250)
	.style('fill-opacity', 1);

	let negotiatingComponents = nodeUpdate.filter(function(d) {
	  return d.negotiating;
	});
	negotiatingComponents.selectAll('use.activity-negotiating')
	.delay(500)
	.duration(250)
	.style('fill-opacity', 1);
	

	

	let knownComponents = nodeUpdate.filter(function(d) {
	  return (d.name || d.firmName || d.siteLocation);
	});

	knownComponents.selectAll('text.known-text')
	.delay(500)
	.duration(250)
	.style('fill-opacity', 1);
	knownComponents.selectAll('text.unknown-text')
	.style('fill-opacity', 1e-6);
	let unknownComponents = nodeUpdate.filter(function(d) {
	  return !(d.name || d.firmName || d.siteLocation);
	});
	unknownComponents.selectAll('text.unknown-text')
	.delay(500)
	.duration(250)
	.style('fill-opacity', 1);
	knownComponents.selectAll('text.unknown-text')
	unknownComponents.selectAll('text.known-text')
	.style('fill-opacity', 1e-6);

  }

  onNodeExit(nodeExit) {
	nodeExit.selectAll('rect')
	.attr('width', 1e-6)
	.attr('height', 1e-6)
	.style('fill-opacity', 1e-6);
	nodeExit.selectAll('text')
	.duration(250)
	.style('fill-opacity', 1e-6);
	nodeExit.selectAll('use')
	.duration(250)
	.style('display', 'none');

  }

  appendText(nodes) {
	//let knownComponents = nodes.filter(function(d) {
	//  return (d.name || d.firmName || d.siteLocation);
	//});
	//
	nodes.append('use')
	.classed('activity', true)
	.classed('activity-contacted', true)
	.attr('xlink:href', '#icon-contacted')
	.style('fill-opacity', 1e-6)
	.attr('x', 40)
	.attr('y', 78);

	nodes.append('use')
	.classed('activity', true)
	.classed('activity-visited', true)
	.attr('xlink:href', '#icon-visited')
	.style('fill-opacity', 1e-6)
	.attr('x', 72)
	.attr('y', 78);

	nodes.append('use')
	.classed('activity', true)
	.classed('activity-negotiating', true)
	.attr('xlink:href', '#icon-negotiating')
	.style('fill-opacity', 1e-6)
	.attr('x', 105)
	.attr('y', 78);

	nodes.append('text')
	.classed('known-text', true)
	.classed('name', true)
	.attr('x', 5)
	.attr('y', 22)
	.text(function(d) { return d.name; })
	.style('fill-opacity', 1e-6);
	nodes.append('text')
	.classed('known-text', true)
	.classed('firmName', true)
	.attr('x', 5)
	.attr('y', 48)
	.text(function(d) { 
	  return d.firmName ? d.firmName: 'unknown'; 
	})
	.style('fill-opacity', 1e-6);
  	nodes.append('text')
	.classed('known-text', true)
	.classed('siteLocation', true)
	.attr('x', 5)
	.attr('y', 66)
	.text(function(d) { 
	  const locationName = CountryCodes.countryName(d.siteLocation);
	  return locationName ? locationName : 'unknown';
	})
	.style('fill-opacity', 1e-6);

	//let unknownComponents = nodes.filter(function(d) {
	//  return !(d.name || d.firmName || d.siteLocation);
	//});
	nodes.append('text')
	.classed('unknown-text', true)
	.attr('x', 85)
	.attr('y', 66)
	.text('...')
	.style('fill-opacity', 1e-6);

  }
}
