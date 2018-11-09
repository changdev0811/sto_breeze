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
        this.tryPerformingNodeAction(
            comp.getSelectable().getSelectedRecord()
        )
    },

    /**
     * Handle departments tree selection change, toggling
     * whether 'remove' button is enabled
     * @param {Object} comp Tree component sending event
     */
    onDepartmentsTreeSelect: function(comp){
        this.updateRemoveEmployeeButton(comp,'employeesDepartmentToolbar');
        this.tryPerformingNodeAction(
            comp.getSelectable().getSelectedRecord()
        )
    },

    /**
     * Handle 'New' employee button click event
     */
    onNewEmployeeButton: function(){
        this.redirectTo('employee/empinfo/new');
    },

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