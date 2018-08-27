/**
 * FYI View Accrual item detail list item with progress bar, category name, and value labels
 * @class AccrualItem
 * @alias Breeze.view.employee.fyi.AccrualItem
 */
Ext.define('Breeze.view.employee.fyi.AccrualItem', {
    alias: 'widget.employee.fyi.accrualItem',
    extend: 'Ext.dataview.ListItem',
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
            layout: 'hbox',
            items: [
                {
                    xtype: 'component',
                    flex: 1,
                    reference: 'categoryName',
                    userCls: 'employee-fyi-accrual-item-layout'
                },
                {
                    xtype: 'component',
                    reference: 'usage',
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
        this.lookup('categoryName').setHtml(record.get('CatDesc'));

        var recorded = this.normalizedRecordFloat(record,'CatRecorded');
        var allowed = this.normalizedRecordFloat(record, 'CatAllowed');
        var remaining = this.normalizedRecordFloat(record, 'CatRemaining');

        // set label
        this.lookup('usage').setHtml(
            ['Allowed: ', allowed.text,' hr. | Used: ',recorded.text, ' | Remaining: ', remaining.text ].join('')
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
            bgColor.a = 0.25;
            bar.el.setStyle('background-color',bgColor.toString());
        }

        if(recorded.value <= allowed.value){
            this.lookup('usage').setUserCls('employee-fyi-accrual-item-layout');
        } else {
            this.lookup('usage').setUserCls('employee-fyi-accrual-value-label-over employee-fyi-accrual-item-layout');
        }
        
        if(typeof catColor !== 'undefined'){
            bar.el.child('.x-progress-bar', true).style.backgroundColor = catColor;
        }
        bar.el.child('.x-progress-bar', true).style.backgroundImage = 'none';
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
    }
});