# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def title_text
    "RightJS: #{@title_text}"
  end
  
  def menu_link_to(*args)
    content_tag :li, link_to(*args)
  end
end
