'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Navigation from 'components/Navigation.js';

describe('Navigation', () => {
    let NavigationComponent;

    beforeEach(() => {
        NavigationComponent = createComponent(Navigation);
    });

    it('should have its component name as default className', () => {
        expect(NavigationComponent._store.props.className).toBe('Navigation');
    });
});
