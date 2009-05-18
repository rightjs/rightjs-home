class DocsController < ApplicationController
  
  def show
    @unit = Unit.find_by_uri_name(params[:path])
    
    raise NotFound if ! @unit
  end
  
end
