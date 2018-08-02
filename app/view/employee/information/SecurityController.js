/**
 * Controller for Security subview of Employee Information
 *
 * @class SecurityController
 * @alias Breeze.view.employee.information.SecurityController
 */
Ext.define('Breeze.view.employee.information.SecurityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employee.information.security',
    
    /**
     * Update whether new password and confirm fields are
     * required when the value of current password field
     * changes
     * @param {Object} src Source objec
     * @param {Object} newVal New value
     * @param {Object} oldVal Old value
     * @param {Object} eOpts Options
     */
    updatePasswordRequirement: function(src, newVal, oldVal, eOpts){
        if(newVal !== oldVal){
            var hasValue = (newVal !== '');
            src.el.up().down('[name="password"]').component.setRequired(hasValue);
            src.el.up().down('[name="confirm_new_password"]').component.setRequired(hasValue);
        }
    }

});