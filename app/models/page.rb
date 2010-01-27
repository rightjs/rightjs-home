#
# A fake model, handles the static pages finding/rendering
#
class Page
  
  def self.find_by_path(path)
    dirname_view  = "#{RIGHTJS_SRC_DOCS}/com"
    dirname_docs  = "#{RIGHTJS_SRC_DOCS}"
    
    filename = [
      "#{dirname_docs}/#{Internationable.current_language}/#{path}.md",
      "#{dirname_docs}/#{Internationable::DEFAULT_LANGUAGE}/#{path}.md",
      "#{dirname_view}/#{path}.html.erb"
    ].detect do |filename|
      File.exists?(filename)
    end
    
    puts [
      "#{dirname_docs}/#{Internationable.current_language}/#{path}.md",
      "#{dirname_docs}/#{Internationable::DEFAULT_LANGUAGE}/#{path}.md",
      "#{dirname_view}/#{path}.html.erb"
    ]
    
    puts filename
    
    
    
    self.new(filename) if filename
  end
  
  def initialize(filename)
    @filename = filename
  end
  
  def to_html(template)
    content = template.render(:inline => File.read(@filename))
    
    if @filename.ends_with?('.md')
      # rebuilding the chapter blocks
      content.gsub! /##\s+(.+?),\s+\:([a-z0-9\-_]+)/i do |match|
        template.chapter($1.dup, $2.dup)
      end
      
      content = Shmaruku.to_html(content)
    end
    
    # highjacking the page title
    unless template.instance_variable_get("@title_text")
      title = content.match(/\A<h1>(.+?)<\/h1>/)
      template.instance_variable_set("@title_text", title[1]) if title
    end
    
    content
  end
  
end