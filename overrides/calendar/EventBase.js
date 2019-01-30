/**
 * Overridden version of calendar EventBase that connects value of
 * isLeave from event model to Event element
 */
Ext.define('Breeze.overrides.calendar.EventBase', {
    override: 'Ext.calendar.EventBase',
    /**
     * Extra config params, see original EventBase of others
     */
    config: {
        /**
         * @cfg {Boolean} leave
         * Used to represent whether event is a leave request
         */
        leave: false,

        /**
         * @cfg {String} leaveStyleClass
         * Style class to apply to leave requests
         */
        leaveStyleClass: ''
    },
    updateModel: function (model) {
        var me = this,
            dom;

        if (model) {
            me.setStartDate(model.getStartDate());
            me.setEndDate(model.getEndDate());
            me.setTitle(model.getTitle());
            // Updated to pass along value of isLeave from model
            me.setLeave(model.getIsLeave());

            dom = me.element.dom;
            dom.setAttribute('data-eventId', model.id);
            dom.setAttribute('data-calendarId', model.getCalendarId());
        }
    },
    updateLeave: function(newValue){
        if(this.requestIcon){
            if(newValue){
                this.requestIcon.show();
            } else {
                this.requestIcon.hide();
            }
        }
    }
});