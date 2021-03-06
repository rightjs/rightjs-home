#
# The old rightjs tasks
#

namespace :rightjs do

  desc 'Updates documentation and build'
  task :update do
    Rake::Task['rightjs:update_src'].invoke
    Rake::Task['rightjs:update_docs'].invoke
    Rake::Task['rightjs:update_modules'].invoke
    Rake::Task['rightjs:update_build'].invoke
    Rake::Task['rightjs:update_hotlink'].invoke
    Rake::Task['rightjs:create_zips'].invoke
  end

  desc 'Updates the rightjs source code library'
  task :update_src do
    puts "Updating the RightJS source\n"
    %w{core plugins ui docs}.each do |name|
      system "cd #{RIGHTJS_ROOT}/#{name}; git checkout master; git pull origin master; git submodule init; git submodule update"
    end
  end

  desc 'Updates the units database out of the RightJS source repository'
  task :update_docs do


    puts "Rebuilding documentation\n\n"

    Unit.destroy_all

    docs_dir = "#{RIGHTJS_ROOT}/docs/docs/"

    FileList["#{docs_dir}*/docs/**/*.md"].each do |file_name|
      els = file_name.gsub(docs_dir, '').split('/')

      language = els.shift; els.shift # <- remove the trailing 'docs' name
      package  = els.shift
      basename = els.shift
      unitname = basename.gsub(/\.md$/, '').split('.').collect(&:capitalize).join('.')

      puts " * #{unitname} (#{language})"

      fulltext = File.read(file_name)

      blocks   = fulltext.split("###")
      basetext = blocks.shift

      unit     = Unit.find_or_create_by_name_and_package(unitname, package)
      unit.descriptions.create({
        :language => language, :text => Shmaruku.to_html(basetext)
      })

      blocks.each do |method_desc|
        desc = method_desc.split("\n")
        name = desc.shift.strip
        type = name[0,1] == '.' ? 'class' : name[0,1] == '#' ? 'instance' : 'global'
        name = name.gsub /^\.|#/, ''

        text = Shmaruku.to_html(desc.join("\n")).strip

        semantic = ''
        example  = ''

        text.gsub! /\A<code>(.*?)<\/code>/im do |match|
          semantic = $1.dup
          ''
        end

        text.gsub! /<code>(.*?)<\/code>\Z/im do |match|
          example = $1.dup
          ''
        end

        puts "Can't find semantic for #{language} - #{unitname} - #{name}" if semantic.blank?

        method = UnitMethod.find_or_create_by_unit_id_and_name_and_type(unit.id, name, type)
        method.update_attribute(:semantic, semantic.strip)

        method.descriptions.create({
          :language => language,
          :example  => example.strip,
          :text     => text.strip
        })
      end
    end

  end

  desc 'Updates the rightjs Goods and UI modules'
  task :update_modules do
    puts "\nUpdating the Goods and UI modules\n\n"

    %w(plugins ui).each do |name|
      puts " * Processing #{name.capitalize}"

      source_dir = "#{RIGHTJS_ROOT}/#{name}"
      build_dir  = name == 'ui' ? RIGHTJS_BUILD_UI : RIGHTJS_BUILD_GOODS

      puts "     Cleaning up"

      FileUtils.rm_rf   build_dir
      FileUtils.mkdir_p build_dir

      puts "     Building modules"
      system "cd #{source_dir}; rake build &> /dev/null"

      puts "     Copying files in place\n\n"
      FileList["#{source_dir}/build/*.js"].each do |path|
        system "cp #{path} #{build_dir}"
      end
    end

    puts "     Copying i18n files in place"
    FileUtils.rm_rf   RIGHTJS_BUILD_I18N
    FileUtils.mkdir_p RIGHTJS_BUILD_I18N
    system "cp #{RIGHTJS_ROOT}/ui/i18n/*.js #{RIGHTJS_BUILD_I18N}"

    puts "     Copying UI images in place"
    FileUtils.rm_rf   RIGHTJS_UI_IMAGES
    FileUtils.mkdir_p RIGHTJS_UI_IMAGES
    system "cp #{RIGHTJS_ROOT}/ui/img/* #{RIGHTJS_UI_IMAGES}"

    puts "     Patching UI modules for new images location"
    images_url = RIGHTJS_UI_IMAGES["#{RAILS_ROOT}/public".size, RIGHTJS_UI_IMAGES.size]
    FileList["#{RIGHTJS_BUILD_UI}/*.js"].each do |filename|
      old_content = File.read(filename)
      new_content = old_content.gsub('url(../../img/', "url(#{images_url}/")
      new_content = new_content.gsub(/([^\s])no-repeat/, '\1 no-repeat') # front-compiler CSS compressor bug fix

      if old_content != new_content
        File.open(filename, "w") do |f|
          f.write new_content
        end
      end
    end
  end


  desc 'Updates the rightjs build'
  task :update_build do
    puts "\nUpdating the current build\n\n"

    puts " * Nuking the old builds"
    [RIGHTJS_BUILD_CURRENT, RIGHTJS_BUILD_CUSTOM].each do |dir|
      FileUtils.rm_rf   dir
      FileUtils.mkdir_p dir
    end

    puts " * Creating basic builds"
    basic_builds  = {}
    basic_options = RIGHTJS_BUILD_OPTIONS.select{ |o| o.slice(0,3) == 'no-' }
    (0..(2**basic_options.size-1)).each do |i|
      options = []
      ("%0#{basic_options.size}d" % i.to_s(2)).split('').each_with_index do |value, index|
        options << basic_options[index] if value == '1'
      end
      options = options.join(',')
      puts options
      system "cd #{RIGHTJS_ROOT}/core; rake build OPTIONS=#{options == 'no-olds' ? 'no-olds,server' : options} &> /dev/null"

      # reading the build content
      basic_builds[options] = {
        :src  => File.open("#{RIGHTJS_ROOT}/core/build/right-src.js", "r").read,
        :min  => File.open("#{RIGHTJS_ROOT}/core/build/right-min.js", "r").read,
        :pack => File.open("#{RIGHTJS_ROOT}/core/build/right.js", "r").read
      }

      # copying the default build in place
      if options == 'no-olds'
        puts " * Copying the basic builds in place"
        FileList["#{RIGHTJS_ROOT}/core/build/*.js"].each do |file|
          system "cp #{file} #{RIGHTJS_BUILD_CURRENT}"
          system "cp #{file} #{RIGHTJS_BUILD_GOODS}" if File.basename(file).index('-olds')
        end
      end
    end


    puts " * Reading Goods modules"
    plugins_builds = {}
    FileList["#{RIGHTJS_BUILD_PLUGINS}/*.js"].each do |file_name|
      name = File.basename(file_name).split('.').first.split('-')
      pack = name[1]
      type = name[2] || 'pack'
      plugins_builds[pack] ||= {}
      plugins_builds[pack][type.to_sym] = File.open(file_name, "r").read
    end


    puts " * Creating custom builds"
    (0..(2**RIGHTJS_BUILD_OPTIONS.size-1)).each do |i|
      id = "%0#{RIGHTJS_BUILD_OPTIONS.size}d" % i.to_s(2)

      options = [] # <- basic build options
      modules = [] # <- plugins modules

      id.split('').each_with_index do |value, index|
        option  = RIGHTJS_BUILD_OPTIONS[index]

        options << option if (option.slice(0,3) == 'no-' && value == '0')
        modules << option if (option.slice(0,3) != 'no-' && value == '1')
      end

      puts (options + modules).join(',')

      basic_build = basic_builds[options.join(',')]
      source   = basic_build[:src].dup
      minified = basic_build[:min].dup
      packed   = basic_build[:pack].dup

      modules.each do |name|
        source << "\n" + plugins_builds[name][:src]
        minified = minified.strip + plugins_builds[name][:min].gsub(/\/\*.*?\*\//im, '')
      end

      unless modules.empty?
        packed   = FrontCompiler::JavaScript.new(minified.gsub(/\/\*.*?\*\//im, '')).create_self_build
      end

      File.open("#{RIGHTJS_BUILD_CUSTOM}/right-#{id}11.js", "w").write(packed)
      File.open("#{RIGHTJS_BUILD_CUSTOM}/right-#{id}10.js", "w").write(packed)
      File.open("#{RIGHTJS_BUILD_CUSTOM}/right-#{id}01.js", "w").write(minified)
      File.open("#{RIGHTJS_BUILD_CUSTOM}/right-#{id}00.js", "w").write(source)
    end

    puts
  end

  desc 'Hotlink builds update'
  task :update_hotlink do
    puts "Updating the hotlink builds"

    FileUtils.mkdir_p RIGHTJS_BUILD_HOTLINK unless File.exists?(RIGHTJS_BUILD_HOTLINK)

    system "cp #{RIGHTJS_BUILD_CURRENT}/right-min.js      #{RIGHTJS_BUILD_HOTLINK}/right.js"
    system "cp #{RIGHTJS_BUILD_CURRENT}/right-olds-min.js #{RIGHTJS_BUILD_HOTLINK}/right-olds.js"

    system "cp #{RIGHTJS_BUILD_CURRENT}/right-min.js      #{RIGHTJS_BUILD_HOTLINK}/right-#{RIGHTJS_VERSION}.js"
    system "cp #{RIGHTJS_BUILD_CURRENT}/right-olds-min.js #{RIGHTJS_BUILD_HOTLINK}/right-olds-#{RIGHTJS_VERSION}.js"
  end

  desc 'Zips the stuff up'
  task :create_zips do
    puts "Creating Zipped builds"

    out_dir = "#{RAILS_ROOT}/tmp/zips"

    ['', '-min', '-src'].each do |version|
      FileUtils.rm_rf   out_dir
      FileUtils.mkdir_p out_dir

      system "cp #{RIGHTJS_BUILD_CURRENT}/right#{version}.js      #{out_dir}"
      system "cp #{RIGHTJS_BUILD_CURRENT}/right-olds#{version}.js #{out_dir}"
      File.open("#{out_dir}/README.txt", "w") do |file|
        file.write(%Q{RightJS Two-Files Build Usage
------------------------------


  1. Copy both of the JavaScript files into your javascript directory,
     keep both files next to each other.

  2. Include the bigger one onto your page in usual way
     <script src="where/is/that/right.js"></script>

     Don't bother about the second file, it will be loaded automatically when needed

  3. Keep the filenames in a corresponding manner, like that

     right[boo-boo-boo].js
     right-olds[boo-boo-boo].js


--
Have Fun!
Nik

})
      end

      system "cd #{out_dir}; zip build.zip right#{version}.js right-olds#{version}.js README.txt"
      system "cp #{out_dir}/build.zip #{RIGHTJS_BUILD_CURRENT}/right#{version}.js.zip"

      FileUtils.rm_rf   out_dir
    end
  end

  desc 'Cleans up the pages cache'
  task :clean_cache do
    FileList["#{RAILS_ROOT}/public/**/*.html", "#{RAILS_ROOT}/public/*.rss"].each do |file_name|
      unless file_name =~ /\/\d+\.html/
        FileUtils.rm file_name
      end
    end

    FileUtils.rm "#{RAILS_ROOT}/public/builds/scripts.js" if File.exists?("#{RAILS_ROOT}/public/builds/scripts.js")
  end
end
