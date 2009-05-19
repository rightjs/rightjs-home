class SessionsController < ApplicationController
  def new
  end
  
  def create
    if user = User.authenticate(params[:login], params[:password])
      self.current_user = user
      redirect_back_or_to '/'
    else
      flash[:error] = "Nope. You ain't on the list."
      render 'new'
    end
  end
  
  def destroy
    self.logout_current_user
    
    redirect_to '/'
  end
end
