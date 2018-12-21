/**
 * View Controller for Roles Admin view
 * @class ProjectsController
 * @namespace Breeze.view.admin.RolesController
 * @alias controller.admin.roles
 */
Ext.define('Breeze.view.admin.RolesController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.roles',

    requires: [
        'Breeze.api.admin.Roles'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {
        var vm = this.getViewModel(),
            me = this;

        this.api = Ext.create('Breeze.api.admin.Roles');
        this.loadRoles();
    },

    loadRoles: function(){
        this.addStoreToViewModel(
            'Breeze.store.company.SupervisorRoleList',
            'roles',
            { 
                load: true, 
                loadOpts: { 
                    callback: function(records, op, success){
                        if(success){
                            this.lookup('rolesList').getSelectable()
                                .setSelectedRecord(records[0]);
                        }
                    },
                    scope: me
                }
            }
        );
    },

  
    //===[Event Handlers]===

    /**
     * Called when record item is selected 
     */
    onRolesSelect: function(list, record){
        var me = this,
            vm = me.getViewModel(),
            roleId = record.get('data');
        
        vm.set('roleName', record.get('text'));

        this.lookup('rightsList').changeAllCheckboxes(false);

        me.addStoreToViewModel(
            'Breeze.store.company.SecurityRightsList',
            'rights',
            { 
                load: true, 
                createOpts: { roleId: roleId },
                loadOpts: {
                    callback: function(records, op, success){
                        if(success){

                        }
                    }
                }
            }
        );
    },

    onRoleAdd: function(){
        this.api.add().then((r)=>{
            Ext.toast({
                type: Ext.Toast.SUCCESS,
                message: 'Successfully added new Supervisor Role',
                timeout: 10000
            });
            this.onRefreshTool();
        }).catch((e)=>{
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 10000
            });
        })
    },

    onRoleRemove: function(){
        var me = this,
            vm = me.getViewModel(),
            rolesList = this.lookup('rolesList'),
            role = rolesList.getSelectable().getSelectedRecord();
        
        if(Object.isUnvalued(role)){
            // No role selected, exit
            // TODO: add warning saying role must be selected
            return false;
        }

        this.api.check(role.get('data')).then((r)=>{
            if(r.ok){
                // Ok to immediately remove
                me.api.delete(role.get('data'), role.get('text')).then((rs)=>{
                    Ext.toast({
                        type: rs.type,
                        message: rs.message,
                        timeout: 10000
                    });
                    me.onRefreshTool();
                }).catch((ers)=>{
                    Ext.toast({
                        type: ers.type,
                        message: ers.message,
                        timeout: 10000
                    });
                });
            } else {
                vm.set('replacementRoles', r.items);
                vm.set('replacementRole', r.items[0].role);
                // Needs replacement
                me.showReplaceDialog();
            }
        }).catch((err)=>{
            Ext.toast({
                type: err.type,
                message: err.message,
                timeout: 10000
            });
        })
        console.info('Remove');
    },

    showReplaceDialog: function(){
        var view = this.getView(),
            dialog = this.dialog;

        if(!dialog) {
            dialog = Ext.apply({
                ownerCmp: view
            }, view.dialog);
            this.dialog = dialog = Ext.create(dialog);
        }
        
        dialog.show();
    },

    onReplaceDialogCancel: function(){
        this.dialog.hide();
    },

    onReplaceDialogConfirm: function(){
        var me = this,
            vm = me.getViewModel(),
            role = this.lookup('rolesList').getSelectable().getSelectedRecord(),
            replacement = vm.get('replacementRole');
        
        this.dialog.hide();

         me.api.delete(
             role.get('data'), 
             role.get('text'),
             replacement
        ).then((rs)=>{
            Ext.toast({
                type: rs.type,
                message: rs.message,
                timeout: 10000
            });
            me.onRefreshTool();
        }).catch((ers)=>{
            Ext.toast({
                type: ers.type,
                message: ers.message,
                timeout: 10000
            });
        });
    },

    onSave: function(){
        var me = this,
            vm = me.getViewModel(),
            role = this.lookup('rolesList').getSelectable().getSelectedRecord(),
            rights = this.lookup('rightsList').getStore();
        
        var secRole = {
            Customer_Id: '',
            Role_Name: vm.get('roleName'),
            Role_Id: role.get('data')
        };

        rights.getData().items.forEach((r)=>{
            secRole[r.get('data')] = r.get('checked');
        });

        me.api.update(secRole).then((r)=>{
            Ext.toast({
                type: Ext.Toast.SUCCESS,
                message: 'Supervisor role successfully updated',
                timeout: 10000
            });
            this.loadRoles();
        }).catch((e)=>{
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 10000
            });
        });
    }
    
});