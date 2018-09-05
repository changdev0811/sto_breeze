Ext.define('Breeze.view.employee.workTime.Location', {
    extends: 'Ext.Dialog',
    alias: 'widget.employee.worktime.location',

    requires: [
        'Ext.ux.google.Map'
    ],

    items: [
        {
            xtype: 'google-map',
            bind: {
                mapOptions: {
                    center: {
                        latitude: '{lat}',
                        longitude: '{long}'
                    }
                }
            }
        }
    ]

});