class PunchesController < ApplicationController

  def submit_punch
    default_params
    render :json => response_url('default')
  end

  def get_current_punch_data
    serve_default
  end

  private


  def default_params
    @defaults = {
      emp_id: params.fetch(:emp_id, 'default'),
      cust_id: params.fetch(:cust_id, nil),
      employee_id: params.fetch(:employee_id, 'default'),
      hashcookie: params.fetch(:hashcookie, nil),
      project_id: params.fetch(:project_id, 'default')
    }
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
