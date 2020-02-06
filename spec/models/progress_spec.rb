# frozen_string_literal: true

require 'rails_helper'

# Test suite for the Progress model
RSpec.describe Progress, type: :model do
  # Association test

  it { should belong_to(:nutrient) }
  # Validation tests

  it { should validate_presence_of(:date_progress) }
  it { should validate_presence_of(:units) }
  it { should validate_presence_of(:total_date) }
end
