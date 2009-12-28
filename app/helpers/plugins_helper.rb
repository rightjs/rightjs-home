#
# This module just contains the list of plugins
#
#
module PluginsHelper
  GOOD_NAMES = {
    :rails    => "RubyOnRails Support",
    :dnd      => "Drag'n'Drop Module",
    :effects  => "Additional Effects",
    :json     => "JSON Support",
    :events   => "Advanced DOM-Events",
    :behavior => "Behaviors Module"
  }
  
  UI_NAMES = {
    'in-edit' => "In Place Edit"
  }
  
  def goods_list
    RIGHTJS_GOODS.collect(&:to_sym).collect do |key|
      {
        :key  => key,
        :name => GOOD_NAMES[key],
        :url  => goods_path(key)
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
  
  def goods_modules_menu
    modules_menu "goods-menu", goods_list
  end
  
  def ui_modules_menu
    modules_menu "ui-menu", ui_list
  end

private

  def modules_menu(id, list)
    content_tag :ul, list.collect{|pack|
      menu_link_to pack[:name], pack[:url] + (request.request_uri.ends_with?('/demo') ? '/demo' : '')
    }.join("\n"), :id => id
  end
end