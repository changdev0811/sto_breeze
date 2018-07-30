Ext.define('Breeze.view.employee.fyi.AccrualItem', {
    alias: 'widget.employee.fyi.accrualItem',
    extend: 'Ext.dataview.ListItem',
    requires: [
        'Ext.XTemplate'
    ],
    flex: 1,
    layout: 'vbox',
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'component',
                    flex: 1,
                    reference: 'categoryName'
                },
                {
                    xtype: 'component',
                    reference: 'usage'
                }
            ]
        },
        {
            xtype: 'progress',
            ui: 'employeefyi-progress',
            reference: 'bar',
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
            [recorded.text,'of',allowed.text].join(' ')
        );

        var bar = this.lookup('bar');
        
        if(recorded.value <= allowed.value){
            // record <= allowed
            // % is recorded / allowed
            // set bar value
            if(allowed.value == 0.0){
                bar.setValue(0.0);
            } else {
                bar.setValue(recorded.value/allowed.value);
            }
            this.lookup('usage').setUserCls('');
        } else {
            // recorded > allowed
            // % is allowed / recorded
            bar.setValue(allowed.value/recorded.value);
            this.lookup('usage').setUserCls('employee-fyi-accrual-value-label-over');
        }
        
        bar.setValue(
            parseFloat(record.get('CatRecorded'))/parseFloat(record.get('CatAllowed'))
        );
        bar.el.child('.x-progress-bar', true).style.backgroundColor = record.get('CatColor');
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