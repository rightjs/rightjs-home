# UI Modules Index

RightJS UI is a subproject that contains standard user-interface widgets for RightJS

All the source code of the project is available under terms of the MIT license at the
github service.

<http://github.com/rightjs/rightjs-ui>

`git clone git://github.com/rightjs/rightjs-ui.git`

<%
@module_descriptions = {
  :autocompleter => "Autocompleter is the standard autocompletion feature for RightJS",
  
  :calendar      => "Calendar is the standard calendar feature for RightJS. It might work "+
                    "as a standard date-picker widget for input elements, or as an inline "+
                    "calendar widget on the page",
                    
  :tabs          => "Tabs is the standard three in one (tabs/carousel/harmonica) tabs engine for RightJS",
  
  :slider        => "Slider is the standard slider widget, it can work as a standalone widget "+
                    "or as a part of a form",
                    
  :selectable    => "Customizable select-boxes replacement that can hold any html in the options list",
  
  :sortable      => "Sortable is the standard sortable units feature for RightJS",
  
  :lightbox      => "Lightbox a lightbox popups feature for RightJS, with all the standard "+
                    "functionality, like displaying any html content, ajax load, images browsing, etc.",
                    
  :tooltips      => "This is the basic custom titles/tooltips feature for RightJS",
  
  :rater         => "A simple rating widget that can work as a part of a form or as a standalone widget",
  
  :'in-edit'     => "A simple in-place editors feature for RightJS"
}
-%>

<%= partial 'unit', :collection => ui_list %>