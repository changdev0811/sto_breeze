/**
 * View Controller specifically for logic in the Employee Info sidebar sub-view
 * (for view Breeze.view.employee.information.SideBar)
 * @class SideBarController
 * @namespace Breeze.view.employee.information.SideBarController
 * @alias controller.employee.information.sidebar
 * @extends Breeze.controller.Base
 */
Ext.define('Breeze.view.employee.information.SideBarController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.employee.information.sidebar',
    /**
     * Called when the view is created
     */
    onInit: function () {
        console.info('Employee info sidebar controller initialized.');
    },


    onNotesButtonTap: function(ref, x, eOpts){
        console.info("[onNotesButtonTap]");
        //notesDialog
        var view = this.getView(),
            dialog = this.lookup('notesDialog');
        if (!dialog) {
            dialog = Ext.apply({ ownerCmp: view }, view.dialog);
            dialog = Ext.create(dialog);
        }
        dialog.show();
    },

    onCloseNotesDialog: function(dialog, e, eOpts){
        dialog.hide();
    },

    onEditProfileImageTap: function(ref, e, eOpts){
        var view = this.getView(),
            dialog = this.lookup('profileImageEditorDialog');
        if(!dialog){
            dialog = Ext.apply({ ownerCmp: view }, view.dialog);
            dialog = Ext.create(dialog);
        }
        dialog.show();
    },

    /**
     * Handle profile image edit dialog's 'remove' button
     */
    onRemoveProfileImage: function(ref,e,eOpts){
        console.info('Remove profile image');
    },

    /**
     * Handle profile image edit dialog's 'upload' button
     */
    onUploadProfileImage: function(ref,e,eOpts){
        console.info('Upload profile image');
        this.apiClass.information.uploadPicture(
            this.lookup('profileImageForm')
        ).then((result) => {

        }).catch((err) => {
            Ext.toast({
                message: err.message,
                type: err.type,
                timeout: 10000
            });
        });
    },
    
    /**
     * Handle profile image edit dialog's 'cancel' button
     */
    onCancelProfileImageEdit: function(ref, e, eOpts){
        this.lookup('pictureFileField').reset();
        ref.getParent().getParent().hide();
        // this.lookup('profileImageForm').reset();
    }

});