class ScientistsController < ApplicationController

    before_action :one_scientist, only: [:show, :update, :destroy]


    def index
        render json: Scientist.all
    end

    def show
        render json: @scientist, status: :ok
    end

    def create
        scientist = Scientist.create!(scientist_params)
        render json: scientist, status: :created
    end

    def update
        @scientist.update!(scientist_params_update)
        render json: @scientist, status: :accepted
    end

    def destroy
        @scientist.destroy
        head :no_content
    end

    def pluto_specialist
        render json: Scientist.where("field_of_study = ?", "Pluto Specialist")
    end

    private

    def one_scientist
        @scientist = Scientist.find(params[:id])
    end

    def scientist_params
        params.permit(:name, :field_of_study, :avatar)
    end

    def scientist_params_update
        params.permit(:name, :field_of_study, :avatar)
    end
end
