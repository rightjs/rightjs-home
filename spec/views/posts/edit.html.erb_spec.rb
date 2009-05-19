require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')

describe "/posts/edit.html.erb" do
  include PostsHelper
  
  before(:each) do
    assigns[:post] = @post = mock_model(Post,
      :new_record? => false,
      :uri_name    => 'one',
      :created_at  => Time.now,
      :title       => 'one',
      :anonse      => 'one',
      :text        => 'one'
    )
  end

  it "renders the edit post form" do
    render
    
    response.should have_tag("form[action=#{post_path(@post)}][method=post]") do
    end
  end
end


