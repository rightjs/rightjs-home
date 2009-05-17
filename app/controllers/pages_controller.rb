class PagesController < ApplicationController
  
  def show
    @path = params[:path].blank? ? 'home' : params[:path].join('/')
    @file = "pages/#{@path}.html.erb"
    
    raise NotFound if !File.exists?("#{RAILS_ROOT}/app/views/#{@file}")
    
    render @file
  end
end
