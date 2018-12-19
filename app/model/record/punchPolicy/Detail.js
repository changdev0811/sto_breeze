/**
 * Model for Punch Policy detail list
 * @class Detail
 * @namespace Breeze.model.record.punchPolicy.Detail
 */
Ext.define('Breeze.model.record.punchPolicy.Detail', {
    extend: 'Breeze.model.Base',
    fields: [

        { name: 'policy_id', type: 'integer' },
        { name: 'customer_id', type: 'integer' },
        { name: 'policy_name', type: 'string' },
        { name: 'IsFixed', type: 'boolean' },
        { name: 'Ot_Opt1', type: 'boolean' },
        { name: 'Ot_Opt2', type: 'boolean' },
        { name: 'Ot_Opt3', type: 'boolean' },
        { name: 'Ot_Opt4', type: 'boolean' },
        { name: 'Ot_Day1', type: 'number' },
        { name: 'Ot_Day2', type: 'number' },
        { name: 'Ot_Day3', type: 'number' },
        { name: 'Ot_Day4', type: 'number' },
        { name: 'Ot_Week1', type: 'number' },
        { name: 'Ot_Week2', type: 'number' },
        { name: 'Ot_Week3', type: 'number' },
        { name: 'Ot_Week4', type: 'number' },
        { name: 'Ot_Rate1', type: 'number' },
        { name: 'Ot_Rate2', type: 'number' },
        { name: 'Ot_Rate3', type: 'number' },
        { name: 'Ot_Rate4', type: 'number' },
        { name: 'Subtract_DayOt', type: 'boolean' },
        { name: 'Round_Increment', type: 'integer' },
        { name: 'Round_Offset', type: 'integer' },
        { name: 'Allow_RegularPunch', type: 'boolean' },
        { name: 'Allow_QuickPunch', type: 'boolean' },
        { name: 'Auto_PunchIn', type: 'boolean' },
        { name: 'Auto_PunchOut', type: 'boolean' },
        { name: 'Auto_Close_Shift', type: 'integer' },
        { name: 'Auto_LunchPunch', type: 'boolean' },
        { name: 'LunchPunch_Seg', type: 'integer' },
        { name: 'LunchPunch_Hours', type: 'integer' },
        { name: 'Can_Add_Notes', type: 'boolean' },
        { name: 'Can_Edit_Notes', type: 'boolean' },
        { name: 'Can_Adjust_Punches', type: 'boolean' },
        { name: 'Can_Use_TimeSheets', type: 'boolean' },
        { name: 'InOut_Opt', type: 'boolean' },
        { name: 'Can_Use_InOut', type: 'boolean' }
    ]

});


