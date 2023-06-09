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

    def mission_search
        mission = Mission.where("length_in_days = ?", params[:length_in_days])
        if mission.size > 0
            render json: mission, status: :ok
        else
            render json: {errors: ["Invalid data type, requires number"]}, status: :not_found
        end
    end

    private
    def mission_params
        params.permit(:name, :scientist_id, :planet_id)
    end

end
