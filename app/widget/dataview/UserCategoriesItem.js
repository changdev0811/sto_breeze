Ext.define('Breeze.widget.dataview.UserCategoriesItem', {
    extend: 'Ext.dataview.ListItem',
    alias: 'widget.breeze.dataview.usercategoriesitem',
    xtype: 'breeze-dataview-usercategories-item',

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

    onCheckboxChange: function(c,e,eOpts){
        console.info('Checkbox changed');
    },

    privates: {
        buildItems: function(){
            var items = [];
            if (this.getParent().getCheckboxes()) {
                items.push(
                    {
                        xtype: 'breeze-checkbox',
                        itemId: 'checkboxField',
                        ui: this.getCheckboxUi(),
                        padding: '1em'
                    }
                );
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
            this.getComponent('checkboxField').on('change', this.onCheckboxChange);

            // this.getComponent('label').setData({labelCls: this.getLabelCls()});
        }
    }


});