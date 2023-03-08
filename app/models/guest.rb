class Guest
  attr_accessor :session

  def initialize(session)
    @session = session
  end

  def places
    Place.where(id: session[:places])
  end
end
