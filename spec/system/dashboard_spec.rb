# frozen_string_literal: true

require "rails_helper"

RSpec.describe 'Dashboard screen', type: :system do
  it 'shows the dashboard screen' do
    visit root_path
    expect(page).to have_content("My Places")
    expect(page).to have_content("Guest")
  end

  it 'adds a new place' do
    create_place

    visit root_path

    expect(page).to have_content("Amsterdam")
    expect(page).to have_content("3°C..3°C")
    expect(page).to have_content("8.44 m/s")
  end

  it 'shows the place screen' do
    create_place

    visit root_path

    find("[data-test-id='place-card']").click 
    expect(page).to have_current_path(place_path(Place.last))
    expect(page).to have_content("Amsterdam")
  end

  it 'edit a place' do
    create_place

    visit root_path

    find("[data-test-id='place-card']").click
    click_on 'Edit'
    expect(page).to have_current_path(edit_place_path(Place.last))
    fill_in "name", with: "Amsterdam2"
    find("[data-test-id='update-place']").click
    expect(page).to have_current_path(root_path)
    expect(page).to have_content("Amsterdam2")
  end

  it 'deletes a place' do
    create_place

    visit root_path

    find("[data-test-id='place-card']").click
    find("[data-test-id='delete-place']").click
  
    page.driver.browser.switch_to.alert.accept

    expect(page).to have_current_path(root_path)
    expect(page).to_not have_content("Amsterdam")
  end

  def create_place
    visit root_path
    find("[data-test-id='add-place']").click

    expect(page).to have_current_path(new_place_path)

    fill_in "name", with: "Amsterdam"
    fill_in "lat", with: "52.370216"
    fill_in "lng", with: "4.895168"
    
    find("[data-test-id='create-place']").click
    expect(page).to have_current_path(root_path)
  end
end
