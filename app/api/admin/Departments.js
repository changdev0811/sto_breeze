/**
 * Admin Departments API calls
 * Extends Breeze.api.Base.
 * @class Departments
 * @namespace Breeze.api.admin.Departments
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.admin.Departments', {
    extend: 'Breeze.api.Base',


    /**
     * Create department
     * TODO: implement create
     * @return {Promise} Promise resolving with success message or
     *      rejecting with error
     * @api /createDept
     */
    create: function(){

    },

    /**
     * Check if able to delete department
     * TODO: Implement canDelete
     * @param {String} departmentId ID of department to remove
     * @return {Promise} Promise resolving with success message or
     *      rejecting with error
     * @api /canDeleteDept
     */
    canRemove: function(){

    },

    /**
     * Remove department
     * @todo TODO: Implement removeDept
     * @param {String} departmentId ID of department to remove
     * @return {Promise} Promise resolving with success message or
     *      rejecting with error
     * @api /removeDept
     */
    remove: function(departmentId){

    }



});
