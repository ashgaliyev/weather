# frozen_string_literal: true

class Guest
  attr_accessor :session

  def initialize(session)
    @session = session
  end

  def places
    Place.where(id: session[:places])
  end

  def add_place(place)
    session[:places] ||= []
    session[:places] << place.id
  end

  def temp_unit
    session[:temp_unit] || "c"
  end

  def update_temp_unit(temp_unit)
    session[:temp_unit] = temp_unit
  end
end
