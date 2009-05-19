require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe PostsController do
  
  before :each do 
    @controller.stub!(:current_user).and_return(mock_model(User, :id => 44))
  end

  def mock_posts(stubs={})
    @mock_posts ||= mock_model(Post, stubs)
  end
  
  describe "GET index" do
    it "assigns all posts as @posts" do
      Post.stub!(:find).and_return([mock_posts])
      get :index
      assigns[:posts].should == [mock_posts]
    end
  end

  describe "GET show" do
    it "assigns the requested posts as @posts" do
      Post.stub!(:find).with("37").and_return(mock_posts)
      get :show, :id => "37"
      assigns[:post].should equal(mock_posts)
    end
  end

  describe "GET new" do
    it "assigns a new posts as @posts" do
      Post.stub!(:new).and_return(mock_posts)
      get :new
      assigns[:post].should equal(mock_posts)
    end
  end

  describe "GET edit" do
    it "assigns the requested posts as @posts" do
      Post.stub!(:find).with("37").and_return(mock_posts)
      get :edit, :id => "37"
      assigns[:post].should equal(mock_posts)
    end
  end

  describe "POST create" do
    
    describe "with valid params" do
      it "assigns a newly created posts as @posts" do
        Post.stub!(:new).with({'these' => 'params'}).and_return(mock_posts(:save => true))
        post :create, :post => {:these => 'params'}
        assigns[:post].should equal(mock_posts)
      end

      it "redirects to the created posts" do
        Post.stub!(:new).and_return(mock_posts(:save => true))
        post :create, :post => {}
        response.should redirect_to(post_url(mock_posts))
      end
    end
    
    describe "with invalid params" do
      it "assigns a newly created but unsaved posts as @posts" do
        Post.stub!(:new).with({'these' => 'params'}).and_return(mock_posts(:save => false))
        post :create, :post => {:these => 'params'}
        assigns[:post].should equal(mock_posts)
      end

      it "re-renders the 'new' template" do
        Post.stub!(:new).and_return(mock_posts(:save => false))
        post :create, :post => {}
        response.should render_template('new')
      end
    end
    
  end

  describe "PUT update" do
    
    describe "with valid params" do
      it "updates the requested posts" do
        Post.should_receive(:find).with("37").and_return(mock_posts)
        mock_posts.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :post => {:these => 'params'}
      end

      it "assigns the requested posts as @posts" do
        Post.stub!(:find).and_return(mock_posts(:update_attributes => true))
        put :update, :id => "1"
        assigns[:post].should equal(mock_posts)
      end

      it "redirects to the posts" do
        Post.stub!(:find).and_return(mock_posts(:update_attributes => true))
        put :update, :id => "1"
        response.should redirect_to(post_url(mock_posts))
      end
    end
    
    describe "with invalid params" do
      it "updates the requested posts" do
        Post.should_receive(:find).with("37").and_return(mock_posts)
        mock_posts.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :post => {:these => 'params'}
      end

      it "assigns the posts as @posts" do
        Post.stub!(:find).and_return(mock_posts(:update_attributes => false))
        put :update, :id => "1"
        assigns[:post].should equal(mock_posts)
      end

      it "re-renders the 'edit' template" do
        Post.stub!(:find).and_return(mock_posts(:update_attributes => false))
        put :update, :id => "1"
        response.should render_template('edit')
      end
    end
    
  end

  describe "DELETE destroy" do
    it "destroys the requested posts" do
      Post.should_receive(:find).with("37").and_return(mock_posts)
      mock_posts.should_receive(:destroy)
      delete :destroy, :id => "37"
    end
  
    it "redirects to the posts list" do
      Post.stub!(:find).and_return(mock_posts(:destroy => true))
      delete :destroy, :id => "1"
      response.should redirect_to(posts_url)
    end
  end

end
