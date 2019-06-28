
class CallsController < ApplicationController

  LoginErrors = {
    terminated: "Terminated Employees Cannot Login",
    expired: "Subscription Expired.",
    eula_sa: "a__b__c__ShowEULA__15",
    eula_user: "a__b__c__ShowEULA__0",
    bad_pass: "bad password"
  }

  RecoverErrors = {
    no_email: "We are unable to update your password as there " +
      "is no email on record to send it to. " + 
      "Please contact your administrator.",
    success: "Your password has been updated and you will receive " + 
      "your new password via email momentarily. Thank you!"
  }

  Responses = {
    check_layoff_effective_date: { pass: 'default.json', fail: 'failure.json' }
  }

  PassFail = {
    check_layoff_effective_date: :pass
  }

  Options = {
    get_company_config: {
      hide_duration: false
    }
  }


  RandomizeFYI = true
  # Set to one of the LoginError symbols to simulate login fail states
  LoginMode = nil # :bad_pass
  # Set to one of the RecoverError symbols to simulate fail/success for forgot password
  RecoverMode = :success
 
  def login
    # render :json => response_url('default')
    set_login_mode
    render 'login.json'
  end

  def logout
    render 'logOut.json'
  end

  def forgot_password
    set_recover_mode
    render 'ForgotPassword.json'
  end

  def get_login_server_url
    render 'getLoginServerUrl.json'
  end

  def get_employee_counts
    render :json => response_url('default')
  end

  def get_access
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_accrual_policies_list
    render :json => response_url('default')
  end

  def get_company_config
    if Options[:get_company_config][:hide_duration]
      @data = {:point_expiration_type => 135}
    else
      @data = {:point_expiration_type => 134}
    end
    # render :json => response_url('default')
    render 'companyConfig.json'
  end

  def get_department_list
    render :json => response_url('default')
  end

  def get_employee_info
    default_params
    render :json => response_url(@defaults[:employee_id])
  end

  def get_current_employee_info
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_employee_list
    render :json => response_url('default')
  end

  def emp_info
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_project_by_id
    default_params
    render :json => response_url(@defaults[:project_id])
  end

  def get_flat_project_list
    render :json => response_url('default')
  end

  def get_security_role_list
    render :json => response_url('default')
  end

  def get_fyi
    if RandomizeFYI
      @rows = Fixtures::Fyi::build_rows
      render "getFYI.json"
    else
      default_params
      render :json => response_url(@defaults[:employee_id])
    end
  end

  def get_punch_policies_list
    render :json => response_url('default')
  end

  def get_supervisor_list
    render :json => response_url('default')
  end

  def get_sec_rights_for_employee
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_time_sheet
    render :json => response_url('default')
  end

  def get_time_sheet_view_for_range
    render :json => response_url('default')
  end

  def get_employee_payroll
    default_params
    render :json => response_url(@defaults[:lookup_id])
  end

  def get_work_time_view_for_range
    render :json => response_url('default')
  end

  def get_point_cats
    render :json => response_url('default')
  end

  def is_authenticated
  end

  def get_user_preferences
    serve_default
  end

  def get_report_projects_api
    serve_default
  end

  def get_accrual_policies_list_api
    serve_default
  end

  # def type_option_code_list
  #   code = params.fetch(:code_type_id, 'default')
  #   code = code.to_s
  #   render :json => response_url(code)
  # end

  def change_login_credentials
    username = params.fetch(:username,nil)
    pass1 = params.fetch(:password, nil)
    pass2 = params.fetch(:oldpass, nil)
    @success = false
    if !pass1.nil? && !pass2.nil? && pass1 != pass2
      @success = true
    end
    @username = username
    render 'changeLoginCredentials.json'
  end

  def get_current_policy_info_plus
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_attendance_status
    default_params
    render :json => response_url(specific_emp)
  end

  def get_in_out_board
    default_params
    # render :json => response_url(@defaults[:emp_id])
    render :json => response_url('default')
  end

  def get_current_employee_default_project_code
    default_params
    # render :json => response_url(@defaults[:emp_id])
    render :json => response_url('default')
  end

  def get_category_map
    serve_default
  end

  def get_years
    serve_default
  end

  def get_accrual_policy
    render :json => response_url(params.fetch(:schedule_id,'default'))
  end

  def check_layoff_effective_date
    pass_fail
  end

  def toggle_employee_layoff
    serve_default
  end

  def get_company_history
    serve_default
  end


  def get_department_config
    default_params
    render :json => response_url(@defaults[:dept_id])
  end

  private

  def pass_fail
    action = params[:action]
    render :json => response_url(Responses[action][PassFail[action]])
  end

  def prepare_options
    @data = Options[:action]
  end

  def serve_default
    render :json => response_url('default')
  end

  ##
  # Enable login fail/pass simulation
  def set_login_mode
    if LoginMode.nil?
      @success = true
      @error = nil
    else
      @success = false
      @error = LoginErrors[LoginMode]
    end
  end

  ##
  # Enable ForgotPassword fail/pass simulation
  def set_recover_mode
    @success = (RecoverMode == :success)
    @error = RecoverErrors[RecoverMode]
  end

  def serve_default
    render :json => response_url('default')
  end

  def specific_emp
    params.fetch(:employee_id, 'default')
  end

  def default_params
    @defaults = {
      emp_id: params.fetch(:emp_id, 'default'),
      cust_id: params.fetch(:cust_id, nil),
      employee_id: params.fetch(:employee_id, 'default'),
      hashcookie: params.fetch(:hashcookie, nil),
      project_id: params.fetch(:project_id, 'default'),
      lookup_id: params.fetch(:lookup_id, 'default'),
      dept_id: params.fetch(:dept_id, 'default')
    }
    logger.info(@defaults)
  end
  
end
