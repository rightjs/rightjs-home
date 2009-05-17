# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
  
protected

  class NotFound < StandardError; end
  
  rescue_from NotFound, :with => :render_not_found
  
  def render_not_found
    render "pages/not_found.html.erb", :status => 404
    
    false # filters default
  end
end
