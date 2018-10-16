/**
 * User Categories multi-functional selection list widget
 * List with selection options for single (none, radio) and multiple (checkbox)
 * @class List
 * @namespace Breeze.widget.dataview.categories.List
 * @extends Ext.dataview.List
 * @alias widget.breeze.dataview.categories.list
 * @xtype breeze-categories-list
 */
Ext.define('Breeze.widget.dataview.categories.List', {
    extend: 'Ext.dataview.List',
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
    },

    initialize: function () {
        var me = this;
        me.callParent();
        // me.hookSelectEvent();
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
                item.getComponent(me.fieldIds.check).setChecked(value);
                // Force update of selection state for all items
                if (value) {
                    me.getSelectable().selectAll(true);
                } else {
                    me.getSelectable().deselectAll(true);
                }
            });
        }
    },

    gatherSelected: function () {
        var selectedRecords = [];

    },


    //===[Event Handlers]===
    onItemAdd: function (item, index) {
        this.callParent([item, index]);
    },

    /**
     * Handles event fired when an item is selected, syncing connected field's
     * value and selection state
     * @param {Array|Object} records One or more records indicating selected
     *  item
     */
    onItemSelect: function (records) {
        // console.info('item select');
        var record = (Array.isArray(records)) ? records[0] : records,
            item = this.getItem(record);
        switch (this.getFieldMode()) {
            case 'check':
                var field = item.getComponent(this.fieldIds.check);
                if (!field.getChecked()) {
                    field.setChecked(true);
                }
                break;
            case 'radio':
                var field = item.getComponent(this.fieldIds.radio);
                if (!field.getChecked()) {
                    field.setChecked(true);
                }
                break;
        }

        this.callParent(arguments);
    },

    /**
     * Handles event fired when an item is deselected, syncing connected field's
     * value and selection state
     * @param {Array|Object} records One or more records indicating deselected
     *  item
     */
    onItemDeselect: function (records) {
        // console.info('deselect');
        var record = (Array.isArray(records)) ? records[0] : records,
            item = this.getItem(record);
        switch (this.getFieldMode()) {
            case 'check':
                var field = item.getComponent(this.fieldIds.check);
                if (field.getChecked()) {
                    field.setChecked(false);
                }
                break;
            case 'radio':
                var field = item.getComponent(this.fieldIds.radio);
                if (field.getChecked()) {
                    field.setChecked(false);
                }
                break;
        }

        this.callParent(arguments);
    },

    privates: {
        hookSelectEvent: function () {
            var me = this,
                selectable = me.getSelectable();
            selectable.on('selectionchange', me.onItemSelect);
        },
        /**
         * Update selection mode based of fieldMode property
         */
        updateFieldMode: function (value) {
            if (value == 'check') {
                // Allow multiple selections when using checks
                this.getSelectable().setMode('multi');
            }
        }
    }


});