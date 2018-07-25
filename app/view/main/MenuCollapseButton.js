Ext.define('Breeze.view.main.MenuCollapseButton', {
    extend: 'Ext.Button',
    alias: 'widget.main.menuCollapseButton',
    
    
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