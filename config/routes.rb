ActionController::Routing::Routes.draw do |map|
  
  map.resources :builds, :collection => { :custom => :post, :scripts => :get }
  map.current_build '/builds/current/:id', :controller => 'builds', :action => 'current', :requirements => {:id => /[\w\-\.]+/}
  map.resources :posts, :as => :blog
  
  map.with_options :controller => 'sessions' do |s_map|
    s_map.login  '/login',  :action => 'new',     :conditions => { :method => :get  }
    s_map.login  '/login',  :action => 'create',  :conditions => { :method => :post }
    s_map.logout '/logout', :action => 'destroy'
  end
  
  doc_prefixes = [''] + RIGHTJS_LANGUAGES.collect{|l| "#{l}/"}
  
  map.with_options :controller => 'docs' do |docs|
    doc_prefixes.each do |prefix|
      docs.connect "#{prefix}docs/:path", :action => 'show', :requirements => {:path => /[\w\d\/]+/}
      docs.connect "#{prefix}docs/search/:search.:format", :action => 'search'
      docs.connect "#{prefix}docs/search/.js",             :action => 'search', :requirements => {:search => ''}
    end
  end
  
  map.with_options :controller => 'pages' do |pages|
    pages.mirror 'ui/in-edit/response', :action => 'mirror'
    
    pages.with_options :action => 'show' do |show|
      show.documentation 'docs', :requirements => {:path => ['docs']}
      show.download 'download', :requirements => {:path => ['download']}
      show.contacts 'contacts', :requirements => {:path => ['contacts']}
      
      show.pages '*path'
    end
  end
  
end
