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
            listeners:{
                tap:'onNotesButtonTap'
            },
            bind:{
                hidden:'',
            }

        }
    ]
});