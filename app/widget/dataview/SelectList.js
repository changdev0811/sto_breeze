/**
 * Multi-functional selection list widget
 * List with selection options for single (none, radio) and multiple (checkbox)
 * @class SelectList
 * @namespace Breeze.widget.dataview.SelectList
 * @extends Ext.dataview.List
 * @alias widget.breeze.dataview.selectlist
 * @xtype breeze-select-list
 */
Ext.define('Breeze.widget.dataview.SelectList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.breeze.dataview.selectlist',
    xtype: 'breeze-select-list',

    config: {
        /*  
            Select field mode:
            Can be 'check' for checkboxes, 'radio' for radio buttons,
            or anything else for none
        */
        fieldMode: 'radio',
        maximumSelectionCount: 1,
        selectMode: 'multi',
        // Template for display
        template: null, // {radioValue, itemData, tpl},
        preventDeselect: false,
        groupHeader: null,
        groupFooter: null,
        pinHeaders: false,
        pinFooters: false,
        pinnedHeader: null,
        pinnedFooter: null
    },

    fieldIds: {
        check: 'checkboxField',
        radio: 'radioField'
    },

    // Override default dataview item control
    itemConfig: {
        xtype: 'breeze.dataview.selectitem',
        viewModel: true,
        checkboxUi: 'reporting'
    },

    initialize: function () {
        var me = this;
        me.callParent();
        this.getSelectable().setMode(this.getSelectMode());
        
        if(this.getPreventDeselect()){
            this.getSelectable().setDeselectable(false);
        }
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

    /**
     * Get array of records for all items currently selected.
     * Alias to getSelectable().getSelectedRecords()
     */
    gatherSelected: function () {
        return this.getSelectable().getSelectedRecords();
    },


    //===[Event Handlers]===

    /**
     * Handles event fired when an item is selected, syncing connected field's
     * value and selection state
     * @param {Array|Object} records One or more records indicating selected
     *  item
     */
    onItemSelect: function (records, suppressEvent) {
        // console.info('item select', arguments);
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
        // var me = this;

        // if (suppressEvent) {
        //     me.setItemSelection(record, true);
        // } else {
        //     me.fireEventedAction('select', [me, record], 'setItemSelection',
        //         me, [record, true]);
        // }
    },

    /**
     * Handles event fired when an item is deselected, syncing connected field's
     * value and selection state
     * @param {Array|Object} records One or more records indicating deselected
     *  item
     */
    onItemDeselect: function (records) {
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
            // default:
            //     if(this.getPreventDeselect()){
            //         // this.callParent(arguments);
            //         // if(this.getSelectable().getSelectedRecords().)
            //         this.getSelectable().select(
            //             records[0], false, true
            //         );
            //         return false;
            //     }
            //     break;
        }
        // Spoof deselect event if a listener exists
        if(
            this.events.deselect
        ){
            this.events.deselect.fire(this,records);
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
        },
        changeHeaderFooter: function (item, recordIndex, def, enabled) {
        },
        changeItemGrouping: function (options) {
        },
    }


});