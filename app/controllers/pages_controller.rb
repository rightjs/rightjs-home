class PagesController < ApplicationController
  caches_page :show
  
  def show
    @path = params[:path].blank? ? 'home' : params[:path].join('/')
    
    if @path.ends_with?('.js')
      # used in the autocompleter demo
      render :text => language_autocompleter_response, :layout => false
    else
      @file = "pages/#{@path}.html.erb"
      
      raise NotFound if !File.exists?("#{RAILS_ROOT}/app/views/#{@file}")
      
      render @file, :layout => request.xhr? ? false : 'application'
    end
  end
  
private

  # the autocompelter demo response compiller
  def language_autocompleter_response
    search = params[:path].last.gsub(/\.js$/, '')
    regexp = /(#{Regexp.escape(search)})/i
    
    '<ul>'+
      LANGUAGES.select{|l| l =~ regexp }.map{ |lang|
        "<li>#{lang.gsub(regexp, '<strong>\\1</strong>')}</li>"
      }.join('')+
    '</ul>'
  end
  
  LANGUAGES = %w{
    Ruby
    Python
    Java
    JavaScript
    Scala
    Haskell
    Lisp
    Lua
    Perl
    Prolog
  }
end
