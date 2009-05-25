# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require(File.join(File.dirname(__FILE__), 'config', 'boot'))

require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

require 'tasks/rails'

require File.dirname(__FILE__) + "/config/environment"

namespace :rightjs do
  
  RIGHTJS_ROOT = "#{RAILS_ROOT}/lib/right_js"
  
  desc 'Updates documentation and build'
  task :update do
    
  end
  
  desc 'Updates the units database out of the RightJS source repository'
  task :update_docs do
    puts "Rebuilding documentation\n\n"
    
    require 'rdoc/markup/simple_markup'
    require 'rdoc/markup/simple_markup/to_html'

    p = SM::SimpleMarkup.new
    
    def p.to_html(source)
      self.convert(source, SM::ToHtml.new).
        gsub("&quot;", '"'). # getting quotes back
        gsub("<p>\n&lt;code&gt;\n</p>\n<pre>", "<code>").
        gsub("</pre>\n<p>\n&lt;/code&gt;\n</p>", "</code>").
        gsub(/(<code>)(.+?)(<\/code>)/im) {
          "#{$1}#{$2.gsub("\n  ", "\n")}</code>"
        }
    end
    
    Unit.destroy_all
    UnitMethod.destroy_all
    
    FileList["#{RIGHTJS_ROOT}/doc/**/*.rd"].each do |file_name|
      name = File.basename(file_name).split('.rd').first.split('.').collect(&:capitalize).join('.')
      
      puts " * #{name}"
      
      pack = file_name.split('doc/api/').last.split("/#{name}").first
      
      source = File.read(file_name)
      
      methods = source.split('###')
      
      description = p.to_html(methods.shift.strip)
      
      unit = Unit.create({
        :name => name,
        :package => pack,
        :description => description
      })
      
      methods.each do |method|
        method = method.split('== Semantic')
        name = method.shift.strip
        type = name.include?('.') ? 'class' : name.include?('#') ? 'instance' : 'global'
        name = type == 'global' ? name : name.split(/\.|#/).last
        
        method = method.first.split('== Description')
        semantic = method.shift.strip.gsub(/\n  /, "\n")
        
        method = method.first.split('== Example')
        description = p.to_html(method.shift.strip.gsub(/\n  /, "\n"))
        
        example = method.blank? ? '' : method.shift.strip.gsub(/\n  /, "\n")
        
        method = UnitMethod.create({
          :unit        => unit,
          :type        => type,
          :name        => name,
          :semantic    => semantic,
          :description => description,
          :example     => example
        })
      end
    end
    
    FileUtils.rm_rf "#{RAILS_ROOT}/public/docs"
    
    puts "\nDone\n"
  end
  
  desc 'Updates the rightjs build'
  task :update_build do
    
  end
end

