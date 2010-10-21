#
# This module just contains the list of plugins
#
#
module PluginsHelper
  PLUGIN_NAMES = {
    :rails    => "RubyOnRails Support",
    :dnd      => "Drag'n'Drop Module",
    :effects  => "Additional Effects",
    :json     => "JSON Support",
    :jquerysh => "jQuery Emulator",
    :sizzle   => "Sizzle Support",
    :table    => "Table DOM-Wrapper"
  }

  UI_NAMES = {
    'in-edit' => "In Place Edit"
  }

  def plugins_list
    RIGHTJS_PLUGINS.collect(&:to_sym).collect do |key|
      {
        :key  => key,
        :name => PLUGIN_NAMES[key],
        :url  => plugins_path(key)
      }
    end.sort_by{|i| i[:name]}
  end

  def ui_list
    RIGHTJS_UIS.sort.collect do |key|
      {
        :key  => key.to_sym,
        :name => UI_NAMES[key] || key.capitalize,
        :url  => ui_path(key)
      }
    end.sort_by{|i| i[:name]}
  end

  def plugins_modules_menu
    modules_menu "plugins-menu", plugins_list
  end

  def ui_modules_menu
    modules_menu "ui-menu", ui_list
  end

private

  def modules_menu(id, list)
    uri = request.request_uri
    content_tag :ul, list.collect{|pack|
      menu_link_to pack[:name], pack[:url] + (uri =~ /^\/ui\/.+?\/demo$/ ? '/demo' : '')
    }.join("\n"), :id => id
  end
end