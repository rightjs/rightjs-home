class DocsController < ApplicationController
  caches_page :show
  caches_page :search
  
  def show
    @unit = Unit.find_by_uri_name(params[:path])
    
    raise NotFound if ! @unit
  end
  
  # catches the autocompleter list
  def search
    sleep 2
    @methods = UnitMethod.all({
      :conditions => ["name LIKE ?", "%#{params[:search].blank? ? '+' : params[:search]}%"],
      :limit => 10
    })
  end
  
end
