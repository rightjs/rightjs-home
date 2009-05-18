# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  # returns the current title text
  def title_text
    "RightJS: #{@title_text}"
  end
  
  # common menu link builder
  def menu_link_to(text, url, options={})
    content_tag :li, link_to(text, url, options={}), :class => part_of_current_url?(url) ? 'current' : nil
  end
  
  # builds a menu list with RightJS main classes and links to the documentation
  def right_js_classes_menu
    content_tag :ul, Unit.all.collect { |unit|
      menu_link_to(unit.name, unit)+
        (@unit == unit ? right_js_unit_menu(unit) : '')
    }
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
  
  def link_to_unit(unit)
    linkt_to unit.name, unit
  end
  
  def link_to_unit_method(method)
    link_to method.name, method
  end

end
