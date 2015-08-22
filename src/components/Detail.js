'use strict';

var React = require('react/addons');

require('gsap');
var TweenLite = window.TweenLite;


var Detail = React.createClass({

    statics: {
        willTransitionFrom(transition, component, callback) {
            let leftCol = component.refs.leftCol.getDOMNode();
            let rightCol = component.refs.rightCol.getDOMNode();

            TweenLite.to(rightCol, 0.2, {x: '-32', opacity: 0});
            TweenLite.to(leftCol, 0.2,
                {
                    x: '-32',
                    opacity: 0,
                    delay: 0.15,
                    onComplete: () => { callback(); }
                }
            );
        }
    },

    componentDidMount() {
        let leftCol = this.refs.leftCol.getDOMNode();
        let rightCol = this.refs.rightCol.getDOMNode();

        TweenLite.fromTo(rightCol, 0.9, {x: '32', opacity: 0}, {x: '0', opacity: 1});
        TweenLite.fromTo(leftCol, 0.9, {x: '32', opacity: 0}, {x: '0', opacity: 1, delay: 0.7});
    },

    componentDidUpdate(prevProps, prevState) {
        let prevItem = prevProps.pickerItems[prevProps.activeIdx];
        let currentItem = this.props.pickerItems[this.props.activeIdx];

        if (prevItem.slug[this.props.language] !== currentItem.slug[this.props.language])
        {
            let leftCol = this.refs.leftCol.getDOMNode();
            let rightCol = this.refs.rightCol.getDOMNode();

            TweenLite.fromTo(rightCol, 0.9, {x: '32', opacity: 0}, {x: '0', opacity: 1, delay: 0.3});
            TweenLite.fromTo(leftCol, 0.9, {x: '32', opacity: 0}, {x: '0', opacity: 1, delay: 0.7});
        }
    },

    render: function () {
        let item = this.props.pickerItems[this.props.activeIdx];
        return (
            <div key={this.props.activeIdx} className="net-sthzg-rd-content net-sthzg-rd-detail">
                <div ref="leftCol" className="net-sthzg-rd-detail-column net-sthzg-rd-detail-column-left"
                     dangerouslySetInnerHTML={{__html: item.content.left.de}}/>
                <div ref="rightCol" className="net-sthzg-rd-detail-column net-sthzg-rd-detail-column-right"
                     dangerouslySetInnerHTML={{__html: item.content.right.de}}/>
            </div>
        );
    }

});

module.exports = Detail;
