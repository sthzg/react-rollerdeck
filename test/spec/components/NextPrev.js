'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import NextPrev from 'components/NextPrev.js';

describe('NextPrev', () => {
    let NextPrevComponent;

    beforeEach(() => {
        NextPrevComponent = createComponent(NextPrev);
    });

    it('should have its component name as default className', () => {
        expect(NextPrevComponent._store.props.className).toBe('NextPrev');
    });
});
