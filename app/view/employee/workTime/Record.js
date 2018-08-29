/**
 * WorkTime Records Record subview
 * @class Record
 * @alias Breeze.view.employee.workTime.Record
 */
Ext.define('Breeze.view.employee.workTime.Record', {
    extend: 'Ext.Container',
    alias: 'widget.employee.worktime.record',

    layout: 'vbox',
    userCls: 'employee-worktime-records-grid',

    items: [
        {
            reference: 'workTimeRecordGrid',
            xtype: 'grid',
            ui: 'employee-worktime-records-grid',
            userCls: 'employee-worktime-records-grid',
            height: '100%', width: '100%',
            flex: 1,
            layout: 'hbox',
            itemConfig: {
                xtype: 'gridrow'
            },
            sortable: false,
            plugins: {
                // { type: 'rowexpander' }
                rowexpander: true
            },
            itemConfig: {
                body: {
                    userCls: 'wtr-grid-no-spacer',
                    tpl: [
                        '<div class="wtr-record-punch-body">',
                        '<div class="wtr-record-inpanel">',
                        '<div><span>IN Punch</span><br/><div class="wtr-icon in"></div></div>',
                        '<div style="padding-left: 4pt"><label>Date:</label> {In_Punch.processed_time}</br>',
                        '<label>Time:</label> {In_Punch.Punch_Time}</br>',
                        '</div></div>',
                        '<div class="wtr-record-outpanel">',
                        '<div><span>OUT Punch</span><br/><div class="wtr-icon out"></div></div>',
                        '<div style="padding-left: 4pt"><label>Date:</label> {In_Punch.processed_time}</br>',
                        '<label>Time:</label> {In_Punch.Punch_Time}</br>',
                        '</div></div>',
                        '</div>',
                        '</div>'
                    ]
                }
            },
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