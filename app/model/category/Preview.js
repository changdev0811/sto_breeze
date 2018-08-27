/**
 * Category preview; from CategoryPreview
 * @class Preview
 * @namespace Breeze.model.category.Preview
 * @alias model.category.preview
 * @extends Breeze.model.Base
 */
Ext.define('Breeze.model.category.Preview', {
    alias: 'model.category.preview',
	extend: 'Ext.data.Model',
	fields: [
		{name: 'categoryId',			type: 'string'},
		{name: 'categoryColor',			type: 'string'},
		{name: 'categoryDescription',	type: 'string'},
		{name: 'currentCarriedOver',	type: 'string'},
		{name: 'currentAccrued',		type: 'string'},
		{name: 'currentAdjustments',	type: 'string'},
		{name: 'currentAllowed',		type: 'string'},
		{name: 'currentRecorded',		type: 'string'},
		{name: 'currentRemaining',		type: 'string'},
		{name: 'previewCarriedOver',	type: 'string'},
		{name: 'previewAccrued',		type: 'string'},
		{name: 'previewAdjustments',	type: 'string'},
		{name: 'previewAllowed',		type: 'string'},
		{name: 'previewRecorded',		type: 'string'},
		{name: 'previewRemaining',		type: 'string'}
	]
});