#
# Just monkey the basic restful-authentication api
#
module AuthenticatedSystem
  
protected

  def current_user
    @current_user ||= (session_user || false)
  end
  
  def current_user=(user)
    @current_user = user
    session[:user_id] = user.id
  end
  
  def logout_current_user
    @current_user = session[:user_id] = nil
  end

  def session_user
    User.find_by_id(session[:user_id]) if session[:user_id]
  end
  
  def redirect_back_or_to(url)
    url = session[:return_point] || url
    session[:return_point] = nil
    
    redirect_to url
  end
  
  def login_required
    unless current_user
      session[:return_point] = request.send(request.get? ? :request_uri : :referer)
      redirect_to login_path
      return false
    end
  end
  
end