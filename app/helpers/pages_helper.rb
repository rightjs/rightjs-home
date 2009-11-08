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
    content_tag(:h2,
      content_tag(:a, "top &uarr;", :href => "#", :class => "top-anchor")+
      content_tag(:a, title, :href => "##{key}"),
      :class => :chapter
    )
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
end
