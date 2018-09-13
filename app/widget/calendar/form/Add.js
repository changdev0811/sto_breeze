/**
 * An add form implementation for data used with {@link Ext.calendar.model.Event}.
 */
Ext.define('Breeze.widget.calendar.form.Add', {
    extend: 'Ext.calendar.form.Form',
    xtype: 'breeze-calendar-form-add',

    config:{
    	toolbarUi:null,
    },

    dropButton: null,

    /**
     * @cfg {String} title
     * The title for the dialog.
     * @locale
     */
    title: 'Add Event',


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
