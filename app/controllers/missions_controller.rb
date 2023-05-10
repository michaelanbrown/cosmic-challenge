class MissionsController < ApplicationController

    def index
        render json: Mission.all
    end

    def create 
        mission = Mission.create!(mission_params)
        render json: mission.planet, status: :created
    end

    def greater_than_30
        render json: Mission.where("length_in_days > ?", 30)
    end

    private
    def mission_params
        params.permit(:name, :scientist_id, :planet_id)
    end

end
