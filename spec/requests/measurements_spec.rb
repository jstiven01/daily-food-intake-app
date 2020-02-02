# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Measurements API' do
  # Initialize the test data
  let(:user) { create(:user) }
  let!(:nutrient) { create(:nutrient, user_id: user.id) }
  let!(:measurements) { create_list(:measurement, 20, nutrient_id: nutrient.id) }
  let(:nutrient_id) { nutrient.id }
  let(:id) { measurements.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /nutrients/:nutrient_id/measurements
  describe 'GET /nutrients/:nutrient_id/measurements' do
    before { get "/nutrients/#{nutrient_id}/measurements", params: {}, headers: headers }

    context 'when nutrient exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all nutrient measurements' do
        expect(json.size).to eq(20)
      end
    end

    context 'when nutrient does not exist' do
      let(:nutrient_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Nutrient with 'id'=0/)
      end
    end
  end

  # Test suite for GET /nutrients/:nutrient_id/measurements/:id
  describe 'GET /nutrients/:nutrient_id/measurements/:id' do
    before { get "/nutrients/#{nutrient_id}/measurements/#{id}", params: {}, headers: headers }

    context 'when nutrient measurement exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the measurement' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when nutrient measurement does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Measurement/)
      end
    end
  end

  # Test suite for PUT /nutrients/:nutrient_id/measurements
  describe 'POST /nutrients/:nutrient_id/measurements' do
    let(:valid_attributes) { { amount: 3000, date_intake: Time.now }.to_json }

    context 'when request attributes are valid' do
      before do
        post "/nutrients/#{nutrient_id}/measurements", params: valid_attributes, headers: headers
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/nutrients/#{nutrient_id}/measurements", params: {}, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Date intake can't be blank, Amount can't be blank/)
      end
    end
  end

  # Test suite for PUT /nutrients/:nutrient_id/measurements/:id
  describe 'PUT /nutrients/:nutrient_id/measurements/:id' do
    let(:valid_attributes) { { amount: 2000 }.to_json }

    before do
      put "/nutrients/#{nutrient_id}/measurements/#{id}", params: valid_attributes, headers: headers
    end

    context 'when measurement exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the measurement' do
        updated_measurement = Measurement.find(id)
        expect(updated_measurement.amount).to match(2000)
      end
    end

    context 'when the measurement does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Measurement/)
      end
    end
  end

  # Test suite for DELETE /nutrients/:id
  describe 'DELETE /nutrients/:id' do
    before { delete "/nutrients/#{nutrient_id}/measurements/#{id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
