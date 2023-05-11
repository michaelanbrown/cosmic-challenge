class PlanetsController < ApplicationController
  # before_action :set_planet, only: %i[ show update destroy ]

  # GET /planets
  def index
    planets = Planet.all
    render json: planets
  end

  def planet_search
    planet = Planet.where("name = ?", params[:name])
    render json: planet, status: :ok
  end

end