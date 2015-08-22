'use strict';

describe('ReactRollerdeckApp', () => {
  let React = require('react/addons');
  let ReactRollerdeckApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactRollerdeckApp = require('components/ReactRollerdeckApp.js');
    component = React.createElement(ReactRollerdeckApp);
  });

  it('should create a new instance of ReactRollerdeckApp', () => {
    expect(component).toBeDefined();
  });
});
