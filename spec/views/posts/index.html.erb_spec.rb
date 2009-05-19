require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')

describe "/posts/index.html.erb" do
  include PostsHelper
  
  before(:each) do
    assigns[:posts] = [
      mock_model(Post, :uri_name => 'one', :created_at => Time.now, :title => 'one', :anonse => 'one'),
      mock_model(Post, :uri_name => 'two', :created_at => Time.now, :title => 'two', :anonse => 'two')
    ]
  end

  it "renders a list of posts" do
    render
  end
end

