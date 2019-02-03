/**
 * Override of default calendar event to add leave request indicator icon
 * Works with overridden version of EventBase
 */
Ext.define('Breeze.overrides.calendar.Event', {
    override: 'Ext.calendar.Event',

    getElementConfig: function () {
        var cfg = this.callParent();
        cfg.cls = Ext.baseCSSPrefix + 'calendar-event';
        cfg.children = [{
            cls: Ext.baseCSSPrefix + 'calendar-event-inner',
            reference: 'innerElement',
            children: [{
                cls: Ext.baseCSSPrefix + 'calendar-event-time',
                reference: 'timeElement',
                children: [{
                    tag: 'span',
                    reference: 'startElement',
                    cls: Ext.baseCSSPrefix + 'calendar-event-time-start'
                }, {
                    tag: 'span',
                    html: ' - ',
                    reference: 'separatorElement',
                    cls: Ext.baseCSSPrefix + 'calendar-event-time-separator'
                }, {
                    tag: 'span',
                    reference: 'endElement',
                    cls: Ext.baseCSSPrefix + 'calendar-event-time-end'
                }]
            }, {
                // NOTE: Added element to indicate event is a request
                reference: 'requestIcon',
                tag: 'div',
                cls: 'x-icon-el x-font-icon x-fas fa-retweet',
                hidden: true
            }, {
                reference: 'titleElement',
                tag: 'span',
                cls: Ext.baseCSSPrefix + 'calendar-event-title'
            }, {
                cls: Ext.baseCSSPrefix + 'calendar-event-resizer',
                reference: 'resizerElement'
            }]
        }];
        return cfg;
    },
});