/**
 * Custom button that has a 'collapse' property
 * For use with NavTree
 * @class 
 */
Ext.define('Breeze.widget.navBar.CollapseButton', {
    extend: 'Ext.Button',
    alias: 'widget.breeze.navbar.collapsebutton',
    
    
    config: {
        collapsed: false
    },

    iconCls: 'x-fa fa-angle-double-left',
    iconAlign: 'right',
    textAlign: 'right',

    onRender: function(){
        this.callParent(arguments);
    },

    updateCollapsed: function(v){
        if(v){
            this.setIconCls('x-fa fa-angle-double-right');
        } else {
            this.setIconCls('x-fa fa-angle-double-left');
        }
    }

})