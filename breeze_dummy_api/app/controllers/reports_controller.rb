class ReportsController < ApplicationController

  # def submit_punch
  #   default_params
  #   render :json => response_url('default')
  # end

  def do_report
    report_params
    @kind = @params[:myReport]
    @content = [
      { pages: 1, current: 1, content: "<div>#{@kind}</div>" }
    ]
    render 'doReport.json'
  end

  def create_yaag_report_temp_table
    default_params
    @tablename = @defaults[:tablename]
    render 'createYAAGReportTempTable.json'
  end

  def yaag_to_temp_table
    default_params
    @tablename = @defaults[:tablename]
    render 'YAAGtoTempTable.json'
  end

  def get_report_list_api
    serve_default
  end

  private


  def default_params
    @defaults = {
      emp_id: params.fetch(:emp_id, 'default'),
      cust_id: params.fetch(:cust_id, nil),
      employee_id: params.fetch(:employee_id, 'default'),
      hashcookie: params.fetch(:hashcookie, nil),
      tablename: params.fetch(:tablename, nil)
    }
    # logger.info(@defaults)
  end

  def report_params
    @params = {
      myFormat: params.fetch(:myFormat, nil),
      myParameters: params.fetch(:myParameters, {}),
      myReport: params.fetch(:myReport, 'default')
    }
  end

  def report_response_url(kind, employee)
    Dummy::JsonData.response_content(action, employee, kind)
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
