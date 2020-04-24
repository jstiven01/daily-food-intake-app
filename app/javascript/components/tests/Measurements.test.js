import React from 'react';
import Measurements from '../Measurements';

import renderer from 'react-test-renderer';

describe('Measurements', () => {
    const testProps = {
        id: '1',
        nutrient: 'Fat',
        measurementsData:[
            {
                amount: 16.24,
                created_at: "2020-04-24T15:43:46.005Z",
                date_intake: "2020-04-24T10:43:45.980-05:00",
                id: 45,
                nutrient_id: 17,
                updated_at: "2020-04-24T15:43:46.005Z",
            }
        ]
    };
    it('renders correctly', () => {
        const tree = renderer.create(
            <Measurements {...testProps} />
        ).toJSON();
        console.log(tree);

    })
    

});