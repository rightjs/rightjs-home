#
# The new RightJS tasks
#

namespace :rjs do
  STANDARD_BUILD_DIR = 'tmp/all-right'
  CUSTOM_BUILDS_DIR  = 'tmp/custom-right'

  RIGHTJS_LOCATION   = '../RightJS'
  RIGHT_RAILS_DIR    = '../right-rails'

  def redir(dir)
    FileUtils.rm_rf   dir if File.exists?(dir)
    FileUtils.mkdir_p dir
  end

  desc "Creates and packs a build of everything"
  task :build do
    Rake::Task['rjs:build:standard'].invoke
    Rake::Task['rjs:build:custom'].invoke
  end

  desc "Pack all the builds into zips"
  task :pack do
    # packing the standard builds
    system "cd #{STANDARD_BUILD_DIR}; zip -r ../../#{STANDARD_BUILD_DIR}.zip ."

    # packing the custom builds
    system "cd #{CUSTOM_BUILDS_DIR}; zip -r ../../#{CUSTOM_BUILDS_DIR}.zip ."
  end

  desc "Pushes the zips to rightjs.org"
  task :push do
    system "scp #{STANDARD_BUILD_DIR}.zip #{ENV['LOGIN']}@rightjs.org:~/apps/rightjs/tmp"
    system "scp #{CUSTOM_BUILDS_DIR}.zip  #{ENV['LOGIN']}@rightjs.org:~/apps/rightjs/tmp"
  end

  desc "Unpacks the zip archives and tosses the files in place"
  task :unpack do
    redir STANDARD_BUILD_DIR
    redir CUSTOM_BUILDS_DIR

    system "unzip #{STANDARD_BUILD_DIR}.zip -d #{STANDARD_BUILD_DIR}"
    system "unzip #{CUSTOM_BUILDS_DIR}.zip -d #{CUSTOM_BUILDS_DIR}"

    puts " * Copying the standard builds"
    redir RIGHTJS_BUILD_CURRENT
    system "cp #{STANDARD_BUILD_DIR}/javascripts/*.js #{RIGHTJS_BUILD_CURRENT}"

    puts " * Creating the hotlink"
    FileUtil.mkdir_p RIGHTJS_BUILD_HOTLINK unless File.exists?(RIGHTJS_BUILD_HOTLINK)
    system %Q{
      cp #{STANDARD_BUILD_DIR}/javascripts/right.js #{RIGHTJS_BUILD_HOTLINK}/right.js
      cp #{STANDARD_BUILD_DIR}/javascripts/right-olds.js #{RIGHTJS_BUILD_HOTLINK}/right-olds.js
      cp #{STANDARD_BUILD_DIR}/javascripts/right.js #{RIGHTJS_BUILD_HOTLINK}/right-#{RIGHTJS_VERSION}.js
      cp #{STANDARD_BUILD_DIR}/javascripts/right-olds.js #{RIGHTJS_BUILD_HOTLINK}/right-olds-#{RIGHTJS_VERSION}.js
    }

    puts " * Copying the custom builds"
    redir RIGHTJS_BUILD_CUSTOM
    system "cp #{CUSTOM_BUILDS_DIR}/*.js #{RIGHTJS_BUILD_CUSTOM}"

    puts " * Copying the server-side build"
    system "cp #{CUSTOM_BUILDS_DIR}/right-server.js #{RIGHTJS_BUILD_CURRENT}/right-server.js"

    puts " * Copying the plugins"
    redir RIGHTJS_BUILD_UI
    redir RIGHTJS_BUILD_PLUGINS
    FileList["#{STANDARD_BUILD_DIR}/javascripts/right/*.js"].each do |filename|
      module_name = filename.split('/').last.gsub(/(-src)?\.js/, '')
      system "cp #{filename} #{
        RIGHTJS_PLUGINS.include?(module_name) ? RIGHTJS_BUILD_PLUGINS : RIGHTJS_BUILD_UI
      }/right-#{File.basename(filename)}"
    end

    puts " * Copying the images"
    redir RIGHTJS_UI_IMAGES
    system "cp #{STANDARD_BUILD_DIR}/images/rightjs-ui/* #{RIGHTJS_UI_IMAGES}"

    puts " * Copying the i18n modules"
    redir RIGHTJS_BUILD_I18N
    system "cp #{STANDARD_BUILD_DIR}/javascripts/right/i18n/*.js #{RIGHTJS_BUILD_I18N}"
 end

  desc "Creates the standard package build"
  task :'build:standard' do
    redir STANDARD_BUILD_DIR

    # building everything
    system "cd #{RIGHT_RAILS_DIR}; rake rjs:build"

    # copying the stuff in here
    system "cp -r #{RIGHT_RAILS_DIR}/public/* #{STANDARD_BUILD_DIR}/"
  end

  desc "Creates the collection of custom builds"
  task :'build:custom' do
    redir CUSTOM_BUILDS_DIR

    puts " * Creating basic builds"
    (0..(2**RIGHTJS_BUILD_OPTIONS.size-1)).each do |i|
      id = "%0#{RIGHTJS_BUILD_OPTIONS.size}d" % i.to_s(2)
      options = []
      id.split('').each_with_index do |value, index|
        options << RIGHTJS_BUILD_OPTIONS[index] if value == '1'
      end
      options << (options == ['no-olds'] ? "server" : "safe")
      options = options.join(',')

      puts options
      system "cd #{RIGHTJS_LOCATION}; rake build OPTIONS=#{options} &> /dev/null"

      if options.include?('server')
        system "cp #{RIGHTJS_LOCATION}/build/right-server.js #{CUSTOM_BUILDS_DIR}/right-server.js"
      else
        system "cp #{RIGHTJS_LOCATION}/build/right.js          #{CUSTOM_BUILDS_DIR}/#{id}00.js"
        system "cp #{RIGHTJS_LOCATION}/build/right-src.js      #{CUSTOM_BUILDS_DIR}/#{id}01.js"
        system "cp #{RIGHTJS_LOCATION}/build/right-safe.js     #{CUSTOM_BUILDS_DIR}/#{id}10.js" if options.include?('safe')
        system "cp #{RIGHTJS_LOCATION}/build/right-safe-src.js #{CUSTOM_BUILDS_DIR}/#{id}11.js" if options.include?('safe')
      end
    end
  end
end