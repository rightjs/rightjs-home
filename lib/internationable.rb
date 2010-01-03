#
# A small module to work with units with multiple translations
#
#
module Internationable
  DEFAULT_LANGUAGE = RIGHTJS_DEFAULT_LANG
  
  def self.current_language
    defined?(@@current_language) ? @@current_language : DEFAULT_LANGUAGE
  end
  
  def self.current_language=(name)
    if RIGHTJS_LANGUAGES.include?(name)
      @@current_language = name
    end
  end
  
  def in_current_language(resource)
    lang  = Internationable.current_language
    items = send(resource.to_s.pluralize)
    items.detect{ |item| item.language == lang } || items.detect{ |item| item.language == DEFAULT_LANGUAGE }
  end
    
end