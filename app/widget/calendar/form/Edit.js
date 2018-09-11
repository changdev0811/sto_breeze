/**
 * An edit form implementation for data used with {@link Ext.calendar.model.Event}.
 */
Ext.define('Breeze.widget.calendar.form.Edit', {
    extend: 'Ext.calendar.form.Form',
    xtype: 'breeze-calendar-form-edit',

    config:{
    	toolbarUi:null,
    },


    /**
     * @cfg {String} title
     * The title for the dialog.
     * @locale
     */
    title: 'Edit Event',
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
