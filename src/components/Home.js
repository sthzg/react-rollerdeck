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
        return (
            <div className="net-sthzg-rd-content net-sthzg-rd-home">
                <p className="spot-color">A Headline About Nothing</p>

                <p>The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced
                    by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs
                    grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack.</p>

                <p className="citation-source">– Sir Ham van Egg</p>
            </div>
        );
    }

});

module.exports = Home;
