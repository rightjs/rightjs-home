# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  # returns the current title text
  def title_text
    "RightJS: #{@title_text}"
  end
  
  # common menu link builder
  def menu_link_to(*args)
    content_tag :li, link_to(*args)
  end
  
  # builds a menu list with RightJS main classes and links to the documentation
  def right_js_classes_menu
    content_tag :ul, {
      'Array'        => {},
      'String'       => {},
      'Function'     => {}, 
      'Regexp'       => {},
      'Util'         => {},
      'Class'        => {},
      'Element'      => {},
      'Form'         => {},
      'Form.Element' => {},
      'Xhr'          => {}
    }.collect { |k, v|
      menu_link_to k, "/docs/#{k.downcase}"
    }
  end
end
