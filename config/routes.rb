ActionController::Routing::Routes.draw do |map|
  
  map.resources :posts, :as => :blog
  
  map.with_options :controller => 'docs' do |docs|
    docs.connect 'docs/:path', :action => 'show', :requirements => {:path => /[\w\d\/]+/}
  end
  
  map.with_options :controller => 'pages' do |pages|
    pages.with_options :action => 'show' do |show|
      show.documentation 'docs', :requirements => {:path => ['docs']}
      show.download 'download', :requirements => {:path => ['download']}
      show.contacts 'contacts', :requirements => {:path => ['contacts']}
      
      show.pages '*path'
    end
  end
  
end
