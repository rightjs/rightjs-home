require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe SessionsController do
  
  it "should render the login form" do
    get :new
    
    response.should be_success
    response.should render_template('new')
  end

  it "should authenticate the user and get back" do
    @user = mock_model(User)
    User.should_receive(:authenticate).with('login', 'password').and_return(@user)
    
    post :create, :login => 'login', :password => 'password'
    
    response.should redirect_to('/')
    session[:user_id].should == @user.id
  end
  
  it "should rerender the login form if something wrong" do
    User.should_receive(:authenticate).with('login', 'password').and_return(nil)
    
    post :create, :login => 'login', :password => 'password'
    
    response.should render_template('new')
  end
  
  it "should logout the user" do
    session[:user_id] = '44'
    
    get :destroy
    
    response.should redirect_to('/')
    session[:user_id].should be_nil
  end

end
