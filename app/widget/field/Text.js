/**
 * Custom override Texr Field with clearable on focus behavior
 * 
 * Clearable is false by default; gets toggled to true on focus, resert on blur
 *  
 * - Alias is `breeze.field.text`
 * - XType is `breeze-text`
 * 
 * @class Text
 * @alias Breeze.widget.field.Text
 * @see Ext.field.Text
 */
Ext.define('Breeze.widget.field.Text', {
    extend: 'Ext.field.Text',
    alias: 'widget.breeze.field.text',
    xtype: 'breeze-textfield',

    initialize: function(){
        var me = this;
        me.setClearable(false);
        me.callParent();
    },

    // Event Handler Overrides

    /**
     * Override widget's default focus enter handler, causing it
     * to set `clearable` to true after calling the parent implementation
     * @param {Object} event Event data object
     */
    onFocusEnter: function(event){
        var me = this;
        if(this.getEditable()){
            this.setClearable(true);
            this.syncEmptyState();
            me.callParent([event]);
        }
    },
    /**
     * Override widget's default focus leave handler, causing it
     * to set `clearable` to false after calling the parent implementation
     * @param {Object} event Event data object
     */
    onFocusLeave: function(event){
        var me = this;
        this.setClearable(false);
        me.callParent([event]);
    }

});
