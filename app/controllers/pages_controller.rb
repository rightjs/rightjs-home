class PagesController < ApplicationController
  caches_page :show
  
  skip_before_filter :verify_authenticity_token
  
  def show
    @path = params[:path].blank? ? 'home' : params[:path].join('/')
    
    puts @path
    
    if @path == 'ui/in-edit/response'
      render :text => params[:text], :content_type => "text/html"
    elsif @path.ends_with?('move.html')
      # used in the sortable demo
      render :text => sortable_move_resopnse, :layout => false
    elsif @path.ends_with?('.js')
      # used in the autocompleter demo
      render :text => language_autocompleter_response, :layout => false
    else
      @file = "pages/#{@path}.html.erb"
      
      raise NotFound if !File.exists?("#{RAILS_ROOT}/app/views/#{@file}")
      
      render @file, :layout => request.xhr? ? false : 'application'
    end
  end
  
private
  #
  def sortable_move_resopnse
    %{
      <script type="text/javascript">
        $('moving-status').update("You moved <b>Item ##{params[:path][2]}</b> to the <b>#{(params[:position].to_i + 1)}</b> position");
      </script>
    }
  end

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
