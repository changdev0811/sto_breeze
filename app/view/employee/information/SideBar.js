Ext.define('Breeze.view.employee.information.SideBar', {
    extend: 'Ext.Container',
    alias: 'widget.employee.information.sidebar',
    requires: [
        'Ext.Img'
    ],
    layout: 'vbox',
    items: [
        {
            xtype: 'image',
            height: '128pt',
            bind: {
                src: '{profileImage}'
            },
            reference: 'infoProfilePicture',
            userCls: 'employee-info-profile-picture'
        },
        {
            xtype: 'button',
            iconCls: 'x-fas fa-file-alt',
            userCls:'employeeinfo-notes-button',        
            ui:'employeeinfo-notes-button', 
            //hidden:true, 
            listeners:{
                tap:'onNotesButtonTap'
            }
        },
        {
            xtype: 'button',
            // iconCls: 'x-fas fa-file-image',
            iconCls: 'x-fas fa-file-import',
            // iconCls: 'x-fas fa-file-upload',
            userCls:'employeeinfo-edit-profile-image-button',        
            ui:'employeeinfo-notes-button', 
            //hidden:true, 
            listeners:{
                tap:'onEditProfileImageTap'
            }
        },
        {
            xtype: 'dialog',
            ui:'light-themed-dialog',
            reference: 'notesDialog',
            title:{
                text:'Notes',
                ui:'light-themed-dialog'
            },
            tools: [
                {
                    iconCls: 'x-fa fa-times',
                    ui: 'light-themed-dialog',
                    handler: 'onCloseNotesDialog'
                }
            ],
            items:[
                {
                    xtype:'component',
                    scrollable:'y',
                    userCls:'employeeinfo-notes-text',        
                    bind:{
                        html:'{employeeNotes}',
                    }
                }

            ]
        },
        {
            xtype: 'dialog',
            width: '400pt', height: '400pt',
            ui: 'light-themed-dialog employeeinfo-dialog',
            reference: 'profileImageEditorDialog',
            title: {
                text: 'Update Profile Image',
                ui: 'light-themed-dialog'
            },
            buttons: [
                {
                    text: 'Remove Image',
                    ui: 'decline',
                    bind: {
                        disabled: '{!(info.Photo !== null)}'
                    },
                    handler: 'onRemoveProfileImage'
                },
                {
                    xtype: 'spacer'
                },
                {
                    text: 'Upload',
                    handler: 'onUploadProfileImage'
                },
                {
                    text: 'Cancel',
                    handler: function(cmp){
                        cmp.getParent().getParent().hide();
                    }
                }
            ],
            layout: 'fit',
            items: [
                {
                    xtype: 'formpanel',
                    layout: 'vbox',
                    reference: 'profileImageForm',
                    header: false,
                    defaults: {
                        ui: 'employeeinfo-dialog-field'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'extension'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'picture_modified'
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'Current Profile Image',
                            items: [
                                {
                                    xtype: 'image',
                                    height: 201,
                                    bind: {
                                        src: '{info.Photo}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            instructions: 'Select a file to upload as a replacement profile image',
                            title: 'Upload New',
                            items: [
                                {
                                    xtype: 'filefield',
                                    name: 'photo_upload',
                                    label: 'Field',
                                    ui: 'employeeinfo-dialog-field'
                                }
                            ]
                        }
                    ]
                }
            ]
            // items: [
            //     {
            //         xtype: 'fieldset',
            //         flex: 1,
            //         title: 'Current Image',
            //         items: [
            //             {
            //                 xtype: 'image',
            //                 itemId: 'profileImagePreview',
            //                 bind: {
            //                     src: '{info.Photo}'
            //                 }
            //             }
            //         ]
            //     },
            //     {
            //         xtype: 'fieldset',
            //         instructions: 'Select a file to upload as a replacment profile image',
            //         title: 'Choose File',
            //         items: [
            //             {
            //                 xtype: 'filefield',
            //                 label: 'Image File',
            //                 accept: 'image',
            //                 reference: 'profileImageFile'
            //             }
            //         ]
            //     },
                // {
                //     xtype: 'toolbar',
                //     docket: 'bottom',
                //     layout: {
                //         type: 'hbox',
                //         pack: 'end'
                //     },
                //     defaults: {
                //         xtype: 'button'
                //     },
                //     items: [
                //         {
                //             text: 'Update',
                //             ui: 'action',
                //             handler: 'onProfileImageUpdateTap'
                //         },
                //         {
                //             text: 'Cancel',
                //             ui: 'decline',
                //             handler: function(dlg,e,eOpts){
                //                 dlg.hide();
                //             }
                //         }
                //     ]
                // }

        }
    ],
});