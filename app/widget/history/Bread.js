/**
 * Historical Breadcrumbs widget
 * @class Bread
 * @namespace Breeze.widget.history.Bread
 * @extends Ext.dataview.DataView
 * @alias breeze.history.bread
 * @xtype breeze-history-bread
 */
Ext.define('Breeze.widget.history.Bread', {
    extend: 'Ext.dataview.DataView',
    alias: 'widget.breeze.history.bread',
    xtype: 'breeze-history-bread',

    viewModel: { type: 'breeze.history.bread' },

    config: {
        // Max number of items shown and remembered
        maxLength: 4
    },

    constructor: function(){
        this.callParent(arguments)
    },

    userCls: 'breeze-history-bread',

    layout: {
        type: 'hbox',
        align: 'end'
    },

    itemTpl: [
        '<div class="crumb">',
        '<tpl if="!active">',
        '<div><a href="{hash}">{label}</a></div>',
        '<tpl else>',
        '<span>{label}</span>',
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
        
        if(crumbs.getCount() > this.getMaxLength()-1){
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