/**
 * Shorthand common event handler for dialog cancel buttons with ability
 * to trigger secondary controller handler logic
 * @class DialogCancelable
 * @namespace Breeze.mixin.DialogCancelable
 */
Ext.define('Breeze.mixin.DialogCancelable', {
    mixinId: 'dialogCancelable',

    /**
     * Basic handler for dialog 'cancel' buttons
     * 
     * Button component can define data 'cancelableAction' which
     * provides a controller function to call after hiding dialog
     * 
     * cancelableAction function recieves one param-- the dialog object
     * 
     * @param {Ext.Button} button Button that fired event
     */
    onDialogCancel: function (button) {
        var dlg = button.getParent().getParent();
        // hide dialog
        dlg.hide();
        // fire extra logic, if set
        if(button.getData()){
            var action = button.getData()['cancelableAction'],
                viewController = this.getView().getController();
            if(action && viewController[action]) {
                viewController[action](dlg);
            }
        }
    }
});