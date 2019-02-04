/**
 * Punch Clock Punch Window
 * Gets instantiated and controlled by NavController
 */
Ext.define('Breeze.view.main.Punch', {
    extend: 'Ext.Dialog',
    alias: 'widget.main.punch',

    // Defining model inline since this is a one-off
    viewModel: {
        formulas: {
            punchButtonText: {
                bind: '{punch.currentData.punch_status}',
                get: function(data){
                    return (data == 0)? 'Punch In' : 'Punch Out';
                }
            },
        }
    },
    xtype: 'dialog',
    ui: 'dark-themed-dialog employeeinfo-dialog',
    reference: 'punchWindowDialog',
    minWidth: '300pt',
    minHeight: '300pt',
    layout: 'vbox',
    title: {
        text: 'Punch',
        ui: 'dark-themed-dialog'
    },
    bind: {
        title: { text: '{header.fullname}' },
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'image',
                    height: '48pt',
                    width: '48pt',
                    src: 'resources/photos/default_user.png',
                    //bind: {
                    //    src: '{profilePicture}'
                    //},
                    reference: 'infoProfilePicture',
                    userCls: 'punch-window-profile-picture',

                },
                {
                    xtype: 'component',
                    bind: {
                        data: '{punch.currentData}'
                    },
                    flex: 1, style: 'margin: auto 0pt auto 5pt',
                    tpl: [
                        '<tpl switch="punch_status">',
                        '<tpl case="0">',
                            'You are currently Out<br>',
                            '<tpl if="punch_lastActivity">',
                                'Last punched out on {[this.dateString(values.punch_lastActivity)]}',
                            '<tpl else>',
                                'No time recorded for punch out',
                            '</tpl>',
                        '<tpl default>',
                            'You are currently In<br>',
                            '<tpl if="punch_lastActivity">',
                                'Last punched in on {[this.dateString(values.punch_lastActivity)]}',
                            '<tpl else>',
                                'No time recorded for punch in',
                            '</tpl>',
                        '</tpl>',
                        {
                            dateString: function(v){
                                return Ext.Date.format(new Date(v), 'Y-m-d g:i A');
                            }
                        }
                    ]
                },
                // {
                //     xtype: 'component',
                //     flex: 1,
                //     style: 'margin:auto 0pt auto 5pt;',
                //     html: 'You are currently {inout}<br>{lastPunch}'
                // },
            ]
        },
        // This gets filled with current time that ticks using runner
        {
            xtype: 'component',
            itemId: 'currentTime',
            userCls: 'punchWindowClock',
        },
        {
            xtype: 'selectfield',
            label: 'Project',
            labelAlign: 'left',
            labelWidth: 'auto',
            displayField: 'Name', valueField: 'ID',
            itemId: 'project',
            placeholder: '*No Project*',
            bind: {
                store: '{flatProjects}',
                value: '{punch.currentData.employee_default_project}',
                hidden: '{punch.currentData.punch_status !== 0}'
            }
        },
        {
            xtype: 'textareafield',
            flex: 1,
            border: true,
            itemId: 'notes',
            label: 'Note',
            //bind: '{tempNotes}',
            placeholder: ""
        }
    ],
    buttons: [
        {
            xtype: 'spacer',
            //width: '8pt',
            flex: 1,
        },
        {
            bind: {
                text: '{punchButtonText}'
            },
            ui: 'confirm alt',
            handler: 'onSubmitPunchWindowDialog'
            //handler: 'onSubmitNotesButton' // Bind: Punch In / Punch Out
        },
        {
            xtype: 'spacer',
            width: '8pt'
        },
        {
            text: 'Cancel',
            ui: 'decline alt',
            handler: 'onClosePunchWindowDialog'
        }
    ]
});