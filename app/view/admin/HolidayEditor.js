/**
 * HolidayEditor Report form
 * @class HolidayEditor
 * @namespace Breeze.view.admin.HolidayEditor
 * @alias widget.admin.holidayeditor
 */
Ext.define('Breeze.view.admin.HolidayEditor', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.holidayeditor',

    // Layout and base styles
    layout: 'vbox',
    ui: 'wtr-panel',

    title: 'Holiday Editor',

    // Action buttons shown at bottom of panel
    //buttonAlign: 'right',
    //buttons: {
    //    pdf: { text: 'Save Accrual Policy', /* handler: 'onPrintPDF',*/ ui: 'action' },
    //    excel: { text: 'Save', /* handler: 'onPrintExcel',*/ ui: 'action' },
    //},

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items:[

                {


                    xtype: 'breeze-textfield',
                    flex:1,
                    label: 'Holidays for Year:',
                    name: 'reportTitle',
                    ui: 'admin admin-text',
                    userCls:'admin-fieldset-no-border',

                },
                {


                    xtype: 'button',
                    text: 'Save for Future Use',
                    ui: 'action',                   
                    userCls:'admin-fieldset-no-border',

                },
                {
                    xtype:'container',
                    flex:1
                }



            ]

        },


        {
            xtype:'panel',
            ui:'admin-sub',
            layout:'hbox',
            flex: 1,
            items:[
                {
                    
                    xtype: 'panel',
                    title: 'Holiday Schedule',
                    ui: 'admin-sub',
                    flex: 1,
                    layout: 'vbox',

                    
                    buttons: {
                        apply: { text: 'Apply Holiday Schedule', /*handler: 'onPrintPDF',*/ ui: 'action', userCls:'tool-button-left' },
                        add: { text: '+', /*handler: 'onPrintPDF',*/ ui: 'action', userCls:'tool-button-right' },
                    },

                    buttonAlign: 'left',
                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },

                    items:[
                        {

                            xtype: 'container',
                            userCls:'admin-fieldset',
                            flex: 1,
                            layout: 'vbox',
                        },

                    ]
                },
                {
                    
                    xtype: 'panel',
                    title: 'Holiday Details',
                    ui: 'admin-sub',
                    flex: 1,
                    layout: 'vbox',

                    buttons: {
                        add: { text: 'Save', /*handler: 'onPrintPDF',*/ ui: 'action' },
                    },


                    buttonToolbar: {
                        xtype: 'toolbar',
                        ui: 'admin-actions',
                        shadow: false
                    },



                    items:[
                        {

                            xtype: 'container',
                            userCls:'admin-fieldset',
                            flex: 1,
                            layout: 'vbox',
                        },

                    ]
                },


            ]

        }


        
    ]

});