# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require(File.join(File.dirname(__FILE__), 'config', 'boot'))

require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

require 'tasks/rails'

require File.dirname(__FILE__) + "/config/environment"

namespace :rightjs do
  
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
    
    FileUtils.rm_rf   RIGHTJS_BUILD
    FileUtils.mkdir_p RIGHTJS_BUILD
    
    system "cd #{RIGHTJS_ROOT}; rake build"
    
    puts "\nCopying files"
    
    system "cp #{RIGHTJS_ROOT}/build/right.js #{RIGHTJS_BUILD}/right.js"
    system "cp #{RIGHTJS_ROOT}/build/right-src.js #{RIGHTJS_BUILD}/right-src.js"
    
    puts "\nCreating custom builds\n"
    
    FileUtils.mkdir_p RIGHTJS_BUILD + "/custom"
    
    (0..15).each do |i|
      id = "%04d" % i.to_s(2)
      
      options = []
      
      id.split('').each_with_index do |value, index|
        if value == '0'
          options << "no-#{RIGHTJS_BUILD_OPTIONS[index]}"
        end
      end
      
      options = options.join(',')
      
      puts " * #{options.blank? ? 'full build' : options}"
      
      system "cd #{RIGHTJS_ROOT}; rake build OPTIONS=#{options} &> /dev/null"
      
      system "cp #{RIGHTJS_ROOT}/build/right.js     #{RIGHTJS_BUILD_CUSTOM}/right-#{id}1.js"
      system "cp #{RIGHTJS_ROOT}/build/right-src.js #{RIGHTJS_BUILD_CUSTOM}/right-#{id}0.js"
    end
    
    puts
  end
  
  desc 'Cleans up the pages cache'
  task :clean_cache do
    Dir.open("#{RAILS_ROOT}/public").each do |entry|
      if %w(tutorials blog).include?(entry) or entry =~ /[a-z\-_]+\.html/
        FileUtils.rm_rf "#{RAILS_ROOT}/public/#{entry}"
      end
    end
  end
end

