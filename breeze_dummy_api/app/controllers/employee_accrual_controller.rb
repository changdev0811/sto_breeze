require 'date'
class EmployeeAccrualController < GenericController
    include Generical
    include Spoofable
    GenericResponses = {
        save_employee_category_adjust: {
            pass: { err: 'pass', info: [] },
            fail: { err: 'failed', info: []}
        }
    }
    GenericPassing = {
        save_employee_category_adjust: :pass
    }

    Spoofs = {
        get_category_adjust_info: {
            'd.viewDate': Proc.new{|p| p[:params].fetch(:activeDay, DateTime.now).to_s },
            'd.recordingYear': Proc.new do |p|
                DateTime.parse(p[:params].fetch(:activeDay, DateTime.now.to_s)).year
            end
        }
    }

    def initialize()
        @generic_config = generic_init()
        super()
    end

    def get_rec_years
        serve_default
    end

    def save_employee_category_adjust
        serve_generic_pass_fail
    end

    def get_category_adjust_info
        emp = params.fetch(:employee_id, 'default')
        cat = params.fetch(:category_id, 'default')
        # serve_response(emp, cat)
        serve_spoof(emp,cat)
    end

    def get_category_point_in_time
        emp = params.fetch(:employee_id, 'default')
        cat = params.fetch(:category_id, 'default')
        serve_response(emp, cat)
    end

    private

end