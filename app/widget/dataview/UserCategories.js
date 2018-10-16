Ext.define('Breeze.widget.dataview.UserCategories', {
    extend: 'Ext.dataview.List',
    alias: 'widget.breeze.dataview.usercategories',
    xtype: 'breeze-dataview-usercategories',

    config: {
        checkboxes: true,
        maximumSelectionCount: 1
    },

    // Override default dataview item control
    itemConfig: {
        xtype: 'breeze-dataview-usercategories-item',
        viewModel: true,
        labelCls: '',
        checkboxUi: 'reporting'
    },

    initialize: function () {
        var me = this;
        me.callParent();
        console.info('UDC Initialized');
    },

    onItemAdd: function (item, index) {
        this.callParent([item, index]);
    }


});