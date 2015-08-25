'use strict';

var React = require('react/addons');

require('gsap');
var TweenLite = window.TweenLite;


var Home = React.createClass({

    statics: {
        willTransitionFrom(transition, component, callback) {
            let content = component.getDOMNode();
            TweenLite.to(
                content, .4,
                {opacity: 0, scale: .9, onComplete: () => { callback(); }}
            );
        }
    },

    componentDidMount() {
        let content = this.getDOMNode();

        TweenLite.fromTo(
            content, .7,
            {scale: 1.2, opacity: 0},
            {scale: 1, opacity: 1, delay: .6}
        );
    },

    render: function () {
        let homeHTML = this.props.rdData.home.content[this.props.language];
        return (
            <div className="net-sthzg-rd-content net-sthzg-rd-home"
                dangerouslySetInnerHTML={{__html: homeHTML}} />
        );
    }

});

module.exports = Home;
