# frozen_string_literal: true

class MeasurementsController < ApplicationController
  before_action :set_nutrient
  before_action :set_nutrient_measurement, only: %i[show update destroy]

  # GET /nutrients/:nutrient_id/measurements
  def index
    json_response(@nutrient.measurements)
  end

  # GET /nutrients/:nutrient_id/measurements/:id
  def show
    json_response(@measurement)
  end

  # POST /nutrients/:nutrient_id/measurements
  def create
    new_measurement = @nutrient.measurements.new(measurement_params)
    new_measurement.date_intake = DateTime.now
    new_measurement.save

    json_response(@nutrient, :created)
  end

  # PUT /nutrients/:nutrient_id/measurements/:id
  def update
    @measurement.update(measurement_params)
    head :no_content
  end

  # DELETE /nutrients/:nutrient_id/measurements/:id
  def destroy
    @measurement.destroy
    head :no_content
  end

  private

  def measurement_params
    params.permit(:amount, :date_intake)
  end

  def set_nutrient
    @nutrient = Nutrient.find(params[:nutrient_id])
  end

  def set_nutrient_measurement
    @measurement = @nutrient.measurements.find_by!(id: params[:id]) if @nutrient
  end
end
