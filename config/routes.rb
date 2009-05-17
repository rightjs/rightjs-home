ActionController::Routing::Routes.draw do |map|
  
  map.with_options :controller => 'pages' do |pages|
    pages.with_options :action => 'show' do |show|
      show.pages '*path'
    end
  end
end
