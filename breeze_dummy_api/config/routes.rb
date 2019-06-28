Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/STOServe/Service1.asmx' do
    post 'getEmployeeCounts' => 'calls#get_employee_counts', defaults: {format: :json}
    post 'getLoginServerUrl' => 'calls#get_login_server_url', defaults: {format: :json}
    post 'getAccess' => 'calls#get_access', defaults: {format: :json}
    post 'getAccrualPoliciesList' => 'calls#get_accrual_policies_list', defaults: {format: :json}
    post 'getCompanyConfig' => 'calls#get_company_config', defaults: {format: :json}
    post 'getDepartmentList' => 'calls#get_department_list', defaults: {format: :json}
    post 'emp_info' => 'calls#emp_info', defaults: {format: :json}
    post 'getEmployeeInfo' => 'calls#get_employee_info', defaults: {format: :json}
    post 'getCurrentEmployeeInfo' => 'calls#get_current_employee_info', defaults: {format: :json}
    post 'getEmployeeList' => 'calls#get_employee_list', defaults: {format: :json}
    post 'getFlatProjectList' => 'calls#get_flat_project_list', defaults: {format: :json}
    post 'getSecurityRoleList' => 'calls#get_security_role_list', defaults: {format: :json}
    post 'getFYI' => 'calls#get_fyi', defaults: {format: :json}
    post 'getPunchPoliciesList' => 'calls#get_punch_policies_list', defaults: {format: :json}
    post 'getProjectByID' => 'calls#get_project_by_id', defaults: {format: :json}
    post 'getSupervisorList' => 'calls#get_supervisor_list', defaults: {format: :json}
    post 'GetTimeSheet' => 'calls#get_time_sheet', defaults: {format: :json}
    post 'GetTimeSheetViewForRange' => 'calls#get_time_sheet_view_for_range', defaults: {format: :json}
    post 'getEmployeePayroll' => 'calls#get_employee_payroll', defaults: {format: :json}
    post 'GetWorkTimeViewForRange' => 'calls#get_work_time_view_for_range', defaults: {format: :json}
    post 'isAuthenticated' => 'calls#is_authenticated', defaults: {format: :json}
    post 'login' => 'calls#login', defaults: {format: :json}
    post 'logOut' => 'calls#logout', defaults: {format: :json}
    post 'ForgotPassword' => 'calls#forgot_password', defaults: {format: :json}
    post 'getSecRightsForEmployee' => 'calls#get_sec_rights_for_employee', defaults: {format: :json}
    post 'changeLoginCredentials' => 'calls#change_login_credentials', defaults: {format: :json}
    post 'getPunchPolicyForEmp' => 'calls#get_punch_policy_for_emp', defaults: {format: :json}
    post 'getInOutBoard' => 'calls#get_in_out_board', defaults: {format: :json}
    post 'getCurrentEmployeeDefaultProjectCode' => 'calls#get_current_employee_default_project_code', defaults: {format: :json}
    post 'getCurrentPolicyInfo_Plus' => 'calls#get_current_policy_info_plus', defaults: {format: :json}
    post 'GetAttendanceStatus' => 'calls#get_attendance_status', defaults: {format: :json}
    post 'getCategoryMap' => 'calls#get_category_map', defaults: {format: :json}
    post 'getCalendarEventsForCategory' => 'calendar#get_calendar_events_for_category', defaults: { format: :json }
    post 'JSONCalendarEvents' => 'calendar#json_calendar_events', defaults: { format: :json }
    # options
    post 'typeOptionCodeList' => 'options#type_option_code_list', defaults: {format: :json}
    post 'getYears' => 'options#get_years', defaults: {format: :json}
    # punches
    post 'SubmitPunch' => 'punches#submit_punch', defaults: {format: :json}
    # reporting
    post 'createYAAGReportTempTable' => 'reports#create_yaag_report_temp_table', defaults: { format: :json}
    post 'YAAGtoTempTable' => 'reports#yaag_to_temp_table', defaults: { format: :json}
    post 'doReport' => 'reports#do_report', defaults: { format: :json}
    # trees
    post 'getUDCTree' => 'trees#get_udc_tree', defaults: { format: :json }
    post 'getUDCListAPI' => 'trees#get_udc_list_api', defaults: { format: :json }
    post 'getReportEmployees' => 'trees#get_report_employees', defaults: { format: :json }
    post 'getReportDepartments' => 'trees#get_report_departments', defaults: { format: :json }
    post 'getReportProjects' => 'trees#get_report_projects', defaults: { format: :json }
    post 'getReportTree' => 'trees#get_report_tree', defaults: { format: :json }
    post 'getReportProjectsAPI' => 'trees#get_report_projects_api', defaults: { format: :json }
    post 'getEmployeeListAPI' => 'trees#get_employee_list_api', defaults: { format: :json }
    post 'getDepartmentListAPI' => 'trees#get_department_list_api', defaults: { format: :json }
    post 'getEmployeeTree' => 'trees#get_employee_tree', defaults: { format: :json }
    post 'getDepartmentTree' => 'trees#get_department_tree', defaults: { format: :json }

    # updating
    post 'updateEmployee' => 'submissions#update_employee', defaults: { format: :json }

    # Point cats
    post 'getPointCats' => 'calls#get_point_cats', defaults: {format: :json}
    post 'getPointCatTreeReports' => 'trees#get_point_cat_tree_reports', defaults: {format: :json}
    post 'getPointCatTree' => 'trees#get_point_cat_tree', defaults: {format: :json}
		post 'getReportProjectsAPI' => 'calls#get_report_projects_api', defaults: {format: :json}
		post 'getReportListAPI' => 'reports#get_report_list_api', defaults: {format: :json}

		post 'getAccrualPolicy' => 'calls#get_accrual_policy', defaults: {format: :json}
		post 'getAccrualPoliciesListAPI' => 'calls#get_accrual_policies_list_api', defaults: {format: :json}
		post 'CheckLayoffEffectiveDate' => 'calls#check_layoff_effective_date', defaults: {format: :json}
		post 'ToggleEmployeeLayoff' => 'calls#toggle_employee_layoff', defaults: {format: :json}
		post 'getCompanyHistory' => 'calls#get_company_history', defaults: {format: :json}
		# post 'getDepartmentOnlyListAPI' => 'calls#get_department_only_list_api', defaults: {format: :json}
		post 'getDepartmentConfig' => 'calls#get_department_config', defaults: {format: :json}
		post 'getPointCatTree' => 'trees#get_point_cat_tree', defaults: {format: :json}
		post 'getProjectTree' => 'trees#get_project_tree', defaults: {format: :json}
		post 'getPointCatListAPI' => 'admin#get_point_cat_list_api', defaults: {format: :json}
		post 'getUDCPointsListAPI' => 'admin#get_udc_points_list_api', defaults: {format: :json}
		post 'canDeleteEmployee' => 'employees#can_delete_employee', defaults: {format: :json}
		post 'deleteEmployee' => 'employees#delete_employee', defaults: {format: :json}
		post 'getPunchPoliciesTree' => 'trees#get_punch_policies_tree', defaults: {format: :json}
		post 'getPunchPoliciesListAPI' => 'admin#get_punch_policies_list_api', defaults: {format: :json}
		post 'getAccrualPoliciesListAPI' => 'admin#get_accrual_policies_list_api', defaults: {format: :json}
		post 'getRolesTree' => 'trees#get_roles_tree', defaults: {format: :json}
		post 'getSecRightsTree' => 'trees#get_sec_rights_tree', defaults: {format: :json}
		post 'getSecRightsListAPI' => 'admin#get_sec_rights_list_api', defaults: {format: :json}
		post 'getAccrualPoliciesTree' => 'trees#get_accrual_policies_tree', defaults: {format: :json}
		post 'UpdateSupervisorRole' => 'admin#update_supervisor_role', defaults: {format: :json}
		post 'AddSupervisorRole' => 'admin#add_supervisor_role', defaults: {format: :json}
		post 'getRolesListAPI' => 'admin#get_roles_list_api', defaults: {format: :json}
		post 'saveMOTD' => 'admin#save_motd', defaults: {format: :json}
		post 'getMOTD' => 'admin#get_motd', defaults: {format: :json}
		post 'getEmployeeOnlyTreeDeleted' => 'admin#get_employee_only_tree_deleted', defaults: {format: :json}
		post 'readSTIMessage' => 'admin#read_sti_message', defaults: {format: :json}
		post 'CheckSupervisorRole' => 'admin#check_supervisor_role', defaults: {format: :json}
		post 'DeleteSupervisorRole' => 'admin#delete_supervisor_role', defaults: {format: :json}
		post 'reorderCategories' => 'admin#reorder_categories', defaults: {format: :json}
		post 'getCustomerInfo' => 'admin#get_customer_info', defaults: {format: :json}
		post 'getTimeZoneList' => 'options#get_time_zone_list', defaults: {format: :json}
		post 'getTimeKronStatus' => 'admin#get_time_kron_status', defaults: {format: :json}
		post 'restoreEmployee' => 'admin#restore_employee', defaults: {format: :json}
		post 'addPointCategory' => 'admin#add_point_category', defaults: {format: :json}
		post 'deletePointCategory' => 'admin#delete_point_category', defaults: {format: :json}
		post 'updatePointCategory' => 'admin#update_point_category', defaults: {format: :json}
		post 'getProjectListAPI' => 'admin#get_project_list_api', defaults: {format: :json}
		post 'addProject' => 'admin#add_project', defaults: {format: :json}
		post 'removeProject' => 'admin#remove_project', defaults: {format: :json}
		post 'UpdateProjectInformation' => 'admin#update_project_information', defaults: {format: :json}
		post 'GetHolidaysForYear' => 'admin#get_holidays_for_year', defaults: {format: :json}
		post 'appendHolidaysToYear' => 'admin#append_holidays_to_year', defaults: {format: :json}
		post 'ApplyHolidayToEmployees' => 'admin#apply_holiday_to_employees', defaults: {format: :json}
		post 'EditHoliday' => 'admin#edit_holiday', defaults: {format: :json}
		post 'DeleteHoliday' => 'admin#delete_holiday', defaults: {format: :json}
		post 'addPunchPolicy' => 'admin#add_punch_policy', defaults: {format: :json}
		post 'removePunchPolicy' => 'admin#remove_punch_policy', defaults: {format: :json}
		post 'UpdatePunchPolicyInformation' => 'admin#update_punch_policy_information', defaults: {format: :json}
		post 'getPunchPolicyEmployees' => 'admin#get_punch_policy_employees', defaults: {format: :json}
		post 'applyPunchPolicyToEmployees' => 'admin#apply_punch_policy_to_employees', defaults: {format: :json}
		post 'getSupervisorsbyDept' => 'admin#get_supervisorsby_dept', defaults: {format: :json}
		post 'getEmployeeOnlyListByDeptAPI' => 'admin#get_employee_only_list_by_dept_api', defaults: {format: :json}
		post 'canDeleteDept' => 'admin#can_delete_dept', defaults: {format: :json}
		post 'removeDept' => 'admin#remove_dept', defaults: {format: :json}
		post 'createDept' => 'admin#create_dept', defaults: {format: :json}
    post 'updateDept' => 'admin#update_dept', defaults: {format: :json}
    
    scope module: 'administrator' do 
      post 'isCategoryNameInUse' => 'udc#is_category_name_in_use', defaults: {format: :json}
      post 'isCategoryInUse' => 'udc#is_category_in_use', defaults: {format: :json}
      post 'removeCategory' => 'udc#remove_category', defaults: {format: :json}
      post 'UpdateCategory' => 'udc#update_category', defaults: {format: :json}
      post 'createCategory' => 'udc#create_category', defaults: {format: :json}
      post 'getUDCListAPI' => 'udc#get_udc_list_api', defaults: {format: :json}
			post 'createAccrualPolicy' => 'accrual_policies#create_accrual_policy', defaults: {format: :json}
			post 'canDeleteAccrualPolicy' => 'accrual_policies#can_delete_accrual_policy', defaults: {format: :json}
			post 'deleteAccrualPolicy' => 'accrual_policies#delete_accrual_policy', defaults: {format: :json}
			post 'getAccrualPolicyEmployeesAndCategories' => 'accrual_policies#get_accrual_policy_employees_and_categories', defaults: {format: :json}
			post 'applyAccrualPolicyProgress' => 'accrual_policies#apply_accrual_policy_progress', defaults: {format: :json}
			post 'saveAccrualPolicy' => 'accrual_policies#save_accrual_policy', defaults: {format: :json}
			post 'getAccrualPolicyCategory' => 'accrual_policies#get_accrual_policy_category', defaults: {format: :json}
    end

		post 'getUserPreferences' => 'calls#get_user_preferences', defaults: {format: :json}
		post 'getDepartmentStaff' => 'employees#get_department_staff', defaults: {format: :json}
    post 'getEmpShiftTime' => 'employees#get_emp_shift_time', defaults: {format: :json}
    
    # leave requests
    post 'addLeaveRequestDay' => 'leave_requests#add_leave_request_day', defaults: {format: :json}
    post 'createLeaveRequest' => 'leave_requests#create_leave_request', defaults: {format: :json}
    post 'deleteLeaveRequest' => 'leave_requests#delete_leave_request', defaults: {format: :json}
    post 'deleteLeaveRequestDay' => 'leave_requests#delete_leave_request_day', defaults: {format: :json}
    post 'employeeCancelLeaveRequest' => 'leave_requests#employee_cancel_leave_request', defaults: {format: :json}
    post 'employeeRenameLeaveRequest' => 'leave_requests#employee_rename_leave_request', defaults: {format: :json}
    post 'employeeSubmitLeaveRequest' => 'leave_requests#employee_submit_leave_request', defaults: {format: :json}
    post 'getLeaveRequestDays' => 'leave_requests#get_leave_request_days', defaults: {format: :json}
    post 'getLeaveRequestsforEmployee' => 'leave_requests#get_leave_requestsfor_employee', defaults: {format: :json}
    post 'updateLeaveRequestEvent' => 'leave_requests#update_leave_request_event', defaults: {format: :json}
    post 'validateLeaveRequestDay' => 'leave_requests#validate_leave_request_day', defaults: {format: :json}
		post 'employeeLeaveRequestChangeNotes' => 'leave_requests#employee_leave_request_change_notes', defaults: {format: :json}
		post 'getCurrentPunch_Data' => 'punches#get_current_punch_data', defaults: {format: :json}
		post 'checkUsername' => 'employees#check_username', defaults: {format: :json}
		post 'getCategoryAdjustInfo' => 'employee_accrual#get_category_adjust_info', defaults: {format: :json}
		post 'getCategoryPointinTime' => 'employee_accrual#get_category_point_in_time', defaults: {format: :json}
		post 'saveEmployeeCategoryAdjust' => 'employee_accrual#save_employee_category_adjust', defaults: {format: :json}
		post 'getRecYears' => 'employee_accrual#get_rec_years', defaults: {format: :json}
  end

  # uploading
  post '/STOServe/uploadEmployeePicture.ashx' => 'uploads#upload_employee_picture', defaults: { format: :json }


end