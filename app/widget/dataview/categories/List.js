/**
 * User Categories multi-functional selection list widget
 * List with selection options for single (none, radio) and multiple (checkbox)
 * @class List
 * @namespace Breeze.widget.dataview.categories.List
 * @extends Breeze.widget.dataview.SelectList
 * @alias widget.breeze.dataview.categories.list
 * @xtype breeze-categories-list
 */
Ext.define('Breeze.widget.dataview.categories.List', {
    // extend: 'Ext.dataview.List',
    extend: 'Breeze.widget.dataview.SelectList',
    alias: 'widget.breeze.dataview.categories.list',
    xtype: 'breeze-categories-list',

    config: {
        /*  
            Select field mode:
            Can be 'check' for checkboxes, 'radio' for radio buttons,
            or anything else for none
        */
        fieldMode: 'radio',
        maximumSelectionCount: 1
    },

    fieldIds: {
        check: 'checkboxField',
        radio: 'radioField'
    },

    // Override default dataview item control
    itemConfig: {
        xtype: 'breeze.dataview.categories.item',
        viewModel: true,
        checkboxUi: 'reporting'
    }

});