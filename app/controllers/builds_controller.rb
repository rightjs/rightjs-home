class BuildsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  #caches_page :index
  
  def index
    # grabbing the custom build sizes for some javascript nice effects
    @build_sizes = {}
    
    Dir.open(RIGHTJS_BUILD_CUSTOM).each do |file_name|
      if file_name.starts_with?('right-')
        id = file_name.split('-').last.split('.').first
        @build_sizes[id] = File.size(RIGHTJS_BUILD_CUSTOM + "/" + file_name)
      end
    end
  end
  
  def show
    send_file(params[:id])
  end
  
  def create
    params[:options] ||= {}
    
    options = (RIGHTJS_BUILD_OPTIONS + ['compress']).map do |key|
      params[:options].has_key?(key) ? 1 : 0
    end
    
    send_file(options.join)
  end
  
protected
  def send_file(options)
    file_name = RIGHTJS_BUILD_CUSTOM + "/right-#{options}.js"
    
    raise NotFound unless File.exists?(file_name)
    
    super file_name, :type => "text/javascript; charset=utf-8", :stream => false, :filename => 'right.js'
  end
end
