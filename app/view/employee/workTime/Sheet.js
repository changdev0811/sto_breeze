/**
 * WorkTime Records Time Sheet subview
 * @class Sheet
 * @namespace Breeze.view.employee.workTime.Sheet
 * @alias widget.employee.worktime.sheet
 */
Ext.define('Breeze.view.employee.workTime.Sheet', {
    extend: 'Ext.Container',
    alias: 'widget.employee.worktime.sheet',

    layout: 'vbox',
    userCls: 'employee-worktime-records-grid',

    items: [
        {
            reference: 'workTimeSheetGrid',
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
            // plugins: {
            //     // { type: 'rowexpander' }
            //     rowexpander: true
            // },
            
            bind: '{timeSheetRecords}',
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 2,
                    // formatter: 'date("m/d/Y")',
                    dataIndex: 'Project_ID',
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Day 1',
                    dataIndex: 'Day1Hours'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Day 2',
                    dataIndex: 'Day2Hours'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Day 3',
                    dataIndex: 'Day3Hours'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Day 4',
                    // dataIndex: 'Start_Time'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Day 5',
                    // dataIndex: 'Start_Time'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Day 6',
                    // dataIndex: 'Start_Time'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Day 7',
                    // dataIndex: 'Start_Time'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'WT Hrs',
                    // dataIndex: 'End_Time'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    text: 'Prog. Hrs',
                    // dataIndex: 'Total_Time_Hours'

                }
            ]
        },
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'checkbox',
                    boxLabel: 'Show Punches',
                    // labelAlign: 'right',
                    ui: 'dark-checkbox',
                    inline: true,
                    // labelWidth: 'auto'
                }
            ]
        }
    ]

});