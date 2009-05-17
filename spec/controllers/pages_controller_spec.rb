require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe PagesController do
  
  describe "GET show" do
    def get_page(path)
      get :show, :path => path
    end
    
    it "should render home when no path was specified" do
      get_page []
      
      response.should be_success
      response.should render_template('home')
    end
    
    it "should render a page when a page exists" do
      get_page ['home']
      
      response.should be_success
      response.should render_template('home')
    end
    
    it "should render 'not_found' when requested page does not exist" do
      get_page %w(non existing page)
      
      response.status.should == '404 Not Found'
      response.should render_template('not_found')
    end
  end

end
