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
    
    @filename.ends_with?('.md') ? Shmaruku.to_html(content) : content
  end
  
end