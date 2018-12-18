/**
 * User Categories list widget item
 * Used by widget.breeze.dataview.categories.list
 * @class Item
 * @namespace Breeze.widget.dataview.categories.Item
 * @extends Ext.dataview.ListItem
 * @alias widget.breeze.dataview.categories.item
 * @xtype breeze-categories-item
 */
Ext.define('Breeze.widget.dataview.SelectItem', {
    extend: 'Ext.dataview.ListItem',
    alias: 'widget.breeze.dataview.selectitem',
    xtype: 'breeze-select-item',

    config: {
        // CSS Class applied to legend label component
        // labelCls: '',
        // UI style(s) for checkboxes
        checkboxUi: '',

        /** Optional field listeners to attach to checkboxes and radio buttons */
        fieldListeners: {},
        // templates: {
        //     radioValue: '{record.Category_Name}',
        //     itemData: { color: '{record.HexColor}', nameText: '{record.Category_Name}'},
        //     itemTpl: '<div class="usercategories-widget-legend-item-label">' +
        //     '<div class="legend-item-dot" ' +
        //     'style="background-color:{color}">' +
        //     '</div>{nameText}</div>'
        // }
        templates: {
            radioValue: '',
            itemData: {},
            itemTpl: '',
            checkedBind: null
        }
    },

    fieldIds: {
        check: 'checkboxField',
        radio: 'radioField'
    },

    layout: 'hbox',

    initialize: function () {
        this.callParent();
        this.buildItems();
    },

    items: [],
    tpl: '',


    //===[Private Methods]===

    privates: {

        buildItems: function () {
            var items = [];
            switch (this.getParent().getFieldMode()) {
                case 'check':
                    var c = {
                        xtype: 'breeze-checkbox',
                        itemId: this.fieldIds.check,
                        ui: this.getCheckboxUi(),
                        padding: '1em',
                        listeners: this.getFieldListeners(),
                        style: 'pointer-events: none'
                    };
                    if(this.getTemplates()['checkedBind']){
                        c.bind = {checked: this.getTemplates().checkedBind};
                    }
                    items.push(c);
                    break;
                case 'radio':
                    items.push(
                        {
                            xtype: 'radio',
                            itemId: this.fieldIds.radio,
                            ui: 'reporting',
                            bind: {
                                value: this.getTemplates().radioValue
                            },
                            name: this.getParent().getId() + '-radio',
                            listeners: this.getFieldListeners()
                        }
                    );
                    break;
            }

            items.push(
                {
                    bind: {
                        data: this.getTemplates().itemData
                        // data: {
                        //     color: '{record.HexColor}',
                        //     nameText: '{record.Category_Name}'
                        // }
                    },
                    flex: 1,
                    itemId: 'label',
                    xtype: 'component',
                    // tpl: '<div class="legend-item-label ' + this.getLabelCls() + '">' +
                    tpl: this.getTemplates().itemTpl
                        // '<div class="usercategories-widget-legend-item-label">' +
                        // '<div class="legend-item-dot" ' +
                        // 'style="background-color:{color}">' +
                        // '</div>{nameText}</div>'
                }
            );
            this.setItems(items);
            this.setTpl('');
            // this.getComponent('label').setData({labelCls: this.getLabelCls()});
        }
    }


});