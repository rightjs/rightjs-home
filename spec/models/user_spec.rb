require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe User do
  before(:each) do
    @valid_attributes = {
      :login => 'some dude'
    }
  end

  it "should create a new instance given valid attributes" do
    User.create!(@valid_attributes)
  end
end

describe User, "password set" do
  before :all do 
    @user = User.new :password => 'foo bar'
  end
  
  it "should generate the salt" do
    @user.salt.should_not be_blank
  end
  
  it "should generate the crypted_password" do
    @user.crypted_password.should_not be_blank
  end
end

describe User, "authentication" do
  before :all do
    User.destroy_all
    @user = User.create :login => 'login', :password => 'password'
  end
  
  it "should authenticate the user by corret login and password" do
    User.authenticate('login', 'password').should == @user
  end
  
  it "should not authenticate the user with a wrong password" do
    User.authenticate('login', 'wrong password').should be_nil
  end
  
  it "should not authenticate the user with a wrong login" do
    User.authenticate('wrong login', 'password').should be_nil
  end
end