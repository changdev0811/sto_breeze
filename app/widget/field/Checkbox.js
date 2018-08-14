/**
 * Custom Checkbox override
 * @class Checkbox
 * @alias Breeze.widget.field.Checkbox
 */
Ext.define('Breeze.widget.field.Checkbox', {
    extend: 'Ext.field.Checkbox',
    requires: [],
    xtype: [
        'breeze-checkbox',
        'breeze-checkboxfield'
    ],

    updateDisabled: function(disabled, oldDisabled){
        this.callParent([disabled, oldDisabled]);
        var readOnly = this.getReadOnly();
        this.inputElement.dom.disabled = !!(disabled || readOnly);
    },
    updateReadOnly: function(readOnly){
        this.setInputAttribute('readonly', readOnly? true : null);
        this.inputElement.dom.disabled = !!(this.getDisabled() || readOnly);
    }

});
