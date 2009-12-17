ActionController::Routing::Routes.draw do |map|
  
  map.resources :builds, :collection => { :custom => :post }
  map.current_build '/builds/current/:id', :controller => 'builds', :action => 'current', :requirements => {:id => /[\w\-\.]+/}
  map.resources :posts, :as => :blog
  
  map.with_options :controller => 'sessions' do |s_map|
    s_map.login  '/login',  :action => 'new',     :conditions => { :method => :get  }
    s_map.login  '/login',  :action => 'create',  :conditions => { :method => :post }
    s_map.logout '/logout', :action => 'destroy'
  end
  
  map.with_options :controller => 'docs' do |docs|
    docs.connect 'docs/:path', :action => 'show', :requirements => {:path => /[\w\d\/]+/}
    docs.connect 'docs/search/:search.:format', :action => 'search'
    docs.connect 'docs/search/.js',        :action => 'search', :requirements => {:search => ''}
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
