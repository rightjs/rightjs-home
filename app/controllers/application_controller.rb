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
    render :text => Page.find_by_path("not-found").to_html(@template), :layout => 'application', :status => 404
    
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
  # Languages swapping
  #
  before_filter :choose_language
  
  def choose_language
    basehost   = request.env['HTTP_HOST'].gsub /(#{RIGHTJS_LANGUAGES.join('|')})\./, ''
    
    @language  = nil
    @languages = {}
    
    RIGHTJS_LANGUAGES.each do |lang|
      @language = lang if is_current_language?(lang)
      
      @languages[lang] = "http://#{lang == 'en' ? '' : "#{lang}."}#{basehost}#{request.request_uri}"
    end
    
    @language ||= Internationable::DEFAULT_LANGUAGE
    
    Internationable.current_language = @language
    
    # in case someone for some reason used a path prefix
    if request.request_uri.starts_with?("/#{@language}/")
      params[:path].shift if params[:path].is_a?(Array)
      
      request.env['REQUEST_URI'].gsub! "/#{@language}/", '/'
      
      @languages.each do |key, value|
        value.gsub! "/#{@language}/", '/'
      end
    end
    
    I18n.locale = @language
  end
  
  def is_current_language?(lang)
    request.request_uri.starts_with?("/#{lang}/") || request.env['HTTP_HOST'].starts_with?("#{lang}.")
  end
  
end
