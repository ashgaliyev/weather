# frozen_string_literal: true

module PlaceHelpers
  def amsterdam_center
    { lat: 52.35744523071499, lng: 4.880759414295106 }
  end

  # within 10 kms of amsterdam_center
  def amsterdam_groenelaan
    { lat: 52.293732208267784, lng: 4.871389798999393 }
  end

  # outside 10 kms of amsterdam_center
  def amsterdam_hofland
    { lat: 52.21294016354059, lng: 4.8639129520674995 }
  end
end
