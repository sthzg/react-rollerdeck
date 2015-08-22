'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Detail from 'components/Detail.js';

describe('Detail', () => {
    let DetailComponent;

    beforeEach(() => {
        DetailComponent = createComponent(Detail);
    });

    it('should have its component name as default className', () => {
        expect(DetailComponent._store.props.className).toBe('Detail');
    });
});
