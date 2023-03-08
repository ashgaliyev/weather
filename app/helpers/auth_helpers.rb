module AuthHelpers
  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      @current_user ||= Guest.new(session)
    end
  end

  def user_logged_in?
    current_user.class == User
  end
end
