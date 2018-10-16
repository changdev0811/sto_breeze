Ext.define('Breeze.widget.dataview.UserCategories', {
    extend: 'Ext.dataview.List',
    alias: 'widget.breeze.dataview.usercategories',
    xtype: 'breeze-dataview-usercategories',

    config: {
        /*  
            Select field mode:
            Can be 'check' for checkboxes, 'radio' for radio buttons,
            or anything else for none
        */
        fieldMode: 'radio',
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
        // me.applyFieldMode();
        console.info('UDC Initialized');
    },

    //===[Public tool methods]===
    
    /**
     * Change all item checkbox values at once (If item checkboxes are enabled)
     * @param {Boolean} value If true, checkboxes get checked. Otherwise they
     *      are de-checked
     */
    changeAllCheckboxes: function (value) {
        var me = this;
        if (this.getFieldMode() == 'check') {
            me.getItems().items.forEach((item, idx) => {
                item.getComponent('checkboxField').setChecked(value);
                // Force update of selection state for all items
                if(value){
                    me.getSelectable().selectAll(true);
                } else {
                    me.getSelectable().deselectAll(true);
                }
            });
        }
    },


    //===[Event Handlers]===
    onItemAdd: function (item, index) {
        this.callParent([item, index]);
    },

    privates: {
        /**
         * Update selection mode based of fieldMode property
         */
        updateFieldMode: function(value){
            if(value == 'check'){
                // Allow multiple selections when using checks
                this.getSelectable().setMode('multi');
            }
        }
    }


});