class PlacesController < ApplicationController
  before_action :set_place, only: [:edit, :update]

  def index
    @places = current_user.places
  end

  def show
  end

  def new
  end

  def create
    @place = Place.new(place_params)
    if @place.save
      current_user.add_place(@place)
      render json: @place
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @place.update(place_params)
      render json: @place
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  def destroy
    current_user.places.destroy(params[:id])
    render json: { message: 'Place deleted' }
  end

  private

  def place_params
    params.require(:place).permit(:name, :lat, :lng)
  end

  def set_place
    @place = current_user.places.find(params[:id])
  end
end
