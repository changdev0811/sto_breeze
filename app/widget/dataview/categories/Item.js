/**
 * User Categories list widget item
 * Used by widget.breeze.dataview.categories.list
 * @class Item
 * @namespace Breeze.widget.dataview.categories.Item
 * @extends Breeze.widget.dataview.SelectItem
 * @alias widget.breeze.dataview.categories.item
 * @xtype breeze-categories-item
 */
Ext.define('Breeze.widget.dataview.categories.Item', {
    // extend: 'Ext.dataview.ListItem',
    extend: 'Breeze.widget.dataview.SelectItem',
    alias: 'widget.breeze.dataview.categories.item',
    xtype: 'breeze-categories-item',

    config: {
        // CSS Class applied to legend label component
        // labelCls: '',
        // UI style(s) for checkboxes
        checkboxUi: '',
        /** Optional field listeners to attach to checkboxes and radio buttons */
        fieldListeners: {},
        // Specify template settings specific to this item
        templates: {
            radioValue: '{record.Category_Name}',
            itemData: { color: '{record.HexColor}', nameText: '{record.Category_Name}'},
            itemTpl: '<div class="usercategories-widget-legend-item-label">' +
            '<div class="legend-item-dot" ' +
            'style="background-color:{color}">' +
            '</div>{nameText}</div>'
        }
    }

});