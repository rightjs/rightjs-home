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
  RIGHTJS_BUILD = "#{RAILS_ROOT}/public/builds/current"
  
  desc 'Updates documentation and build'
  task :update do
    Rake::Task['rightjs:update_src'].invoke
    Rake::Task['rightjs:update_docs'].invoke
    Rake::Task['rightjs:update_build'].invoke
  end
  
  desc 'Updates the rightjs source code library'
  task :update_src do
    puts "Updating the RightJS source\n"
    system "cd #{RIGHTJS_ROOT}; git pull"
    puts 
  end
  
  desc 'Updates the units database out of the RightJS source repository'
  task :update_docs do
    
    
    puts "Rebuilding documentation\n\n"
    
    require 'rdoc/markup/simple_markup'
    require 'rdoc/markup/simple_markup/to_html'

    p = SM::SimpleMarkup.new
    
    def p.to_html(source)
      source = source.gsub(/\n +\*/, "\n*")
      
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
      
      pack = file_name.split('doc/api/').last.split("/").first
      
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
    
    puts "\nCleaning cache\n\n"
    FileUtils.rm_rf "#{RAILS_ROOT}/public/docs"
  end
  
  desc 'Updates the rightjs build'
  task :update_build do
    puts "Updating the build\n\n"
    
    FileUtils.mkdir_p RIGHTJS_BUILD
    
    system "cd #{RIGHTJS_ROOT}; rake build"
    
    puts "\nCopying files"
    
    system "cp #{RIGHTJS_ROOT}/build/right.js #{RIGHTJS_BUILD}/right.js"
    system "cp #{RIGHTJS_ROOT}/build/right-full.js #{RIGHTJS_BUILD}/right-full.js"
    puts
  end
end

