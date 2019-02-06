/**
 * Employee Information Sidebar sub-view
 * @class SideBar
 * @namespace Breeze.view.employee.information.SideBar
 * @alias widget.employee.information.sidebar
 * @extends Ext.Container
 */
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
                src: '{profilePicture}'
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
            hidden:true, 
            listeners:{
                tap:'onEditProfilePictureTap'
            },
            bind: {
                hidden: '{!canUploadPicture}'
            }
        },
        {
            xtype: 'dialog',
            ui:'dark-themed-dialog',
            reference: 'notesDialog',
            minWidth: '300pt',
            minHeight: '300pt',
            layout: 'fit',
            title:{
                text:'Notes',
                ui:'dark-themed-dialog'
            },
            tools: [
                //{
                //    iconCls: 'x-fa fa-times',
                //    ui: 'dark-themed-dialog',
                //    handler: 'onCloseNotesDialog'
                //}
            ],
            items:[
                {
                    xtype:'component',
                    scrollable:'y',
                    flex: 1,
                    userCls:'employeeinfo-notes-text',        
                    bind:{
                        html:'{employeeNotes}',
                    }
                }

            ],
            buttons: [
                {
                    text: 'Cancel',
                    ui: 'decline alt',
                    handler: 'onCloseNotesDialog'
                }  
            ]
        },
        {
            xtype: 'dialog',
            ui:'dark-themed-dialog',
            reference: 'notesEditorDialog',
            minWidth: '300pt',
            minHeight: '300pt',
            layout: 'fit',
            title:{
                text:'Notes',
                ui:'dark-themed-dialog'
            },
            tools: [
                /*
                {
                    iconCls: 'x-fa fa-times',
                    ui: 'dark-themed-dialog',
                    handler: 'onCloseNotesDialog'
                }
                */
            ],
            items:[
                {
                    xtype: 'textareafield',
                    flex: 1,
                    border: true,
                    label: '',
                    bind: '{tempNotes}',
                    placeholder: "No notes are currently recorded."
                }
            ],
            buttons: [
                {
                    text: 'Clear',
                    ui: 'action alt',
                    handler: 'onClearNotesButton',
                    bind: {
                        disabled: '{!hasTempNotes}'
                    }
                },

                {
                    xtype: 'spacer',
                    //width: '8pt',
                    flex:1,
                },
                {
                    text: 'Submit',
                    ui: 'confirm alt',
                    handler: 'onSubmitNotesButton'
                },
                {
                    xtype: 'spacer',
                    width: '8pt'
                },
                {
                    text: 'Cancel',
                    ui: 'decline alt',
                    handler: 'onCloseNotesDialog'
                }

                
            ]
        },
        {
            xtype: 'dialog',
            width: '400pt', height: '400pt',
            ui: 'dark-themed-dialog employeeinfo-dialog',
            reference: 'profilePictureEditorDialog',
            title: {
                text: 'Update Profile Picture',
                ui: 'dark-themed-dialog'
            },
            buttons: [
                {
                    text: 'Remove Picture',
                    ui: 'action',
                    bind: {
                        disabled: '{photo == null}'
                    },
                    handler: 'onRemoveProfilePicture'
                },
                {
                    xtype: 'spacer'
                },
                {
                    text: 'Upload',
                    ui: 'confirm alt',
                    handler: 'onUploadProfilePicture',
                    bind: {
                        disabled: '{!pictureFileField.value}'
                    }
                },
                {
                    xtype: 'spacer',
                    width: '8pt'
                },
                {
                    text: 'Close',
                    ui: 'decline alt',
                    handler: 'onCancelProfilePictureEdit'
                }
            ],
            layout: 'vbox',
            items: [
                {
                    xtype: 'component',
                    html: 'Photo will not be applied until employee is saved',
                    style: 'text-align: center'
                },
                {
                    xtype: 'formpanel',
                    flex: 1,
                    layout: 'vbox',
                    reference: 'profilePictureForm',
                    header: false,
                    defaults: {
                        ui: 'employeeinfo-dialog-field'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'extension', itemId: 'extension'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'picture_modified', itemId: 'pictureModified'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'hashcookie', itemId: 'hashcookie'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'emp_id', itemId: 'empId'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'cust_id', itemId: 'custId'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'employee_id', itemId: 'employeeId'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'has_picture', itemId: 'hasPicture'
                        },
                        {
                            xtype: 'fieldset',
                            // itemId: 'imageFieldSet',
                            itemId: 'imagePreviewField',
                            flex: 1,
                            title: 'Current Profile Picture',
                            items: [
                                {
                                    xtype: 'image',
                                    height: 201,
                                    bind: {
                                        src: '{profilePicture}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'imageFieldSet',
                            instructions: 'Select a file to upload as a replacement profile image',
                            title: 'Upload New',
                            items: [
                                {
                                    xtype: 'filefield',
                                    name: 'photo_upload',
                                    accept: 'image/*',
                                    reference: 'pictureFileField',
                                    itemId: 'imageFile',
                                    label: 'Picture File',
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