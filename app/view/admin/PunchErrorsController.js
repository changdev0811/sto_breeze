/**
 * View Controller for Punch Errors Admin view
 * @class PunchErrorsController
 * @namespace Breeze.view.admin.ProjectsController
 * @alias controller.admin.projects
 */
Ext.define('Breeze.view.admin.PunchErrorsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.puncherrors',

    requires: [
        'Breeze.api.admin.PunchErrors',
        'Breeze.mixin.CommonToolable'
    ],

    mixins: {
        commonToolable: 'Breeze.mixin.CommonToolable'
    },

    config: {
        injectTools: true
    },

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        this.api = Ext.create('Breeze.api.admin.PunchErrors');

    },

    onRemoveErrors: function(){
        console.info('remove error');

        var me = this,
            vm = this.getViewModel(),
            grid = this.lookup('errorGrid');
        
        var records = grid.getStore().query('checked', true).items;

        var batch = [];

        for(var i=0;i<records.length;i++){
            var rec = records[i];
            batch.push(me.api.removeError(rec.getData));
        }

        Promise.all(batch).then((r)=>{
            Ext.toast({
                type: Ext.Toast.INFO,
                message: 'Punch Errors removed successfully',
                timeout: 8000
            });
            this.onRefreshTool();
        }).catch((e)=>{
            Ext.toast({
                type: Ext.Toast.ERROR,
                message: 'Failed to remove one or more Punch Errors',
                timeout: 10000
            });
            this.onRefreshTool();
        });
    }

});