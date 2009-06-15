class ApplicationController < ActionController::Base
  helper :all
  protect_from_forgery

  filter_parameter_logging :password
  
  include CodeHighlighter
  include CrossReferences
  include AuthenticatedSystem
  
protected
  

  class NotFound < StandardError; end
  
  rescue_from NotFound,                     :with => :render_not_found
  rescue_from ActiveRecord::RecordNotFound, :with => :render_not_found
  
  def render_not_found
    render "pages/not_found.html.erb", :status => 404
    
    false # filters default
  end
  
  
  #
  # Virtual units routes
  #
  
  def unit_path(unit)
    "/docs/#{unit.uri_name}"
  end
  
  def unit_method_path(method)
    "/docs/#{method.unit.uri_name}##{method.name}"
  end
  
  helper_method :unit_path, :unit_method_path
  
end
