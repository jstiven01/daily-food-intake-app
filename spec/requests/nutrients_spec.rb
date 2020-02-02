# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'nutrients API', type: :request do
  # initialize test data
  let!(:nutrients) { create_list(:nutrient, 10) }
  let(:nutrient_id) { nutrients.first.id }

  # Test suite for GET /nutrients
  describe 'GET /nutrients' do
    # make HTTP get request before each example
    before { get '/nutrients' }

    it 'returns nutrients' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /nutrients/:id
  describe 'GET /nutrients/:id' do
    before { get "/nutrients/#{nutrient_id}" }

    context 'when the record exists' do
      it 'returns the nutrient' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(nutrient_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:nutrient_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Nutrient with 'id'=100/)
      end
    end
  end

  # Test suite for POST /nutrients
  describe 'POST /nutrients' do
    # valid payload
    let(:valid_attributes) do
      { name: 'Protein', units: 'grams',
        date_progress: Time.now }
    end

    context 'when the request is valid' do
      before { post '/nutrients', params: valid_attributes }

      it 'creates a nutrient' do
        expect(json['name']).to eq('Protein')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/nutrients', params: { name: 'Protein', units: 'grams' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Date progress can't be blank/)
      end
    end
  end

  # Test suite for PUT /nutrients/:id
  describe 'PUT /nutrients/:id' do
    let(:valid_attributes) { { title: 'Shopping' } }

    context 'when the record exists' do
      before { put "/nutrients/#{nutrient_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /nutrients/:id
  describe 'DELETE /nutrients/:id' do
    before { delete "/nutrients/#{nutrient_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
