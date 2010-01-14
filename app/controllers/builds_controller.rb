class BuildsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  caches_page :index
  caches_page :scripts
  
  def index
    params[:path] = ['builds']
    render :text => Page.find_by_path("builds").to_html(@template), :layout => 'application'
  end
  
  def scripts
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
    send_custom(params[:id])
  end
  
  def create
    params[:options] ||= {}
    
    options = (RIGHTJS_BUILD_OPTIONS.collect{|o| o.gsub(/^no\-/, '')} + ['build', 'compress']).map do |key|
      params[:options].has_key?(key) ? 1 : 0
    end
    
    send_custom(options.join)
  end
  
  def custom
    create
  end
  
  def current
    send_file "#{RIGHTJS_BUILD_CURRENT}/#{params[:id]}", params[:id]
  end
  
protected
  def send_custom(options)
    send_file "#{RIGHTJS_BUILD_CUSTOM}/right-#{options}.js", "right.js"
  end
  
  def send_file(file, filename)
    raise NotFound unless File.exists?(file)
    
    record_download(file)
    
    content_type = file.ends_with?('.zip') ? "application/zip" : "text/javascript; charset=utf-8"
    
    super file, :type => content_type, :stream => false, :filename => filename
  end
  
  def record_download(file)
    Download.create!({
      :filename   => File.basename(file),
      :version    => RIGHTJS_VERSION,
      :ip_address => request.remote_addr
    })
  end
end
