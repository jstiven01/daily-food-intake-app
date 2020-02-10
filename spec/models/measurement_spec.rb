require 'rails_helper'

# Test suite for the measurement model
RSpec.describe Measurement, type: :model do
  # Association test
  # ensure an measurement record belongs to a single nutrient record
  it { should belong_to(:nutrient) }
  # Validation test
  # ensure column name is present before saving
  it { should validate_presence_of(:date_intake) }
  it { should validate_presence_of(:amount) }
end
