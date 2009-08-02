class PagesController < ApplicationController
  caches_page :show
  
  def show
    @path = params[:path].blank? ? 'home' : params[:path].join('/')
    @file = "pages/#{@path}.html.erb"
    
    raise NotFound if !File.exists?("#{RAILS_ROOT}/app/views/#{@file}")
    
    render @file, :layout => request.xhr? ? false : 'application'
  end
end
