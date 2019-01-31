Ext.define('Breeze.view.requests.RequestDayForm', {
    extend: 'Ext.calendar.form.Add',
    alias: 'widget.requests.form.add',
    title: {
        ui: 'dark-themed-dialog',
        text: 'Request Day'
    },

    config: {
        titleField: {
            hidden: true
        },
        startTimeField: {
            hidden: true
        },
        endTimeField: {
            hidden: true
        },
        descriptionField: {
            hidden: true
        },
        /**
         * Set overriding toolbar ui
         */
    	toolbarUi:null,
    },

    initialize: function() {
        var me = this;

        me.initForm();
        me.add({
            xtype: 'toolbar',
            docked: 'bottom',
            ui: me.getToolbarUi(),
            items: me.generateButtons()
        });
        //me.callParent();
        me.applyValues();
        me.checkFields();
    },
});