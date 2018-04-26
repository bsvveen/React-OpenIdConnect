import React from 'react';
import ReactDOM from 'react-dom';
import Authenticate from 'index';

describe('<index />', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Authenticate />, div);
    });
});
