/**
 * Overridden Email field only showing clear button on focus
 * 
 * - Alias is `breeze.field.email`
 * - XType is `breeze-email`
 * 
 * @class Email
 * @alias Breeze.widget.field.Email
 */
Ext.define('Breeze.widget.field.Email', {
    extend: 'Ext.field.Email',
    alias: 'widget.breeze.field.email',
    xtype: 'breeze-email',

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
        this.setClearable(true);
        this.syncEmptyState();
        me.callParent([event]);
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