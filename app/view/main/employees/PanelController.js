/**
 * View Controller for Employees Panel
 * @class PanelController
 * @namespace Breeze.view.main.employees.PanelController
 * @extends Breeze.controller.Base
 * @alias main.employees.panel
 */
Ext.define('Breeze.view.main.employees.PanelController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.main.employees.panel',
    requires: [
        'Breeze.store.employees.Departments',
        'Breeze.store.employees.Employees',
        'Ext.MessageBox'
    ],
    /**
     * Called when the view is created
     */
    onInit: function () {

        this.api = Ext.create('Breeze.api.Employees');

        // // Old tree api stores
        // this.addStoreToViewModel(
        //     'Breeze.store.tree.employee.Departments',
        //     'departmentsTree',
        //     { load: true }
        // );
        // this.addStoreToViewModel(
        //     'Breeze.store.tree.employee.Employees',
        //     'employeesTree',
        //     { load: true }
        // );

        var vm = this.getViewModel();
        // TODO: Consider relocating valid actions list out of style rules script
        vm.set(
            'viewActions', Breeze.helper.settings.StyleRules.actions
        );

        // New list api stores
        this.addStoreToViewModel(
            'Breeze.store.employees.Departments',
            'departmentsList',
            { load: true, createOpts: { storeId: 'employeesDepartments' } }
        );

        this.addStoreToViewModel(
            'Breeze.store.employees.Employees',
            'employeesList',
            { load: true, createOpts: { storeId: 'employeesEmployees' } }
        );

        this.refreshEmployeeCounts();

        console.info('Employee Panel initialized');
    },

    //===[Data Loading]===

    /**
     * Refresh count values in ViewModel using AJAX request
     */
    refreshEmployeeCounts: function(){
        var vm = this.getViewModel();

        this.api.employeeCounts().then((data)=>{
            var [active, terminated, deleted] = data,
                counts = {active, terminated, deleted};
            vm.set('counts', counts);
        }).catch((err)=>{
            console.warn('Employee Count API call failed ', err);
        });
       
    },

    //===[Event Handlers]===

    /**
     * Update search query parameter and reload employees
     * store
     * 
     * @param {Object} comp Search field component
     */
    doEmployeesSearch: function(comp){
        console.info('Employees search');
        this.refreshEmployeeCounts();
        var vm = this.getViewModel(),
            query = comp.getValue(),
            excludeTerminated = vm.get('excludeTerminated'),
            store = vm.get('employeesList');
        
        var proxy = store.getProxy();
        // Force proxy to update
        store.updateProxy(proxy);

        // Update params
        store.setSearchString((query == null)? "" : query);
        store.setExcludeTerminated(excludeTerminated);

        // Reload store with updated params
        store.load();
    },

    /**
     * Update search query parameter and reload departments
     * store
     * 
     * @param {Object} comp Search field component
     */
    doDepartmentsSearch: function(comp){
        this.refreshEmployeeCounts();
        var vm = this.getViewModel(),
            query = comp.getValue(),
            excludeTerminated = vm.get('excludeTerminated'),
            store = vm.get('departmentsList');
        
        // Force store proxy to update
        store.updateProxy(store.getProxy());

        // Update params
        store.setSearchString((query == null)? "" : query);
        store.setExcludeTerminated(excludeTerminated);

        // Reload store with updated params
        store.load();
    },

    /**
     * Handle change event for 'exclude terminated' checkbox
     * 
     * Causes departments and employees lists to perform search
     */
    onExcludeTerminatedChange: function(){
        // var tabs = this.lookup('employeesPanelTabs');
        
        // if(tabs.getActiveItem().getItemId() == 'employees'){
        this.doEmployeesSearch(this.lookup('employeesSearch'));
        // } else {
        this.doDepartmentsSearch(this.lookup('departmentsSearch'));
        // }
    },

    /**
     * Handle employees tree selection change, toggling
     * whether 'remove' button is enabled
     * @param {Object} comp Tree component sending event
     */
    onEmployeesTreeSelect: function(comp){
        this.updateRemoveEmployeeButton(comp,'employeesEmployeeToolbar');
        if(this.tryPerformingDefaultEmployeeAction(comp)){
            // tryPerformingDefaultEmployeeAction handles things
        } else {
            this.tryPerformingNodeAction(
                comp.getSelectable().getSelectedRecord()
            );
        }
    },

    /**
     * Handle departments tree selection change, toggling
     * whether 'remove' button is enabled
     * @param {Object} comp Tree component sending event
     */
    onDepartmentsTreeSelect: function(comp){
        this.updateRemoveEmployeeButton(comp,'employeesDepartmentToolbar');
        if(this.tryPerformingDefaultEmployeeAction(comp)){
            // tryPerformingDefaultEmployeeAction handles things
        } else {
            this.tryPerformingNodeAction(
                comp.getSelectable().getSelectedRecord()
            );
        }
    },

    /**
     * Handle 'New' employee button click event
     */
    onNewEmployeeButton: function(){
        this.redirectTo('employees/empinfo/new');
    },

    /**
     * Handle 'delete' employee button click event
     */
    onDeleteEmployeeButton: function(){
        var api = this.api,
            me = this,
            record = this.lookup('employeesPanelTabs').getActiveItem()
            .getComponent('tree').getSelectable().getSelectedRecord(),
            empId = record.get('data'),
            empName = record.get('text'),
            // Inner function used to perform actual deletion
            performDelete = function(){
                api.delete(empId).then(function(resp){
                    Ext.toast({
                        message: resp,
                        type: Ext.Toast.INFO,
                        timeout: 10000
                    });
                    me.onRefreshTool();
                }).catch(function(err){
                    Ext.toast({
                        message: err,
                        type: Ext.Toast.ERROR,
                        timeout: 10000
                    });
                });
            };
        if(!Object.isUnvalued(record)){
            api.canDelete(empId).then(function(resp){
                Ext.Msg.confirm(
                    'Confirm Delete',
                    `Are you sure you want to delete ${empName}`,
                    (button, val, opt) => {
                        if(button == 'yes'){
                            performDelete();
                        }
                    }
                )
            }).catch(function(err){
                // canDelete returned error or false
                Ext.toast({
                    message: err,
                    type: Ext.Toast.ERROR,
                    timeout: 10000
                });
            });
        }
    },

    /**
     * Try navigating to default employee subview on first
     * expanding click of employee name in tree
     * @param {Object} tree Tree component being operated on
     */
    tryPerformingDefaultEmployeeAction: function(tree){
        var defAction = this.getViewModel().get('defaultEmployeeAction'),
            performed = false,
            rec = tree.getSelectable().getSelectedRecord();
        
        if(rec.get('type') == 'Emp' && rec.isExpanded()){
            let actRec = rec.findChildBy((c)=>{return c.get('type') == defAction;});
            if(actRec){
                tree.getSelectable().deselectAll();
                tree.getSelectable().setSelectedRecord(actRec);
                performed = true;
            }
        }

        return performed;
    },

    /**
     * Try to navigate to selected employee action
     * @param {Object} nodeRecord 
     */
    tryPerformingNodeAction: function(nodeRecord){
        var vm = this.getViewModel(),
            data = nodeRecord.getData(),
            acts = vm.get('viewActions'),
            type = data.type.toLowerCase(),
            id = nodeRecord.parentNode.getData().data;
        if(acts.includes(type)){
            // vm.set('employeesView.args', type);
            // vm.set('employeesView.id', nodeRecord.parentNode.getData().data);
            // this.redirectTo(
            //     `e/${type}/${String.random()}`
            // );
            this.redirectTo(
                `employees/${type}/${id}`
            );
        }
    },

    /**
     * Enable/disable panel toolbar's remove employee button 
     * based on whether an employee is selected in the tree
     * @param {Object} tree Tree component to check
     * @param {String} toolbarName name of toolbar containing button
     *      to update
     */
    updateRemoveEmployeeButton: function(tree, toolbarName){
        var selected = (tree.getSelectionCount() > 0),
            isEmployee = (
                tree.getSelectable().getSelectedRecord().get('type') == 'Emp'
            );
        this.lookup(toolbarName)
            .getComponent('remove').setDisabled(!(
                selected && isEmployee
            )
        );
    },

    /**
     * Handle close tool click event
     */
    onCloseTool: function(){
        Ext.fireEvent('sidepanelclose',{});
    }
});