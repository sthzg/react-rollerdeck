'use strict';

var React = require('react/addons');
var Router = require('react-router');

// CSS
require('normalize.css');
require('../styles/main.scss');

var ReactRollerdeckApp = React.createClass({
    render: function() {
        return (
            <div className="net-sthzg-rd-app">
                <Router.RouteHandler {...this.props} />
            </div>
        );
    }
});

module.exports = ReactRollerdeckApp;
