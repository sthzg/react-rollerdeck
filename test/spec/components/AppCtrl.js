'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import AppCtrl from 'components/AppCtrl.js';

describe('AppCtrl', () => {
    let AppCtrlComponent;

    beforeEach(() => {
        AppCtrlComponent = createComponent(AppCtrl);
    });

    it('should have its component name as default className', () => {
        expect(AppCtrlComponent._store.props.className).toBe('AppCtrl');
    });
});
