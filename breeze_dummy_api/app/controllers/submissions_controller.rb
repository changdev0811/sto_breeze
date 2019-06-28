class SubmissionsController < ApplicationController
  SETTINGS = {
    update_employee: { succeed: true }
  }

  def update_employee
    settings = get_settings
    @success = settings[:succeed]
    render 'updateEmployee'
  end


  private
  def get_settings
    SETTINGS.fetch(params[:action].to_sym, {})
  end

  def default_response
    default_params
    render :json => response_url(@defaults[:emp_id])
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
      lookup_id: params.fetch(:lookup_id, 'default')
    }
    settings = get_settings
    unless settings.fetch(:use_emp, true)
      @defaults[:emp_id] = 'default'
    end
    logger.info(@defaults)
  end

  def response_url(opt, action=nil)
    if action.nil?
      action = params['action']
    end
    # path = File.join(action,"#{opt}.json")
    # File.read(path)
    Dummy::JsonData.response_content(action,opt)
  end
end
