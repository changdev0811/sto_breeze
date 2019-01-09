/**
 * Employee Year at a Glance View
 * @class Breeze.view.employee.YearAtAGlance
 */
Ext.define('Breeze.view.employee.YearAtAGlance',{
    extend: 'Ext.Panel',
    alias: 'widget.employee.yearataglance',

    viewModel:{
        data:{
            path:Ext.getResourcePath('ReleaseNotes.pdf'),
        }
    },


    config: {
        crumbTitle: 'Year at a Glance',
    },
    
    requires: [
        //'Breeze.view.employee.YAGController',
        //'Breeze.view.employee.YAGModel',
    ],

    /*
    viewModel: {
        type: 'employee.yag'
    },
    controller: 'employee.yag',
    */

    listeners: {
        //initialize: 'onInit'
    },

    //==[Start of Panel Setup/Styling]====
    tools: [
        {
            iconCls: 'x-fa fa-sync',
            handler: 'onRefreshTool'  
        },
        {
            iconCls: 'x-fa fa-print',
            handler: 'onPrintTool'
        }
    ],

    // Layout and base styles
    layout: 'fit',
    ui: 'admin-base',

    title: 'Year at a Glance',

    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        {               
            xtype: 'panel',
            userCls: 'admin-fieldset',
            scroll: 'both',
            items: [
                {
                    id: 'iframe',
                    scroll: "vertical",
                    layout: 'fit',
                    width: '100%',
                    height: '100%',
                    bind:{
                        html: '<iframe style="position:absolute; width:100%; height:100%; left:0; top:0;"  src="{path}"></iframe>'
                    }
                }
            ]
        },
    ]

});