# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  # returns the current title text
  def title_text
    "RightJS: #{@title_text}"
  end
  
  # common menu link builder
  def menu_link_to(text, url, options={})
    content_tag :li, link_to(text, url, options), :class => part_of_current_url?(url) ? 'current' : nil
  end
  
  # builds a menu list with RightJS main classes and links to the documentation
  def right_js_classes_menu
    packs = {}
    Unit.all.each do |unit|
      packs[unit.package] ||= []
      packs[unit.package] << unit
    end
    
    content_tag :ul, packs.keys.sort.collect { |package|
      content_tag(:li, 
        content_tag(:label, package.capitalize) +
        content_tag(:ul, packs[package].collect { |unit|
          menu_link_to(unit.name, unit)+
            (@unit == unit ? right_js_unit_menu(unit) : '')
        })
      )
    }, :id => 'classes-list'
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
end
