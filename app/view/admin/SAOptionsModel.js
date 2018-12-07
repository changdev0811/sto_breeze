/**
 * View Model class for SAOptions Admin view
 * @class UDCModel
 * @namespace Breeze.view.admin.SAOptionsModel
 * @alias viewmodel.admin.saoptions
 */
Ext.define('Breeze.view.admin.SAOptionsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.saoptions',

    constructor: function(cfg){
        this.callParent([cfg]);
    },

    data: {
        // TODO: change to null
        //selectedCategoryID: "1"
    },

    formulas: {
        //selectedCat: function(get){
        //    var cat = get('cats').findRecord('Category_Id', get('selectedCategoryID'));
        //    return cat;
        //},
    },

    stores: {
        // TODO: Remove when API dummy is available
        
        daysOfWeek: {
            fields: ['id', 'value'],
            data: [
                { "id": 1, "value": 'Sunday' },
                { "id": 2, "value": 'Monday' },
                { "id": 3, "value": 'Tuesday' },
                { "id": 4, "value": 'Wednesday' },
                { "id": 5, "value": 'Thursday' },
                { "id": 6, "value": 'Friday' },
                { "id": 7, "value": 'Saturday' }
            ]
        },

        OptionList:{
            fields: ['ID', 'CodeTypeID', 'Description'],
            data: [
                {"ID":57,"CodeTypeID":15,"Description":"Days"},
                {"ID":58,"CodeTypeID":15,"Description":"Weeks"},
                {"ID":59,"CodeTypeID":15,"Description":"Months"},
                {"ID":60,"CodeTypeID":15,"Description":"Years"}
            ]
        },

        pendingCancellationStore: {
            //model: 'CancelOption',
            data: [
                {Code: 131,    Description: 'Disabled'},
                {Code: 132,    Description: 'Enabled'}
            ]
        },

        CancellationStore: {
            //model: 'CancelOption',
            data: [
                {Code: 131,    Description: 'Disabled'},
                {Code: 132,    Description: 'Enabled'},
                {Code: 133,    Description: 'Enabled - Requires Approval'}
            ]        
        },
        

        ConfigInfo: {

            "__type":"Repository.Entities.ConfigInfo",
            "CompanyName":"Venture Interactive",
            "LogoPath":"app/resources/Logos/default.png",
            "RepLogoPath":"app/resources/Logos/repdefault.png",
            "CarryType":1,
            "ConflictOpt":1,
            "FiscDate":(new Date()),
            "LeaveApproveOpt":1,
            "LeaveApproveMode":130,
            "ConflictLimit":2,
            "EmployeeViewConflictDetails":false,
            "EnforceAllowed":true,
            "CarryYear":2000,
            "RepLogo":true,
            "RepSignature":true,
            "RecMode":0,
            "AutoPointDelete":false,
            "AutoAdjustDelete":false,
            "AutoNoteDelete":false,
            "RepComp":true,
            "EmployeesLicensed":100,
            "PunchComment1":"-Administrator comment 1-",
            "PunchComment2":"-Administrator comment 2-",
            "PunchComment3":"-Administrator comment 3-",
            "PunchComment4":"-Administrator comment 4-",
            "PunchComment5":"-Administrator comment 5-",
            "PunchComment6":"-Administrator comment 6-",
            "PunchComment7":"-Administrator comment 7-",
            "PunchComment8":"-Administrator comment 8-",
            "TimeZone_ID":"US Eastern Standard Time",
            "StartOfWeek":1,
            "PunchCutOff":0,
            "EnableExternalPunches":false,
            "StateLessPunching":false,
            "SAKioskMode":true,
            "ExportCode":"11235",
            "AccrualCapOption":2,
            "BalanceCapOption":true,
            "LogoWidth":300,
            "LogoHeight":179,
            "CarryExp_Amt":0,
            "CarryExp_Type":59,
            "CarryExpires":true,
            "HireDateYOS":true,
            "RequestLeaveInPast":true,
            "LeaveApprovalEmailSupervisor":true,
            "LeaveDenialEmailSupervisor":true,
            "CancelLeavePending":131,
            "CancelLeaveNotTaken":131,
            "CancelLeaveAfterTaken":131,
            "PasswordComplexity":true,
            "PointExpirationType":134,
            "PointRollingDuration":"1,60",
            "DisableSSN":true,
            "QBIntegration":false,
            "QBEmployees":null,
            "QBEmployeeOptions":null,
            "Captions":{
                "EmployeeNumber":"Employee #",
                "ProjectSingle":"Project",
                "ProjectPlural":"Projects"
            },
            "hasTKO":true

        },

        CompanyInfo:{
            "company_code":"VI",
            "customer_id":991012,
            "contact_first_name":"Admin",
            "contact_last_name":"Venture",
            "contact_job_title":"Developer",
            "contact_mobile":"5555555",
            "contact_email":"shawn@ventureinteractive.com",
            "business_name":"Venture Interactive",
            "logo_path":"Not Available",
            "address":"1234 don\u0027t know ",
            "address2":"",
            "city":"roanoke",
            "zip_code":"24018",
            "state_id":48,
            "state_other":"",
            "time_zone_code":30,
            "country_id":1,
            "phone_no":"5555555",
            "phone_no2":"",
            "alternate_email":"",
            "status_code":3,
            "employee_licenses":100,
            "AMOSId":"9999999",
            "renewal_date":"5/22/2019 10:06:00 AM",
            "salesperson":"UnKnown",
            "note":"",
            "amount":0.00,
            "activeemps":7,
            "termemps":0,
            "delemps":2,
            "product":null,
            "server_name":null,
            "date_created":"5/22/2018 10:06:00 AM"
        },




        TimeZoneOptions:{
            fields: ['Timezone_id', 'description'],

            data:[
                {"ID":1,"Timezone_id":"Dateline Standard Time","description":"(UTC-12:00) International Date Line West","utc_offset":-12},
                {"ID":2,"Timezone_id":"UTC-11","description":"(UTC-11:00) Coordinated Universal Time-11","utc_offset":-11},
                {"ID":3,"Timezone_id":"Hawaiian Standard Time","description":"(UTC-10:00) Hawaii","utc_offset":-10},
                {"ID":4,"Timezone_id":"Alaskan Standard Time","description":"(UTC-09:00) Alaska","utc_offset":-9},
                {"ID":5,"Timezone_id":"Pacific Standard Time (Mexico)","description":"(UTC-08:00) Baja California","utc_offset":-8},
                {"ID":6,"Timezone_id":"Pacific Standard Time","description":"(UTC-08:00) Pacific Time (US \u0026 Canada)","utc_offset":-8},
                {"ID":7,"Timezone_id":"US Mountain Standard Time","description":"(UTC-07:00) Arizona","utc_offset":-7},
                {"ID":8,"Timezone_id":"Mountain Standard Time (Mexico)","description":"(UTC-07:00) Chihuahua, La Paz, Mazatlan","utc_offset":-7},
                {"ID":9,"Timezone_id":"Mountain Standard Time","description":"(UTC-07:00) Mountain Time (US \u0026 Canada)","utc_offset":-7},
                {"ID":10,"Timezone_id":"Central America Standard Time","description":"(UTC-06:00) Central America","utc_offset":-6},
                {"ID":11,"Timezone_id":"Central Standard Time","description":"(UTC-06:00) Central Time (US \u0026 Canada)","utc_offset":-6},
                {"ID":12,"Timezone_id":"Easter Island Standard Time","description":"(UTC-06:00) Easter Island","utc_offset":-6},
                {"ID":13,"Timezone_id":"Central Standard Time (Mexico)","description":"(UTC-06:00) Guadalajara, Mexico City, Monterrey","utc_offset":-6},
                {"ID":14,"Timezone_id":"Canada Central Standard Time","description":"(UTC-06:00) Saskatchewan","utc_offset":-6},
                {"ID":15,"Timezone_id":"SA Pacific Standard Time","description":"(UTC-05:00) Bogota, Lima, Quito, Rio Branco","utc_offset":-5},
                {"ID":16,"Timezone_id":"Eastern Standard Time (Mexico)","description":"(UTC-05:00) Chetumal","utc_offset":-5},
                {"ID":17,"Timezone_id":"Eastern Standard Time","description":"(UTC-05:00) Eastern Time (US \u0026 Canada)","utc_offset":-5},
                {"ID":18,"Timezone_id":"Haiti Standard Time","description":"(UTC-05:00) Haiti","utc_offset":-5},
                {"ID":19,"Timezone_id":"US Eastern Standard Time","description":"(UTC-05:00) Indiana (East)","utc_offset":-5},
                {"ID":20,"Timezone_id":"Venezuela Standard Time","description":"(UTC-04:30) Caracas","utc_offset":-4},
                {"ID":21,"Timezone_id":"Paraguay Standard Time","description":"(UTC-04:00) Asuncion","utc_offset":-4},
                {"ID":22,"Timezone_id":"Atlantic Standard Time","description":"(UTC-04:00) Atlantic Time (Canada)","utc_offset":-4},
                {"ID":23,"Timezone_id":"Central Brazilian Standard Time","description":"(UTC-04:00) Cuiaba","utc_offset":-4},
                {"ID":24,"Timezone_id":"SA Western Standard Time","description":"(UTC-04:00) Georgetown, La Paz, Manaus, San Juan","utc_offset":-4},
                {"ID":25,"Timezone_id":"Pacific SA Standard Time","description":"(UTC-04:00) Santiago","utc_offset":-4},
                {"ID":26,"Timezone_id":"Newfoundland Standard Time","description":"(UTC-03:30) Newfoundland","utc_offset":-3},
                {"ID":27,"Timezone_id":"E. South America Standard Time","description":"(UTC-03:00) Brasilia","utc_offset":-3},
                {"ID":28,"Timezone_id":"SA Eastern Standard Time","description":"(UTC-03:00) Cayenne, Fortaleza","utc_offset":-3},
                {"ID":29,"Timezone_id":"Argentina Standard Time","description":"(UTC-03:00) City of Buenos Aires","utc_offset":-3},
                {"ID":30,"Timezone_id":"Greenland Standard Time","description":"(UTC-03:00) Greenland","utc_offset":-3},
                {"ID":31,"Timezone_id":"Montevideo Standard Time","description":"(UTC-03:00) Montevideo","utc_offset":-3},
                {"ID":32,"Timezone_id":"Bahia Standard Time","description":"(UTC-03:00) Salvador","utc_offset":-3},
                {"ID":33,"Timezone_id":"UTC-02","description":"(UTC-02:00) Coordinated Universal Time-02","utc_offset":-2},
                {"ID":34,"Timezone_id":"Mid-Atlantic Standard Time","description":"(UTC-02:00) Mid-Atlantic - Old","utc_offset":-2},
                {"ID":35,"Timezone_id":"Azores Standard Time","description":"(UTC-01:00) Azores","utc_offset":-1},
                {"ID":36,"Timezone_id":"Cape Verde Standard Time","description":"(UTC-01:00) Cabo Verde Is.","utc_offset":-1},
                {"ID":37,"Timezone_id":"Morocco Standard Time","description":"(UTC) Casablanca","utc_offset":0},
                {"ID":38,"Timezone_id":"UTC","description":"(UTC) Coordinated Universal Time","utc_offset":0},
                {"ID":39,"Timezone_id":"GMT Standard Time","description":"(UTC) Dublin, Edinburgh, Lisbon, London","utc_offset":0},
                {"ID":40,"Timezone_id":"Greenwich Standard Time","description":"(UTC) Monrovia, Reykjavik","utc_offset":0},
                {"ID":41,"Timezone_id":"W. Europe Standard Time","description":"(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna","utc_offset":1},
                {"ID":42,"Timezone_id":"Central Europe Standard Time","description":"(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague","utc_offset":1},
                {"ID":43,"Timezone_id":"Romance Standard Time","description":"(UTC+01:00) Brussels, Copenhagen, Madrid, Paris","utc_offset":1},
                {"ID":44,"Timezone_id":"Central European Standard Time","description":"(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb","utc_offset":1},
                {"ID":45,"Timezone_id":"W. Central Africa Standard Time","description":"(UTC+01:00) West Central Africa","utc_offset":1},
                {"ID":46,"Timezone_id":"Namibia Standard Time","description":"(UTC+01:00) Windhoek","utc_offset":1},
                {"ID":47,"Timezone_id":"Jordan Standard Time","description":"(UTC+02:00) Amman","utc_offset":2},
                {"ID":48,"Timezone_id":"GTB Standard Time","description":"(UTC+02:00) Athens, Bucharest","utc_offset":2},
                {"ID":49,"Timezone_id":"Middle East Standard Time","description":"(UTC+02:00) Beirut","utc_offset":2},
                {"ID":50,"Timezone_id":"Egypt Standard Time","description":"(UTC+02:00) Cairo","utc_offset":2},
                {"ID":51,"Timezone_id":"Syria Standard Time","description":"(UTC+02:00) Damascus","utc_offset":2},
                {"ID":52,"Timezone_id":"E. Europe Standard Time","description":"(UTC+02:00) E. Europe","utc_offset":2},
                {"ID":53,"Timezone_id":"South Africa Standard Time","description":"(UTC+02:00) Harare, Pretoria","utc_offset":2},
                {"ID":54,"Timezone_id":"FLE Standard Time","description":"(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius","utc_offset":2},
                {"ID":55,"Timezone_id":"Turkey Standard Time","description":"(UTC+02:00) Istanbul","utc_offset":2},
                {"ID":56,"Timezone_id":"Israel Standard Time","description":"(UTC+02:00) Jerusalem","utc_offset":2},
                {"ID":57,"Timezone_id":"Kaliningrad Standard Time","description":"(UTC+02:00) Kaliningrad","utc_offset":2},
                {"ID":58,"Timezone_id":"Libya Standard Time","description":"(UTC+02:00) Tripoli","utc_offset":2},
                {"ID":59,"Timezone_id":"Arabic Standard Time","description":"(UTC+03:00) Baghdad","utc_offset":3},
                {"ID":60,"Timezone_id":"Arab Standard Time","description":"(UTC+03:00) Kuwait, Riyadh","utc_offset":3},
                {"ID":61,"Timezone_id":"Belarus Standard Time","description":"(UTC+03:00) Minsk","utc_offset":3},
                {"ID":62,"Timezone_id":"Russian Standard Time","description":"(UTC+03:00) Moscow, St. Petersburg, Volgograd","utc_offset":3},
                {"ID":63,"Timezone_id":"E. Africa Standard Time","description":"(UTC+03:00) Nairobi","utc_offset":3},
                {"ID":64,"Timezone_id":"Iran Standard Time","description":"(UTC+03:30) Tehran","utc_offset":3},
                {"ID":65,"Timezone_id":"Arabian Standard Time","description":"(UTC+04:00) Abu Dhabi, Muscat","utc_offset":4},
                {"ID":66,"Timezone_id":"Astrakhan Standard Time","description":"(UTC+04:00) Astrakhan, Ulyanovsk","utc_offset":4},
                {"ID":67,"Timezone_id":"Azerbaijan Standard Time","description":"(UTC+04:00) Baku","utc_offset":4},
                {"ID":68,"Timezone_id":"Russia Time Zone 3","description":"(UTC+04:00) Izhevsk, Samara","utc_offset":4},
                {"ID":69,"Timezone_id":"Mauritius Standard Time","description":"(UTC+04:00) Port Louis","utc_offset":4},
                {"ID":70,"Timezone_id":"Georgian Standard Time","description":"(UTC+04:00) Tbilisi","utc_offset":4},
                {"ID":71,"Timezone_id":"Caucasus Standard Time","description":"(UTC+04:00) Yerevan","utc_offset":4},
                {"ID":72,"Timezone_id":"Afghanistan Standard Time","description":"(UTC+04:30) Kabul","utc_offset":4},
                {"ID":73,"Timezone_id":"West Asia Standard Time","description":"(UTC+05:00) Ashgabat, Tashkent","utc_offset":5},
                {"ID":74,"Timezone_id":"Ekaterinburg Standard Time","description":"(UTC+05:00) Ekaterinburg","utc_offset":5},
                {"ID":75,"Timezone_id":"Pakistan Standard Time","description":"(UTC+05:00) Islamabad, Karachi","utc_offset":5},
                {"ID":76,"Timezone_id":"India Standard Time","description":"(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi","utc_offset":5},
                {"ID":77,"Timezone_id":"Sri Lanka Standard Time","description":"(UTC+05:30) Sri Jayawardenepura","utc_offset":5},
                {"ID":78,"Timezone_id":"Nepal Standard Time","description":"(UTC+05:45) Kathmandu","utc_offset":5},
                {"ID":79,"Timezone_id":"Central Asia Standard Time","description":"(UTC+06:00) Astana","utc_offset":6},
                {"ID":80,"Timezone_id":"Bangladesh Standard Time","description":"(UTC+06:00) Dhaka","utc_offset":6},
                {"ID":81,"Timezone_id":"N. Central Asia Standard Time","description":"(UTC+06:00) Novosibirsk","utc_offset":6},
                {"ID":82,"Timezone_id":"Myanmar Standard Time","description":"(UTC+06:30) Yangon (Rangoon)","utc_offset":6},
                {"ID":83,"Timezone_id":"SE Asia Standard Time","description":"(UTC+07:00) Bangkok, Hanoi, Jakarta","utc_offset":7},
                {"ID":84,"Timezone_id":"Altai Standard Time","description":"(UTC+07:00) Barnaul, Gorno-Altaysk","utc_offset":7},
                {"ID":85,"Timezone_id":"North Asia Standard Time","description":"(UTC+07:00) Krasnoyarsk","utc_offset":7},
                {"ID":86,"Timezone_id":"China Standard Time","description":"(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi","utc_offset":8},
                {"ID":87,"Timezone_id":"North Asia East Standard Time","description":"(UTC+08:00) Irkutsk","utc_offset":8},
                {"ID":88,"Timezone_id":"Singapore Standard Time","description":"(UTC+08:00) Kuala Lumpur, Singapore","utc_offset":8},
                {"ID":89,"Timezone_id":"W. Australia Standard Time","description":"(UTC+08:00) Perth","utc_offset":8},
                {"ID":90,"Timezone_id":"Taipei Standard Time","description":"(UTC+08:00) Taipei","utc_offset":8},
                {"ID":91,"Timezone_id":"Ulaanbaatar Standard Time","description":"(UTC+08:00) Ulaanbaatar","utc_offset":8},
                {"ID":92,"Timezone_id":"North Korea Standard Time","description":"(UTC+08:30) Pyongyang","utc_offset":8},
                {"ID":93,"Timezone_id":"Transbaikal Standard Time","description":"(UTC+09:00) Chita","utc_offset":9},
                {"ID":94,"Timezone_id":"Tokyo Standard Time","description":"(UTC+09:00) Osaka, Sapporo, Tokyo","utc_offset":9},
                {"ID":95,"Timezone_id":"Korea Standard Time","description":"(UTC+09:00) Seoul","utc_offset":9},
                {"ID":96,"Timezone_id":"Yakutsk Standard Time","description":"(UTC+09:00) Yakutsk","utc_offset":9},
                {"ID":97,"Timezone_id":"Cen. Australia Standard Time","description":"(UTC+09:30) Adelaide","utc_offset":9},
                {"ID":98,"Timezone_id":"AUS Central Standard Time","description":"(UTC+09:30) Darwin","utc_offset":9},
                {"ID":99,"Timezone_id":"E. Australia Standard Time","description":"(UTC+10:00) Brisbane","utc_offset":10},
                {"ID":100,"Timezone_id":"AUS Eastern Standard Time","description":"(UTC+10:00) Canberra, Melbourne, Sydney","utc_offset":10},
                {"ID":101,"Timezone_id":"West Pacific Standard Time","description":"(UTC+10:00) Guam, Port Moresby","utc_offset":10},
                {"ID":102,"Timezone_id":"Tasmania Standard Time","description":"(UTC+10:00) Hobart","utc_offset":10},
                {"ID":103,"Timezone_id":"Magadan Standard Time","description":"(UTC+10:00) Magadan","utc_offset":10},
                {"ID":104,"Timezone_id":"Vladivostok Standard Time","description":"(UTC+10:00) Vladivostok","utc_offset":10},
                {"ID":105,"Timezone_id":"Russia Time Zone 10","description":"(UTC+11:00) Chokurdakh","utc_offset":11},
                {"ID":106,"Timezone_id":"Sakhalin Standard Time","description":"(UTC+11:00) Sakhalin","utc_offset":11},
                {"ID":107,"Timezone_id":"Central Pacific Standard Time","description":"(UTC+11:00) Solomon Is., New Caledonia","utc_offset":11},
                {"ID":108,"Timezone_id":"Russia Time Zone 11","description":"(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky","utc_offset":12},
                {"ID":109,"Timezone_id":"New Zealand Standard Time","description":"(UTC+12:00) Auckland, Wellington","utc_offset":12},
                {"ID":110,"Timezone_id":"UTC+12","description":"(UTC+12:00) Coordinated Universal Time+12","utc_offset":12},
                {"ID":111,"Timezone_id":"Fiji Standard Time","description":"(UTC+12:00) Fiji","utc_offset":12},
                {"ID":112,"Timezone_id":"Kamchatka Standard Time","description":"(UTC+12:00) Petropavlovsk-Kamchatsky - Old","utc_offset":12},
                {"ID":113,"Timezone_id":"Tonga Standard Time","description":"(UTC+13:00) Nuku\u0027alofa","utc_offset":13},
                {"ID":114,"Timezone_id":"Samoa Standard Time","description":"(UTC+13:00) Samoa","utc_offset":13},
                {"ID":115,"Timezone_id":"Line Islands Standard Time","description":"(UTC+14:00) Kiritimati Island","utc_offset":14}
            ]
        },


    }

});