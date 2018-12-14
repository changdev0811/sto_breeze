Ext.define('Breeze.widget.history.Bread', {
    extend: 'Ext.dataview.DataView',
    alias: 'widget.breeze.history.bread',
    xtype: 'breeze-history-bread',

    controller: 'breeze.history.bread',
    viewModel: { type: 'breeze.history.bread' },

    config: {
        maxLength: 5
    },

    constructor: function(){
        this.callParent(arguments)
    },

    userCls: 'breeze-history-bread',

    layout: 'hbox',
    itemTpl: [
        '<div class="crumb">',
        '<tpl if="{active}">',
        '<a href="{hash}">{label}</a>',
        '<tpl else>',
        '<div>{label}</div>',
        '</tpl>',
        '</div>'
    ],

    bind: {
        store: '{crumbs}'
    },

    //===[Manipulation Methods]===

    bakeCrumb: function(label, hash){
        var vm = this.getViewModel(),
            crumbs = vm.get('crumbs');
        
        if(crumbs.getCount() > this.getMaxLength()){
            crumbs.remove(crumbs.getAt(0));
        }
        if(crumbs.getCount() > 0) {
            var last = crumbs.getAt(crumbs.getCount()-1);
            last.set({active: false}, {commit: true});
        }
        crumbs.add({
            label: label,
            hash: hash,
            active: true
        });
        console.info('Updated');
        crumbs.commitChanges();
    }

});