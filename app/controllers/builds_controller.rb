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
      if file_name =~ /\d+\.js/
        id = file_name.split('.').first
        @build_sizes[id] = File.size(RIGHTJS_BUILD_CUSTOM + "/" + file_name)
      end
    end
  end

  def show
    send_custom(params[:id])
  end

  def create
    params[:options] ||= {}

    options = (RIGHTJS_BUILD_OPTIONS + ['safe', 'minify']).map do |key|
      if key.starts_with?('no-')
        params[:options].has_key?(key.gsub('no-', '')) ? 0 : 1
      else
        params[:options].has_key?(key) ? 1 : 0
      end
    end

    send_custom(options.join)
  end

  def custom
    create
  end

  def current
    send_file "#{RIGHTJS_BUILD_CURRENT}/#{params[:id]}", :filename => params[:id]
  end

protected
  def send_custom(options)
    send_file "#{RIGHTJS_BUILD_CUSTOM}/#{options}.js", :filename => "right.js"
  end

  #
  # overloading the method, to count the downloads and all other fancy sort of things
  #
  def send_file(file, options={})
    raise NotFound unless File.exists?(file)

    record_download(file)

    if file.ends_with?('.zip')
      super file, :type => "application/zip"
    else
      # rails seems to screw with the content length a bit in here so we overload the thing
      # and send the script as a binary data
      headers.merge!(
        'Content-Type'              => "text/javascript; charset=utf-8",
        'Content-Disposition'       => "attachment; filename=#{options[:filename]}",
        'Content-Transfer-Encoding' => "binary"
      )

      render :text => File.read(file)
    end
  end

  def record_download(file)
    Download.create!({
      :filename   => File.basename(file),
      :version    => RIGHTJS_VERSION,
      :ip_address => request.remote_addr
    })
  end
end
