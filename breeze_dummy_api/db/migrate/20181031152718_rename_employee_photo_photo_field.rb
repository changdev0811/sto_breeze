class RenameEmployeePhotoPhotoField < ActiveRecord::Migration[5.1]
  def change
    rename_column :employee_photos, :photo, :photo_upload
  end
end
