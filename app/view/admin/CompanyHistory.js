/**
 * CompanyHistory Admin view
 * @class CompanyHistory
 * @namespace Breeze.view.admin.CompanyHistory
 * @alias widget.admin.companycistory
 */
Ext.define('Breeze.view.admin.CompanyHistory', {
    extend: 'Ext.Panel',
    alias: 'widget.admin.companyhistory',

    // Layout and base styles
    layout: 'vbox',
    ui: 'admin-base',

    title: 'Audit',



    // Adjust action button toolbar spacing and appearance with UI and shadow
    buttonToolbar: {
        xtype: 'toolbar',
        ui: 'admin-actions',
        shadow: false
    },

    // Body contents
    items: [
        {
           xtype: "searchfield",
           //flex: 2,
           ui: "alt",
           userCls:'admin-fieldset no-border',
           placeholder: "Search"
        },
        {
            xtype: 'container',
            userCls:'admin-fieldset',
            flex: 1,
            layout: 'vbox',
        },
    ]

});