/**
 * FYI View Accrual item detail list item with progress bar, category name, and value labels
 * @class AccrualItem
 * @alias Breeze.view.employee.fyi.AccrualItem
 */
Ext.define('Breeze.view.employee.fyi.AccrualItem', {
    alias: 'widget.employee.fyi.accrualItem',
    extend: 'Ext.dataview.ListItem',
    controller: 'employee.fyi.accrualitem',
    requires: [
        'Ext.XTemplate'
    ],
    flex: 1,
    layout: 'vbox',
    userCls: 'employee-fyi-accrual-item',
    ui: 'fyi-accrual-item',
    items: [
        {
            xtype: 'container',
            layout: { type: 'vbox' },
            items: [
                {
                    xtype: 'component',
                    reference: 'categoryName',
                    userCls: 'employee-fyi-accrual-item-layout'
                },


                {
                    xtype:'container',
                    layout:'hbox',
                    reference: 'info',
                    items:[
                        {
                            xtype: 'component',
                            reference: 'info1',
                            width:'auto',
                        },
                        {
                           xtype: 'component',
                           flex:1,
                        },
                        {
                            xtype: 'component',
                            reference: 'info2',
                            width:'auto',
                        },
                        {
                           xtype: 'component',
                           flex:1,
                        },
                        {
                            xtype: 'component',
                            reference: 'info3',
                            width:'auto',
                        },
                    ]
                },

                {
                    xtype: 'component',
                    reference: 'usage',
                    //style:'font-size:12pt',
                    //userCls: ['employee-fyi-accrual-item-layout', 'employee-fyi-accrual-item-usage']
                }
            ]
        },
        {
            xtype: 'progress',
            ui: 'employeefyi-progress',
            userCls: 'employee-fyi-accrual-item-over',
            shadowCls: 'employee-fyi-accrual-value-shadow',
            reference: 'bar',
            shadow: true,
            style: 'margin-bottom:-10pt; padding:0pt;',
            value: 0.5
            
        }
    ],
    updateRecord: function(record){
        var me = this;
        this.el.on('click', function(){
            me.getController().onItemClick();
        });
        if(this.isDestroying){
            return null;
        }
        this.lookup('categoryName').setHtml(record.get('CatDesc'));

        var recorded = this.normalizedRecordFloat(record,'CatRecorded');
        var allowed = this.normalizedRecordFloat(record, 'CatAllowed');
        var remaining = this.normalizedRecordFloat(record, 'CatRemaining');

        // set label
        this.lookup('info1').setHtml(
            ['Allowed: ', allowed.text,' hr.' ].join('')
            //['Allowed: ', allowed.text,' hr. Used: ',recorded.text, ' hr. Remaining: ', remaining.text, ' hr'  ].join('')
            //[recorded.text,' used of ',allowed.text, ' allowed hrs. (', remaining.text, ' remaining)'  ].join('')
        );
        this.lookup('info2').setHtml(
            ['Used: ',recorded.text].join('')
            //['Allowed: ', allowed.text,' hr. Used: ',recorded.text, ' hr. Remaining: ', remaining.text, ' hr'  ].join('')
            //[recorded.text,' used of ',allowed.text, ' allowed hrs. (', remaining.text, ' remaining)'  ].join('')
        );
        this.lookup('info3').setHtml(
            ['Remaining: ', remaining.text ].join('')
            //['Allowed: ', allowed.text,' hr. Used: ',recorded.text, ' hr. Remaining: ', remaining.text, ' hr'  ].join('')
            //[recorded.text,' used of ',allowed.text, ' allowed hrs. (', remaining.text, ' remaining)'  ].join('')
        );



        var bar = this.lookup('bar');
        var catColor = record.get('CatColor');

        this.lookup('bar').setUi(['employeefyi-progress']);

        // set bar value
        if(allowed.value == 0.0){
            bar.setValue(0.0);
        } else {
            bar.setValue(recorded.value/allowed.value);
        }

        this.lookup('usage').setUserCls('');
        if(typeof catColor !== 'undefined'){
            var bgColor = Ext.util.Color.fromString(catColor);
            bgColor.a = 1;
            bar.el.setStyle('background-color',bgColor.toString());
            bar.el.setStyle('background-image','linear-gradient( rgba(63,63,63,.33), rgba(127,127,127,.25) )');



        }

        if(recorded.value <= allowed.value){
            this.lookup('info').setUserCls('employee-fyi-accrual-item-layout-info');
        } else {
            this.lookup('info').setUserCls('employee-fyi-accrual-value-label-over employee-fyi-accrual-item-layout-info');
        }
        
        if(typeof catColor !== 'undefined'){
            bar.el.child('.x-progress-bar', true).style.backgroundColor = catColor;
            bar.el.child('.x-progress-bar', true).style.backgroundImage = 'linear-gradient( rgba(255,255,255,.33), rgba(255,255,255,0) )';

        }
        //bar.el.child('.x-progress-bar', true).style.background33mage = 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.25), rgba(255,255,255,0), rgba(0,0,0,.5))';
        //bar.el.child('.x-progress-bar', true).style.backgroundImage = 'none';
    },

    /**
     * Get float value from record text field and return an object
     * containing its float value and display text. If value is NaN, use 0.0
     * @param {Object} record Data record
     * @param {String} fieldName Name of field to read
     * @return {Object} object defining value and text fields
     */
    normalizedRecordFloat: function(record, fieldName){
        var data = { 
            value: parseFloat(record.get(fieldName)), 
            text: record.get(fieldName) 
        };
        data.value = (isNaN(data.value))? 0.0 : data.value;
        return data;
    },
    listeners: {
        tap: 'onFyiItemTap'
    }
});