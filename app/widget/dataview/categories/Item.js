/**
 * User Categories list widget item
 * Used by widget.breeze.dataview.categories.list
 * @class Item
 * @namespace Breeze.widget.dataview.categories.Item
 * @extends Ext.dataview.ListItem
 * @alias widget.breeze.dataview.categories.item
 * @xtype breeze-categories-item
 */
Ext.define('Breeze.widget.dataview.categories.Item', {
    extend: 'Ext.dataview.ListItem',
    alias: 'widget.breeze.dataview.categories.item',
    xtype: 'breeze-categories-item',

    config: {
        // CSS Class applied to legend label component
        // labelCls: '',
        // UI style(s) for checkboxes
        checkboxUi: ''
    },

    layout: 'hbox',

    initialize: function () {
        this.callParent();
        this.buildItems();
    },


    //===[Event Handlers]===

    /**
     * Handles change event for checkbox
     * @param {Object} c Component event originated from (checkbox) 
     * @param {Boolean} newVal New value
     * @param {Boolean} oldVal Old Value 
     */
    onCheckboxChange: function (c, newVal, oldVal) {
        // console.info('Checkbox changed');
        if (newVal) {
            c.getParent().getParent().getSelectable().select(c.getParent().getRecord(), true);
        } else {
            c.getParent().getParent().getSelectable().deselect(c.getParent().getRecord(), true);
        }
    },

    //===[Private Methods]===

    privates: {
        buildItems: function () {
            var items = [];
            switch (this.getParent().getFieldMode()) {
                case 'check':
                    items.push(
                        {
                            xtype: 'breeze-checkbox',
                            itemId: 'checkboxField',
                            ui: this.getCheckboxUi(),
                            padding: '1em',
                            listeners: {
                                change: this.onCheckboxChange
                            }
                        }
                    );
                    break;
                case 'radio':
                    items.push(
                        {
                            xtype: 'radio',
                            itemId: 'radioField',
                            ui: 'reporting',
                            bind: {
                                value: '{record.Category_Code}'
                            },
                            name: this.getParent().getId() + '-radio'
                        }
                    );
                    break;
            }

            items.push(
                {
                    bind: {
                        data: {
                            color: '{record.HexColor}',
                            nameText: '{record.Category_Name}'
                        }
                    },
                    flex: 1,
                    itemId: 'label',
                    xtype: 'component',
                    // tpl: '<div class="legend-item-label ' + this.getLabelCls() + '">' +
                    tpl: '<div class="usercategories-widget-legend-item-label">' +
                        '<div class="legend-item-dot" ' +
                        'style="background-color:{color}">' +
                        '</div>{nameText}</div>'
                }
            );

            this.setItems(items);
            // this.getComponent('label').setData({labelCls: this.getLabelCls()});
        }
    }


});