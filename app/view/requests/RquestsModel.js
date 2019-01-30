Ext.define('Breeze.view.requests.RequestsModel', {
    extend: 'Breeze.viewmodel.Base',
    alias: 'viewmodel.requests.requests',

    stores: {

    },

    data: {
        // Visibility of leave request action buttons
        requestActions: {
            employeeNotes: true,
            employeeNotesReadOnly: false,
            supervisorNotes: false,
            denyNotes: false,
            submit: true,
            delete: true,
            cancel: false,
            deleteDay: false
        }
    },

    formulas: {
        /**
         * Formula returning the column title for Requested Days' grid
         * 'Amount' column
         */
        requestedDaysAmountColumnTitle: {
            bind: {
                recordingMode: '{empShiftTime.recording_mode}'
            },
            get: function(data){
                return (data.recordingMode == 21)? 'Hours' : 'Percent';
            }
        }
    }



});