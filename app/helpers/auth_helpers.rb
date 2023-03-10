# frozen_string_literal: true

module AuthHelpers
  def current_user
    @current_user ||=
      if session[:user_id]
        User.find(session[:user_id])
      else
        Guest.new(session)
      end
  end

  def user_logged_in?
    current_user.instance_of?(User)
  end
end
