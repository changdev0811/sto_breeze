
class TreesController < ApplicationController
  
  SETTINGS = {
    get_udc_tree: { use_emp: false },
    get_report_employees: { use_emp: false },
    get_report_departments: { use_emp: false},
    get_report_projects: { use_emp: false},
    get_udc_list_api: { use_emp: false },
    get_employee_list_api: { use_emp: false },
    get_department_list_api: { use_emp: false },
    get_report_projects_api: { use_emp: false },
    get_report_tree: { use_emp: false },
    get_employee_tree: { use_emp: false },
    get_department_tree: { use_emp: false },
    get_point_cat_tree: { use_emp: false },
    get_point_cat_tree_reports: { use_emp: false }
  }

  ##
  #
  # params: 
  # cust_id: "991012"
  #    emp_id: "5001"
  #    hashcookie: "d18c7bfbd734a8f4a91e70491debe1fc"
  #    leave_request_only: 0
  #    node: "root"
  #    offset: 240
  def get_udc_tree
      default_params
      render :json => response_url(@defaults[:emp_id])
  end

  def get_udc_list_api
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_report_employees
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_report_departments
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_report_projects
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_report_projects_api
    default_params
    render :json => response_url(@defaults[:emp_id])
  end

  def get_point_cat_tree
    default_response
  end

  def get_point_cat_tree_reports
    default_response
  end

  ## for employees panel  
  def get_employee_list_api
    default_params
    actions = (@defaults[:includeActions])
    if actions
      @defaults[:emp_id] = @defaults[:emp_id].gsub('default', 'default-actions')
    else
      @defaults[:emp_id] = @defaults[:emp_id].gsub('default', 'default-noactions')
    end
    render :json => response_url(@defaults[:emp_id])
  end

  ## for employees panel
  def get_department_list_api
    default_params
    actions = (@defaults[:includeActions])
    if actions
      @defaults[:emp_id] = @defaults[:emp_id].gsub('default', 'default-actions')
    else
      @defaults[:emp_id] = @defaults[:emp_id].gsub('default', 'default-noactions')
    end
    render :json => response_url(@defaults[:emp_id])
  end

  def get_report_tree
    serve_default
  end

  def get_department_tree
    serve_default
  end

  def get_employee_tree
    serve_default
  end

  def get_project_tree
    serve_default
  end

  def get_roles_tree
    serve_default
  end

  def get_sec_rights_tree
    serve_default
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
      lookup_id: params.fetch(:lookup_id, 'default'),
      includeActions: params.fetch(:includeActions, false)
    }
    settings = get_settings
    unless settings.fetch(:use_emp, true)
      @defaults[:emp_id] = 'default'
    end
    if settings.fetch(:use_new, false)
      @defaults[:emp_id] = "#{@defaults[:emp_id]}-new"
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
  