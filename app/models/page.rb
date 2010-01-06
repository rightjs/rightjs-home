#
# A fake model, handles the static pages finding/rendering
#
class Page
  
  def self.find_by_path(path)
    dirname_view  = "#{Rails.root}/app/views/pages/"
    dirname_docs  = "#{Rails.root}/docs/"
    
    filename = [
      "#{dirname_docs}#{Internationable.current_language}/#{path}.md",
      "#{dirname_docs}#{Internationable::DEFAULT_LANGUAGE}/#{path}.md",
      "#{dirname_view}#{Internationable.current_language}/#{path}.html.erb",
      "#{dirname_view}#{Internationable::DEFAULT_LANGUAGE}/#{path}.html.erb"
    ].detect do |filename|
      File.exists?(filename)
    end
    
    self.new(filename) if filename
  end
  
  def initialize(filename)
    @filename = filename
  end
  
  def to_html(template)
    content = template.render(:inline => File.read(@filename))
    
    if @filename.ends_with?('.md')
      # rebuilding the chapter blocks
      content.gsub! /##\s+(.+?),\s+\:([a-z0-9\-_]+)/ do |match|
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