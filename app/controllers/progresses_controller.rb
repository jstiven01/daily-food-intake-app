# frozen_string_literal: true

class ProgressesController < ApplicationController
  def index
    @nutrients = current_user.nutrients
    final_progresses = {}
    @nutrients.each do |nutrient|
      # final_progresses.push({nutrient.name => nutrient.progresses})
      final_progresses[nutrient.name] = nutrient.progresses
    end
    json_response(final_progresses)
  end
end
