# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'progress API', type: :request do
  # initialize test data
  let(:user) { create(:user) }
  let(:nutrient) { create(:nutrient, user_id: user.id) }
  let!(:progresses) { create_list(:progress, 10, nutrient_id: nutrient.id) }
  # authorize request
  let(:headers) { valid_headers }

  # Test suite for GET /progress
  describe 'GET /progresses' do
    # make HTTP get request before each example
    before { get '/progresses', params: {}, headers: headers }

    it 'returns progress' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(1)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
