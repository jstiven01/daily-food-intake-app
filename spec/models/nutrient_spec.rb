# frozen_string_literal: true

require 'rails_helper'

# Test suite for the Nutrient model
RSpec.describe Nutrient, type: :model do
  # Association test
  
  it { should have_many(:measurements).dependent(:destroy) }
  # Validation tests
  
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:units) }
  it { should validate_presence_of(:date_progress) }
end