#
# Just simple parser to highlight the JavaScript code snippets
#
module CodeHighlighter
  def self.included(base)
    base.instance_eval do
      after_filter :hightlight_code
    end
  end

protected

  JAVASCRIPT_HIGHLIGHTS = [
    # comments
    [/(.?)(\/\/.*?)($)/,   '<i>\2</i>\3'],
    [/(.?)(\/\*.*?\*\/)/m, '<i>\2</i>'],
    
    # strings
    [/(\A|[^\\])(('|")(\3))/,         '<s>\2</s>'],
    [/(\A|[^\\])(('|").*?[^\\](\3))/, '<s>\2</s>'],
    
    # regexps
    [/([^\*\\\/])(\/[^\*\/][^\n]*?[^\*\n\\](?!\\\/)\/)/, '<s class="re">\2</s>'],
    
    # numbers
    [/([^'"\d\w\.])([\d]+)(?!['"\d\w\.])/,    '<s class="int">\2</s>'],
    [/([^'"\d\w\.])(\d*\.\d+)(?!['"\d\w\.])/, '<s class="float">\2</s>'],
    
    # hash keys
    [/([^a-z0-9_])([a-z0-9_]+)(:)/i, '<s class="key">\2</s>\3'],
    
    # keywords
    [/([^a-z0-9_]|^)(function|return|for|if|else|while|do|throw|try|catch)(?![a-z0-9_])/, '<b>\2</b>'],
    [/([^a-z0-9_]|^)(var|new|this|self)(?![a-z0-9_])/,          '<b class="var">\2</b>'],
    [/([^a-z0-9_]|^)(true|false|null|undefined)(?![a-z0-9_])/, '<b class="rest">\2</b>'],
    
    # classes
    [/([^a-zA-Z0-9_]|^)([A-Z][a-zA-Z_0-9]+)(?![a-zA-Z0-9_])/, '<b class="unit">\2</b>'],
    
    # attributes and methods
    [/(\.)([a-z_][a-z0-9_]*)(?![a-z0-9_\(])/i, '<u>\2</u>'],
    [/(\.)([a-z_][a-z0-9_]*)(\()/i, '<u class="method">\2</u>\3']
  ]

  def hightlight_code
    response.body.gsub! /(<code>)(.+?)(<\/code>)/im do
      code = $2.gsub("<", "&lt;").gsub(">", "&gt;")
      
      # in order to make it pretty and safely we do it in two steps
      # replace the blocks by placeholders during the parse and then
      # get replacements back after parsing is done
      
      replacements = []
      
      JAVASCRIPT_HIGHLIGHTS.each do |re, template|
        code.gsub! re do
          
          # you need that dups if you need to manipulate with the variables several times
          one = $1.dup
          two = $2.dup
          three = $3 ? $3.dup : nil
          
          replacements << template.gsub('\2', "#{two}").gsub('\3', "#{three}")
          
          "#{one}----{-}--ww#{replacements.size}ww--{-}----"
        end
      end
      
      replacements.each_with_index do |replacement, index|
        code.gsub! "----{-}--ww#{index+1}ww--{-}----", replacement
      end
      
      
      # the stupid browsers support
      code = code.strip.gsub("\n", "<br/>")
      
      "<code>#{code}</code>"
    end
  end
end