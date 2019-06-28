class UploadsController < ApplicationController


    ##
    # Handle upload employee picture
    def upload_employee_picture

      # binding.pry

      create_params = profile_photo_params
      if !create_params.fetch(:has_picture, true) ||
        create_params.fetch(:photo_upload, nil).nil?
          create_params.delete(:photo_upload)
          create_params[:has_picture] = false
      end

      # binding.pry

      @emp_photo = EmployeePhoto.new(create_params)

      # binding.pry

      cust = create_params.fetch(:cust_id, "0")
      emp = create_params.fetch(:emp_id, "0")
      employee = create_params.fetch(:employee_id, "0")

      @response_data = { success: false, message: 'error', extra: nil }

      if @emp_photo.save
        @response_data = {
          success: true,
          message: 'resources/EmployeePhotos/#{cust}/#{employee}tmp#{emp}#{extension}',
          extra: nil
        }
        @response_data[:extra] = @emp_photo.photo_upload.url unless @emp_photo.photo_upload.nil?

        p 'Saved Employee Picture'
        p @emp_photo
        p @emp_photo.photo_upload.url

        logger.info 'Saved Employee Picture'
        logger.info @emp_photo.to_s
        logger.info 'URL: ' + @emp_photo.photo_upload.url
      end

      # binding.pry

      render 'uploadEmployeePicture.json'

    end


    private

    ##
    # Set strong parameters for profile photo upload call
    def profile_photo_params
      params.permit(
        :extension,
        #:picture_modified,
        #:hashcookie,
        :emp_id,
        :cust_id,:employee_id,:has_picture, :photo_upload
      )
    end


end
