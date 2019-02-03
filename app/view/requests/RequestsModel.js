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
         * Formula used to decide if one notes button is shown or if a button
         * with a mennu is shown instead
         */
        leaveRequestMultipleNotes: {
            bind: '{requestActions}',
            get: function(data){
                if(data.employeeNotes + data.employeeNotesReadOnly + data.supervisorNotes + data.denyNotes > 1){
                    return true;
                } else {
                    return false;
                }
            }
        },
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
        },
        /**
         * Formula returning whether amount is in hours
         */
        amountInHoursMode: {
            bind: {
                recordingMode: '{empShiftTime.recording_mode}'
            },
            get: function(data){
                return (data.recordingMode == 21);
            }
        },
        /**
         * Formula indicating whether days can be requested for the 
         * selected leave request
         */
        canRequestDays: {
            bind: '{selectedRequest.request_status}',
            get: function(data){
                var status = data.toUpperCase();
                if(status == 'APPROVED' || status == 'PENDING'){
                    return false;
                } else {
                    return true;
                }
            }
        }
    }



});