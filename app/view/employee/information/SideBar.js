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
            },
            //bind:{
            //    hidden:'{hideNotesButton}',
            //}

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
                
            

        }

    ]
});