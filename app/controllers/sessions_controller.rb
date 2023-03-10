class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def create
    user_info = request.env['omniauth.auth']
    user = User.find_by(email: user_info['info']['email']) || User.create_from_omniauth(user_info)
    session[:user_id] = user.id
    user.save_places(session[:places])
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  def update_temp_unit
    current_user.update_temp_unit(params[:temp_unit])
    render json: { message: 'Temp unit updated' }
  end
end
