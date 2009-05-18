# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
  
  include CodeHighlighter
  
protected
  

  class NotFound < StandardError; end
  
  rescue_from NotFound, :with => :render_not_found
  
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
  
  
  #
  # Documentation postprocessing
  #
  
  after_filter :hook_api_references
  
  def hook_api_references
    response.body.gsub! /\{([a-z]?)(\.|\#)([a-z]+)\}/i do
      replacement = $1.blank? ? "#{$3}" : "#{$1}#{$2}#{$3}"
      
      if unit = (Unit.find_by_name($1) || @unit) and
        method = unit.unit_methods.find_by_name($3)
        
        replacement = "<a href='/docs/#{unit.uri_name}##{method.name}'>#{replacement}</a>"
      end
      
      replacement
    end
  end
  
end
