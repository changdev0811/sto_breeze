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
            src.el.up().component.query('[itemId="password"]')[0].setRequired(hasValue);
            src.el.up().component.query('[itemId="confirm_new_password"]')[0].setRequired(hasValue);
        }
        this.lookup('changePasswordButton').setDisabled(!this.passwordChangeReady());
    },

    /**
     * Async validation function for username
     * Uses AsyncValidation plugin
     * @param {Object} value 
     * @see Breeze.plugin.field.AsyncValidation
     */
    validateUserName: async function(value){
        return Breeze.api.employee.Information.checkUsername(value);
    },

    /**
     * Event handler for event fired by AsyncValidation plugin on username
     * when validation fails
     * @param {Object} cmp 
     * @param {String} err 
     */
    onUserNameAfterValidationFail: function(cmp, err){
        Ext.toast({
            type: 'warn',
            message: err,
            timeout: ['warn',4]
        });
    },

    /**
     * Update whether change password button is disabled based on results of passwordChangeReady method
     */
    checkChangeReady: function(){
        this.lookup('changePasswordButton').setDisabled(!this.passwordChangeReady());
    },

    onChangePasswordTap: function(ctrl, e, eOpts){
        var fieldset = this.lookup('securityChangePassword');
        var vm = this.getViewModel();
        var fields = {
            oldpass: fieldset.query('[itemId="old_password"]')[0],
            password: fieldset.query('[itemId="password"]')[0],
            passwordConfirm: fieldset.query('[itemId="confirm_new_password"]')[0]
        };
        var params = {
            username: vm.get('info.Username'),
            password: fields.password.getValue(),
            oldpass: fields.oldpass.getValue()
        };
        var api = Ext.create('Breeze.api.Auth');
        api.changeCredentials(
            vm.get('employeeId'),
            params.username,
            params.oldpass,
            params.password
        ).then(function(resp){
            if(resp.success){
                fields.oldpass.clearValue();
                fields.password.clearValue();
                fields.passwordConfirm.clearValue();
                vm.set('info.UserName', resp.username);
                Ext.toast({
                    message: 'Password successfully updated', 
                    timeout: 10000,
                    type: Ext.Toast.SUCCESS
                });
            } else {
                Ext.toast({
                    message: 'Error: ' + resp.err,
                    timeout: 10000,
                    type: Ext.Toast.ERROR
                });
            }
        }).catch(function(err){
            Ext.toast({
                message: 'Error: ' + err,
                timeout: 10000,
                type: Ext.Toast.ERROR
            });
        });
    },

    /**
     * Returns bool indicating if its ok to allow changing password
     * @return {bool} True if fields are filled in properly, false otherwise
     */
    passwordChangeReady: function(){
        var fieldset = this.lookup('securityChangePassword');
        var fields = {
            oldpass: fieldset.query('[itemId="old_password"]')[0],
            password: fieldset.query('[itemId="password"]')[0],
            passwordConfirm: fieldset.query('[itemId="confirm_new_password"]')[0]
        };
        return (
            fields.oldpass.getValue() !== null &&
            fields.oldpass.getValue().length > 0 &&
            fields.password.getValue() == fields.passwordConfirm.getValue() &&
            fields.password.getValue() !== null &&
            fields.password.getValue().length > 0
        );
    },

    onResetChangePasswordTap: function(){
        var fieldset = this.lookup('securityChangePassword');
        var fields = {
            oldpass: fieldset.query('[itemId="old_password"]')[0],
            password: fieldset.query('[itemId="password"]')[0],
            passwordConfirm: fieldset.query('[itemId="confirm_new_password"]')[0]
        };
        fields.oldpass.clearValue();
        fields.password.clearValue();
        fields.passwordConfirm.clearValue();
    }

});