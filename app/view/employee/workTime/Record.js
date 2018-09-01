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
                        '<div class="employee-wtr-records-rowbody">',
                            '<div class="punch-in">',
                                '<div>',
                                    '<span>IN Punch</span><br/>',
                                    '<div class="icon in"></div>',
                                '</div>',
                                '<div class="lbl">',
                                    '<label>Date:</label> {[this.shortDate(values.In_Punch.Punch_Time)]}<br/>',
                                    '<label>Time:</label> {[this.shortTime(values.In_Punch.processed_time)]}<br/>',
                                    '<label>Notes:</label> {In_Punch.notes}<br/>',
                                '</div>',
                            '</div>',
                            '<div class="punch-out">',
                                '<div>',
                                    '<span>OUT Punch</span><br/>',
                                    '<div class="icon in"></div>',
                                '</div>',
                                '<div class="lbl">',
                                    '<label>Date:</label> {[this.shortDate(values.Out_Punch.Punch_Time)]}<br/>',
                                    '<label>Time:</label> {[this.shortTime(values.Out_Punch.processed_time)]}<br/>',
                                    '<label>Notes:</label> {Out_Punch.notes}<br/>',
                                '</div>',
                            '</div>',
                        '</div>',
                         {
                             // Format date string to be short
                             shortDate: function(v){
                                 if(v == null){
                                     return "(None)";
                                 }
                                 var pad = function(n){return (n<10)? "0" + n : n;};
                                 var dt = v.substr(0, v.indexOf(')')).substr(v.indexOf('(')+1);
                                 var d = new Date(parseInt(dt));
                                 return [
                                     pad(d.getUTCMonth()),
                                     pad(d.getUTCDay()),
                                     pad(d.getUTCFullYear())
                                 ].join('/');
                             },
                             // Format time string to be displayable
                             shortTime: function(v){
                                if(v == null){
                                    return "(None)";
                                }
                                var dt = v.substr(0, v.indexOf(')')).substr(v.indexOf('(')+1);
                                var d = new Date(parseInt(dt));
                                return d.toLocaleTimeString();
                            }
                         }
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
                    boxLabel: 'Show Punches',
                    // labelAlign: 'right',
                    inline: true,
                    // labelWidth: 'auto',
                    ui: 'dark-checkbox'

                }
            ]
        }
    ]

});