/**
 * WorkTime Records Record subview
 * @class Record
 * @alias Breeze.view.employee.workTime.Record
 */
Ext.define('Breeze.view.employee.workTime.Record', {
    extend: 'Ext.Container',
    alias: 'widget.employee.worktime.record',

    layout: 'vbox',

    items: [
        {
            reference: 'workTimeRecordGrid',
            xtype: 'grid',
            height: '100%', width: '100%',
            flex: 1,
            layout: 'hbox',
            itemConfig: {
                xtype: 'gridrow'
            },
            sortable: false,
            plugins: [
                { type: 'rowexpander' }
            ],
            bind: '{workTimeRecords}',
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    formatter: 'date("m/d/Y")',
                    dataIndex: 'Record_Date',
                    text: 'Date'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Time IN',
                    dataIndex: 'Start_Time'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Time OUT',
                    dataIndex: 'End_Time'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Hours',
                    dataIndex: 'Total_Time_Hours'

                },
                {
                    xtype: 'gridcolumn',
                    flex: 3,
                    text: 'Project',
                    dataIndex: 'Project'
                }
            ]
        },
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'checkbox',
                    label: 'Show Punches',
                    labelAlign: 'right',
                    inline: true,
                    labelWidth: 'auto'
                }
            ]
        }
    ]

});