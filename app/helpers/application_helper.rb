# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  # returns the current title text
  def title_text
    "RightJS: #{@title_text}"
  end

  # common menu link builder
  def menu_link_to(text, url, options={}, current=nil)
    content_tag :li, link_to(text, url, options), :class => (current.nil? ? part_of_current_url?(url) : current) ? 'current' : nil
  end

  # builds a menu list with RightJS main classes and links to the documentation
  def right_js_classes_menu
    packs = {}
    Unit.all.each do |unit|
      packs[unit.package] ||= []
      packs[unit.package] << unit
    end

    packs.keys.sort.collect { |package|
      content_tag(:label, package.capitalize) +
      content_tag(:ul, packs[package].collect { |unit|
        menu_link_to(unit.name, unit, {}, request.request_uri == unit_path(unit))+
          (@unit == unit ? right_js_unit_menu(unit) : '')
      })
    }.join("\n")
  end

  # builds a particular unit methods menu
  def right_js_unit_menu(unit)
    content_tag :ul, unit.unit_methods.all.collect { |method|
      menu_link_to(method.name, method)
    }
  end

  # checks if the given url is a part of the current url
  def part_of_current_url?(url)
    url = url.is_a?(String) ? url : polymorphic_path(url)
    url == '/' ? request.request_uri == '/' : request.request_uri.starts_with?(url)
  end

  def url_starts_with?(*list)
    list.any?{|url| request.request_uri.starts_with?(url)}
  end

  def link_to_unit(unit)
    unit = Unit.find_by_name(unit) if unit.is_a?(String)
    link_to unit.name, unit
  end

  def link_to_unit_method(method)
    link_to method.name, method
  end

  def format_text(text)
    simple_format(text).gsub('<br />', "");
  end

  def d(date)
    date.to_s(:db).split(' ').first if date
  end

  def set_title(text)
    @title_text = text
  end

  def set_unit_scope(name)
    controller.instance_eval{ @unit = Unit.find_by_name(name)}
  end

  def plugins_path(package=nil)
    package = 'drag-and-drop' if package.to_s == 'dnd'
    "/plugins"+ (package ? "/#{package}" : "")
  end

  def ui_path(package=nil)
    "/ui"+ (package ? "/#{package}" : "")
  end
end
