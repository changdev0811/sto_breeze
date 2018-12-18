/**
 * View Controller for Projects Admin view
 * @class ProjectsController
 * @namespace Breeze.view.admin.ProjectsController
 * @alias controller.admin.projects
 */
Ext.define('Breeze.view.admin.ProjectsController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.projects',

    requires: [
        'Breeze.api.admin.Projects'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {
        this.api = Ext.create('Breeze.api.admin.Projects');
        
        var me = this;
        
        this.addStoreToViewModel(
            'Breeze.store.tree.company.Projects',
            'projects',
            { load: true, loadOpts: {
                callback: function(records){
                    this.lookup('projectsTree').getSelectable().setSelectedRecord(records[0]);
                },
                scope: me
            } }
        );
        // this.loadProjects();
   
    },


    /**
     * 
     * Load project list into store, marking first or specific project
     * as selected after load completes
     * 
     * @param {String} selectSpecific Optional project ID to give focus to
     */
    // loadProjects: function(selectSpecific){
    //     var me = this,
    //         vm = this,
    //         selectId = Object.defVal(selectSpecific, null);

    //     this.addStoreToViewModel(
    //         'Breeze.store.tree.company.Projects',
    //         'projectsTree',
    //         { load: true, loadOpts: {
    //             callback: function(records, op, success){
    //                 if(success){
    //                     var record = records[0];
    //                     if(selectId !== null){
    //                         record = vm.get('projects').queryRecords('ID', selectId)[0];
    //                     }
    //                     this.lookup('projectsList').getSelectable()
    //                         .setSelectedRecord(record);
    //                 }
    //             },
    //             scope: me
    //         }}
    //     );
    // },

    // ===[Event Handlers]===

    /**
     * Handle updating project data display bindings when a project
     * is selected from the tree
     * @param {Object} tree 
     * @param {Array} record 
     */
    onProjectSelect: function(tree, record){
        var me = this,
            vm = me.getViewModel();
        
        if(record.length > 0){
            tree.getSelectable().select(
                record[0],false,true
            );
        }

        var noneSelected = (tree.getSelectable().getSelectedRecords().length == 0)
        var allProjects = 
            noneSelected ||
            (record[0].get('id') == 0);

        vm.set('allProjects', allProjects);
        if(!allProjects){
            var data = JSON.parse(record[0].get('data'));
            vm.set('projectData', Ext.clone(data));
            vm.set('projectID', data.ID);
        } else {
            vm.set('projectID', 0);
        }
        
    },

    onProjectDeselect: function(tree){
        var vm = this.getViewModel();

        if(tree.getSelectable().getSelectedRecords().length == 0){
            vm.set('allProjects', true);
            vm.set('projectID', 0);
        }
    },

    onProjectAdd: function(){
        var me = this,
            vm = this.getViewModel();

        this.api.add(vm.get('projectID')).then((r)=>{
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 10000
            });
            me.onRefreshTool();
        }).catch((e)=>{
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 10000
            });
        });
    },

    onProjectRemove: function(){
        var me = this,
            vm = this.getViewModel();
        
        this.api.delete(vm.get('projectID')).then((r)=>{
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 10000
            });
            vm.set('allProjects',true);
            vm.set('projectID',0);
            me.onRefreshTool();
        }).catch((e)=>{
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 10000
            });
        });
    },

    /**
     * Event handler for save button click
     */
    onSave: function(){
        var vm = this.getViewModel(),
            data = vm.get('projectData'),
            id = vm.get('projectID'),
            me = this;
        
        this.api.update(
            id, data.Name, data.Code,
            data.Description, data.isWorktime,
            data.isOT, data.Hourly_Comp
        ).then((res)=>{
            Ext.toast({
                type: res.type,
                message: res.message,
                timeout: 10000
            });
            vm.set('allProjects',true);
            vm.set('projectID',0);
            me.onRefreshTool();
        }).catch((er)=>{
            Ext.toast({
                type: er.type,
                message: er.message,
                timeout: 10000
            });
        });
    }    
});