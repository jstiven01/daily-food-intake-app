class NutrientsController < ApplicationController
  before_action :set_nutrient, only: %i[show update destroy]

  # GET /nutrients
  def index
    @nutrients = current_user.nutrients
    json_response(@nutrients)
  end

  # POST /nutrients
  def create
    @nutrient = current_user.nutrients.create!(nutrient_params)
    json_response(@nutrient, :created)
  end

  # GET /nutrients/:id
  def show
    json_response(@nutrient)
  end

  # PUT /nutrients/:id
  def update
    @nutrient.update(nutrient_params)
    head :no_content
  end

  # DELETE /nutrients/:id
  def destroy
    @nutrient.destroy
    head :no_content
  end

  private

  def nutrient_params
    # whitelist params
    params.permit(:name, :units, :date_progress, :total_nutrient)
  end

  def set_nutrient
    @nutrient = Nutrient.find(params[:id])
  end
end
