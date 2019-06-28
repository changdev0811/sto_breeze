class CalendarController < ApplicationController

  Slow = {
    enabled: true,
    max: 2
  }

  Options = {
    force_emp: '5001b'
  }

  def get_calendar_events_for_category
    default_params
    category_id = params.fetch(:category_id, '65')
    # employee = @defaults[:employee_id]
    employee = params.fetch(:employee_id, params.fetch(:emp_id, 'default'))
    render :json => response_url(employee, category_id)
  end

  def json_calendar_events
    default_params
    #category_id = params.fetch(:category_id, '65')
    # employee = @defaults[:employee_id]
    employee = employee_option
    calendar = @defaults[:calendar]
    if Slow[:enabled]
      Random.rand(Slow[:max]+1).delay_then {
        render :json => response_url(employee, calendar)
      }
    else
      render :json => response_url(employee, calendar)
    end
  end
  private

  def employee_option
    if !Options[:force_emp].nil?
      Options[:force_emp]
    else
      params.fetch(:employee_id, params.fetch(:emp_id, 'default'))
    end
  end


  def serve_default
    render :json => response_url('default')
  end

  
  def default_params
    @defaults = {
      emp_id: params.fetch(:emp_id, 'default'),
      cust_id: params.fetch(:cust_id, nil),
      employee_id: params.fetch(:employee_id, 'default'),
      hashcookie: params.fetch(:hashcookie, nil),
      project_id: params.fetch(:project_id, 'default'),
      calendar: params.fetch(:calendar, 'default')
    }
    logger.info(@defaults)
  end

  def response_url(user, opt=nil, action=nil)
    if action.nil?
      action = params['action']
    end
    # path = File.join(action,"#{opt}.json")
    # File.read(path)
    if opt.nil?
      Dummy::JsonData.response_content(action,user)
    else
      Dummy::JsonData.response_content(action,opt,user)
    end
  end

end
