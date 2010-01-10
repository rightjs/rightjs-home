module PagesHelper
  def tutorial_path(name)
    "/tutorials/#{name}"
  end
  
  #
  # Generates a documentation chapter title and stores the title and key
  # for futher index generator
  #
  def chapter(title, key)
    @anchors ||= []
    @anchors << [title, key]
    
    content_tag(:a, '', :name => key)+
    "\n<h2 class='chapter'>\n  "+
      content_tag(:a, "top &uarr;", :href => "#", :class => "top-anchor")+
      content_tag(:a, title, :href => "##{key}")+
    "\n</h2>"
  end
  
  ANCHORS_INDEX_PLACEHOLDER = '<!-- anchors index will be here -->'
  
  #
  # On the first run this method just puts a placeholder then at the layout
  # it will call the next method and insert the actual indexes block
  #
  def anchors_index
    ANCHORS_INDEX_PLACEHOLDER
  end
  
  def insert_anchors_index(content)
    if @anchors
      content.gsub! ANCHORS_INDEX_PLACEHOLDER, 
        content_tag(:h2, "<a href='#'>Index</a>", :class => :chapter)+
        content_tag(:p, 
          content_tag(:ul,
            @anchors.collect{ |pair|
              content_tag(:li,
                content_tag(:a, pair.first, :href => "##{pair.last}")
              )
            }
          )
        )
    end
    
    content
  end
  
  
  #
  # Renders the partial template inside of markdown files
  #
  def partial(name, options={})
    p "pages/#{params[:path].join("/")}/#{name}.html.erb"
    
    render options.merge(:partial => "pages/#{params[:path].join("/")}/#{name}.html.erb")
  end
  
  def contact_email
    %Q{<a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#105;&#110;&#102;&#111;&#064;&#114;&#105;&#103;&#104;&#116;&#106;&#115;&#046;&#111;&#114;&#103;">&#105;&#110;&#102;&#111;&#064;&#114;&#105;&#103;&#104;&#116;&#106;&#115;&#046;&#111;&#114;&#103;</a>}
  end
end
