'use strict';
require('./picker-dialog.css');
var Eventor = require('eventor');
var SimulateClick = require('./simulate-click.js');
var PickerDialog = function(option){
	this.outsideClickabled = true;
	if( isObject(option) ){
		this.outsideClickabled = option.outsideClickabled === false ? false: true;
	}
	

	
	if( !!document.querySelectorAll('.picker-mask').length<=0 ){
		var divMask = document.createElement('a');
		divMask.className = 'picker-mask';
		divMask.href = 'javascript:void(0);';
		document.body.appendChild(divMask);
	}
	var div = document.createElement('div');
	div.className = 'picker-dialog';
	document.body.appendChild(div);
	this.mask = document.querySelectorAll(".picker-mask");
	this.mask = this.mask[ this.mask.length-1 ];
	this.wrap = document.querySelectorAll(".picker-dialog");
	this.wrap = this.wrap[ this.wrap.length-1 ];
	this._bindEvents();
	return this;
}
Eventor.mixTo(PickerDialog);
SimulateClick(PickerDialog);
PickerDialog.prototype._bindEvents = function(){
	var _this = this;
	function triggerClick(e){
		log("a mask click");
		_this.hide();
		_this.emit('close');
	}
	log("listener");
	this.setClick(this.mask, triggerClick);
	return this;
}
PickerDialog.prototype.show = function(){
	var _this = this;
	log('show');
	_this.mask.classList.add("show");
	_this.wrap.classList.add("modal-in");
	return this;
}
PickerDialog.prototype.hide = function(){
	var _this = this;
	log('hide');
	_this.mask.classList.remove("show");
	_this.wrap.classList.remove("modal-in");
	return this;
}
function isObject(object) {
	return Object.prototype.toString.call(object) === '[object Object]'
}
module.exports =  PickerDialog;