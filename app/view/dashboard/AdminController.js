/**
 * Controller for Admin Dashboard
 *
 * @class AdminController
 * @namespace Breeze.view.dashboard.AdminController
 * @alias controller.view.dashboard.admin
 */
Ext.define('Breeze.view.dashboard.AdminController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard.admin',
    

    //requires: [
    //    'Breeze.api.Employee'
    //],
    
    onInit: function(component, eOpts){
        ////
        var me = this;
        this.lookup('leaverequestsrequiringactionDash').getHeader().el.on('click', function(e){
            me.onLeaveRequestsRequiringActionNavClick(e);
        });
        this.lookup('leaverequestsactiontaken').getHeader().el.on('click', function(e){
            me.onLeaveRequestsActionTakenNavClick(e);
        });
        this.lookup('employeeabsences').getHeader().el.on('click', function(e){
            me.onEmployeeAbsencesNavClick(e);
        });
        this.lookup('departmentAattendance').getHeader().el.on('click', function(e){
            me.onDepartmentAttendanceNavClick(e);
        });
    },

    /*== Navigation button handlers ==*/
    
    onLeaveRequestsRequiringActionNavClick: function(){
        //this.redirectTo('leaveRequests');
    },
    
    onLeaveRequestsActionTakenNavClick: function(){
        //this.redirectTo('leaveRequests');
    },

    onEmployeeAbsencesNavClick: function(){
        //this.redirectTo('absences');
    },
  
    onDepartmentAttendanceNavClick: function(){
        //this.redirectTo('admin/info');
    },


});