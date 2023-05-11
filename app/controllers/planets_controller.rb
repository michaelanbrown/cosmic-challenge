class PlanetsController < ApplicationController
  # before_action :set_planet, only: %i[ show update destroy ]

  # GET /planets
  def index
    planets = Planet.all
    render json: planets
  end

  def planet_search
    planet = Planet.where("name LIKE ?", "%#{params[:name]}%")
    if planet.size > 0
      render json: planet, status: :ok
    else
      render json: {errors: ["Planet not found"]}, status: :not_found
    end
  end

end