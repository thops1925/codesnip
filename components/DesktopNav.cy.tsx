import React from 'react';
import DesktopNav from './DesktopNav';

describe('<DesktopNav />', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
	it('allow a user to sign up'),
		() => {
			cy.get('button').should('contain', 'Sign In');
		};
});
