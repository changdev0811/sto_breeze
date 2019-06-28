class ApplicationController < ActionController::API

    # def response_url(opt, action=nil)
    #     if action.nil?
    #         action = params['action']
    #     end
    #     # path = File.join(action,"#{opt}.json")
    #     # File.read(path)
    #     Dummy::JsonData.response_content(action,opt)
    # end

    ##
    # Generate url of response JSON file
    # @param {String} user User ID (used instead of opt if opt not defined)
    # @parma {String} opt Second path param, use user instead if user not needed
    # @param {String} action Action name; if not given, is automatically detected
    # @return {String} URL
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

    ##
    # Serve default.json for directory associated with method name
    def serve_default
        render :json => response_url('default')
    end

    ##
    # Automatically render result of response_url
    # @param {String} user User ID (used instead of opt if opt not defined)
    # @parma {String} opt Second path param, use user instead if user not needed
    # @param {String} action Action name; if not given, is automatically detected
    def serve_response(user, opt=nil, action=nil)
        content = response_url(user, opt, action)
        render :json => content
    end
        
end
