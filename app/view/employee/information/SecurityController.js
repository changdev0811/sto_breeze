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
        this.lookup('changePasswordButton').setDisabled(!this.passwordChangeReady());
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
            oldpass: fieldset.down('[name="old_password"]'),
            password: fieldset.down('[name="password"]'),
            passwordConfirm: fieldset.down('[name="confirm_new_password"]')
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
            oldpass: fieldset.down('[name="old_password"]'),
            password: fieldset.down('[name="password"]'),
            passwordConfirm: fieldset.down('[name="confirm_new_password"]')
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
            oldpass: fieldset.down('[name="old_password"]'),
            password: fieldset.down('[name="password"]'),
            passwordConfirm: fieldset.down('[name="confirm_new_password"]')
        };
        fields.oldpass.clearValue();
        fields.password.clearValue();
        fields.passwordConfirm.clearValue();
    }

});