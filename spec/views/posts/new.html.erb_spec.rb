require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')

describe "/posts/new.html.erb" do
  include PostsHelper
  
  before(:each) do
    assigns[:post] = stub_model(Post,
      :new_record? => true
    )
  end

  it "renders new posts form" do
    render
    
    response.should have_tag("form[action=?][method=post]", posts_path) do
    end
  end
end


