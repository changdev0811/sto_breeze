/**
 * Time-Number pairs covering 30 minute intervals for 24 hours
 * Used by Shift Schedule ranges
 * 
 * value - number, time - time string
 * 
 * @class ShiftChoices
 * @namespace Breeze.store.accrual.static.ShiftChoices
 * @alias accrual.static.shiftchoices
 * @storeId accrualShiftChoices
 */
Ext.define('Breeze.store.accrual.static.ShiftChoices', {
    extend: 'Ext.data.Store',
    alias: 'store.accrual.static.shiftchoices',
    storeId: 'accrualShiftChoices',
    constructor: function(cfg){
        var me = this;
        cfg = cfg || {};
        // IEFF building 24 hour range values
        var times = (function(){
            return function(){for(var b=[],a=0,c=0;48>a;a++,c=30*a)b.push(c);
                return b}().map(function(b){var a=Math.floor(b/60)%12;
                var c=720>b?"AM":"PM";a=(0==a?12:a)+":"+(b%60)
                .toZeroPaddedString(2)+c;return{value:b,time:a}});
        })();
        me.callParent([
            Ext.apply({
                fields: ['value','time'],
                data: times
            }, cfg)
        ]);
    }
});