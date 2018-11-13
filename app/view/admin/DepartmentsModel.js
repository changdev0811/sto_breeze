/**
 * View Model class for Departments Admin view
 * @class DepartmentsModel
 * @namespace Breeze.view.admin.DepartmentsModel
 * @alias viewmodel.admin.departments
 */
Ext.define('Breeze.view.admin.DepartmentsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.departments',

    data: {
        conflictLimit: 0,
        // ID of selected department
        selectedDepartmentId: null
    },

    formulas: {
        /**
         * Get selected department by finding record with id matching
         * selectedDepartmentId
         * @param {Function} get 
         */
        selectedDepartment: function(get){
            var dept = get('departmentList').findRecord('Id', get('selectedDepartmentId'));
            return dept;
        }
    }

});