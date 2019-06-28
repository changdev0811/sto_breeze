class EmployeePhoto < ApplicationRecord
    mount_uploader :photo_upload, EmployeePhotoUploader
    # photo:string
    # cust_id, emp_id, employee_id, extension (string)
    # has_picture (boolean)
end
