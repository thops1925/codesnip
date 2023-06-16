import React from 'react';
import Home from './page';

describe('<Home />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<Home />);
	});
	it('render homepage', () => {
		cy.visit('http://localhost:3000/api/prompt ');
	});
});
