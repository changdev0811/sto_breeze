Ext.define('Breeze.view.requests.form.RequestDay', {
    extend: 'Ext.calendar.form.Add',
    alias: 'widget.requests.form.requestday',
    title: {
        ui: 'dark-themed-dialog',
        text: 'Request Day'
    },

    config: {
        titleField: {
            hidden: true
        },
        startTimeField: {
            hidden: true
        },
        endTimeField: {
            hidden: true
        },
        descriptionField: {
            hidden: true
        },
        startDateField: {
            ui: 'dialog-field'
        },
        endDateField: {
            ui: 'dialog-field'
        },
        allDayField: {
            // ui: 'dialog-field-checkbox',
            // boxLabel: 'All Day',
            // bodyAlign: 'stretch',
            // label: ''
            hidden: true
        },
        hoursField: {
            xtype: 'spinnerfield',
            ui: 'dialog-field',
            label: 'Hours',
            itemId: 'hours',
            name: 'hours',
            minValue: 1,
            maxValue: 24
        },
        percentField: {
            xtype: 'spinnerfield',
            ui: 'dialog-field',
            label: 'Percent',
            itemId: 'percent',
            name: 'percent',
            minValue: 1,
            maxValue: 100
        },
        /**
         * If hours is shown instead of percent
         */
        hoursMode: false,
        /**
         * Set overriding toolbar ui
         */
    	toolbarUi:null,
    },

    initialize: function() {
        var me = this;

        me.initForm();
        me.add({
            xtype: 'toolbar',
            docked: 'bottom',
            ui: me.getToolbarUi(),
            items: me.generateButtons()
        });
        //me.callParent();
        me.applyValues();
        me.checkFields();
    },

    createItems: function() {
        var me = this,
            calField = me.getCalendarField();

        if (!calField.store) {
            calField.store = me.getCalendarStore();
        }

        me.add([{
            xtype: 'fieldset',
            scrollable: me.isCompact ? 'y' : undefined,
            margin: 0,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                calField,
                me.getTitleField(),
                me.getStartDateField(),
                me.getStartTimeField(),
                me.getEndDateField(),
                me.getEndTimeField(),
                me.getAllDayField(),
                me.getHoursField(),
                me.getPercentField(),
                me.getDescriptionField()
            ]
        }]);

        // Bind visibility of 
        var fs = me.getAt(0),
            hours = fs.getComponent('hours'),
            percent = fs.getComponent('percent');
        hours.setHidden(!this.getHoursMode());
        percent.setHidden(this.getHoursMode());
    },

    updateHoursMode: function(val){
        // Bind visibility of 
        var fs = this.getAt(0);
        if(fs){
            var hours = fs.getComponent('hours'),
                percent = fs.getComponent('percent');
            hours.setHidden(!val);
            percent.setHidden(val);
        }
    }
});