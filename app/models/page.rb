#
# A fake model, handles the static pages finding/rendering
#
class Page
  
  def self.find_by_path(path)
    dirname  = "#{Rails.root}/app/views/pages/"
    
    filename = [
      "#{dirname}#{Internationable.current_language}/#{path}.md",
      "#{dirname}#{Internationable::DEFAULT_LANGUAGE}/#{path}.md",
      "#{dirname}#{Internationable.current_language}/#{path}.html.erb",
      "#{dirname}#{Internationable::DEFAULT_LANGUAGE}/#{path}.html.erb"
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
    
    content = Shmaruku.to_html(content) if @filename.ends_with?('.md')
    
    # highjacking the page title
    title = content.match(/\A<h1>(.+?)<\/h1>/)
    template.instance_variable_set("@title_text", title[1]) if title && !template.instance_variable_get("@title_text")
    
    content
  end
  
end