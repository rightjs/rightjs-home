class PagesController < ApplicationController
  caches_page :show
  
  skip_before_filter :verify_authenticity_token
  
  def show
    @path = params[:path].blank? ? 'index' : params[:path].join('/')
    
    if @path == 'ui/in-edit/response'
      
    elsif @path.ends_with?('move.html')
      # used in the sortable demo
      render :text => sortable_move_resopnse, :layout => false
    elsif @path.ends_with?('.js')
      # used in the autocompleter demo
      render :text => language_autocompleter_response, :layout => false
    elsif @page = Page.find_by_path(@path)
      render :text => @page.to_html(@template), :layout => request.xhr? ? false : 'application'
    else
      raise NotFound
    end
  end
  
  def mirror
    render :text => params[:text], :content_type => "text/html"
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
