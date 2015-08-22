'use strict';

var React = require('react/addons');
var Router = require('react-router');
var classNames = require('classNames');
var jQuery = require('jquery');


var Navigation = React.createClass({
    mixins: [Router.State, Router.Navigation],

    componentWillMount() {
        this._rdData = {
            hasActive: false,
            activeIdx: -1,
            navigationItemsDissolveInt: []
        };
    },

    componentDidMount() {
        this._moveRollerdeck();
        this._dissolveAllUnselectedNavigationItems();
    },

    componentDidUpdate(prevProps, prevState) {
        this._moveRollerdeck();
        this._dissolveAllUnselectedNavigationItems();
    },

    render: function () {
        this._rdData.hasActive = false;
        this._rdData.activeIdx = -1;
        let lang = this.props.language;

        // Prepare links to the Rollerdeck's detail pages.
        let navLinks = this.props.pickerItems.map(function(item, idx) {
            let isActive = (this.getPath() === `/${item.slug[lang]}`);
            let classes = classNames(
                'net-sthzg-rd-navigation-item',
                {
                    'net-sthzg-rd-navigation-item-active': isActive,
                    'net-sthzg-rd-navigation-item-inactive': !isActive,
                    'net-sthzg-rd-navigation-item-dissolved': false
                }
            );

            this._rdData.hasActive = (isActive) ? true : this._rdData.hasActive;
            this._rdData.activeIdx = (isActive) ? idx : this._rdData.activeIdx;

            return (
                <div ref={`nav-item-${idx}`} key={idx} className={classes}>
                    <Router.Link to="detail" params={{slug: item.slug[lang]}} onClick={this._rollToActivePos}>
                        <img src={item.imgSmall} width={(isActive) ? 96 : 32} />
                        {(!isActive) ? item.title[lang] : null}
                    </Router.Link>
                </div>
            );

        }, this);

        let componentClasses = classNames(
            'net-sthzg-rd-navigation',
            {'net-sthzg-rd-navigation-none-selected': !this._rdData.hasActive}
        );

        return (
            <div className="net-sthzg-rd-navigation-wrap">
                <div ref="net-sthzg-rd-navigation" className={componentClasses}>
                    {navLinks}
                </div>
            </div>
        );
    },

    /**
     * Moves the Rollerdeck to the horizontal center when items are selected / deselected.
     */
    _moveRollerdeck() {
        if (this._rdData.hasActive) {
            // Calculate width of the active navigation item.
            let activeWidth = jQuery(this.refs[`nav-item-${this._rdData.activeIdx}`].getDOMNode()).outerWidth(true);

            // Calculate total width of the navigation container.
            let totalWidth = 0;
            for (let i = 0; i < this.props.pickerItems.length; i++) {
                if (this._rdData.activeIdx > -1 && this._rdData.activeIdx === i) {
                    totalWidth += activeWidth;
                } else {
                    totalWidth += jQuery(this.refs[`nav-item-${i}`].getDOMNode()).outerWidth(true);
                }
            }

            // Now calculate the offset we need to translate the Rollerdeck to be centered.
            let leftWidth = activeWidth / 2;
            for (let i = 0; i < this._rdData.activeIdx; i++) {
                leftWidth += jQuery(this.refs[`nav-item-${i}`].getDOMNode()).outerWidth(true);
            }
            let centerOffset = Math.round(totalWidth / 2 - leftWidth);

            // Apply the offset with CSS.
            //this.getDOMNode().style.transform = `translateX(${centerOffset}px)`;
            //this.getDOMNode().style.mozTransform = `translateX(${centerOffset}px)`;
            //this.getDOMNode().style.webkitTransform = `translateX(${centerOffset}px)`;
            this.refs['net-sthzg-rd-navigation'].getDOMNode().style.transform = `translateX(${centerOffset}px)`;
            this.refs['net-sthzg-rd-navigation'].getDOMNode().style.mozTransform = `translateX(${centerOffset}px)`;
            this.refs['net-sthzg-rd-navigation'].getDOMNode().style.webkitTransform = `translateX(${centerOffset}px)`;

        } else {
            // If no single item is selected reset its position.
            this.refs['net-sthzg-rd-navigation'].getDOMNode().style.transform = `translateX(0px)`;
            this.refs['net-sthzg-rd-navigation'].getDOMNode().style.mozTransform = `translateX(0px)`;
            this.refs['net-sthzg-rd-navigation'].getDOMNode().style.webkitTransform = `translateX(0px)`;
        }
    },

    _dissolveAllUnselectedNavigationItems() {
        if (!this.props.shouldDissolveUnselectedItems) {
            return;
        }

        this._clearAllNavigationItemDissolveIntervals();

        if (this._rdData.activeIdx === -1) {
            this._revealAllNavigationItems();
            return;
        }

        let initialDelay = this.props.unselectedItemsDissolveAfter || 2500;
        let delay = 96;

        this.props.pickerItems.forEach((item, idx) =>
        {
            if (idx === this._rdData.activeIdx) {
                return false;
            }

            let to = setTimeout(() =>
                {
                    // TODO(sthzg) needs polyfill for classList.
                    this.refs[`nav-item-${idx}`].getDOMNode().classList.add('net-sthzg-rd-navigation-item-dissolved');
                },
                initialDelay + delay * idx);

            this._pushNavigationItemDissolveInterval(to);
        }, this);
    },

    _revealAllNavigationItems() {
        this.props.pickerItems.forEach((item, idx) => {
            // TODO(sthzg) needs polyfill for classList.
            this.refs[`nav-item-${idx}`].getDOMNode().classList.remove('net-sthzg-rd-navigation-item-dissolved');
        });
    },

    _pushNavigationItemDissolveInterval(timeout) {
        this._rdData.navigationItemsDissolveInt.push(timeout);
    },

    _clearAllNavigationItemDissolveIntervals() {
        // TODO(sthzg) needs polyfill for forEach.
        this._rdData.navigationItemsDissolveInt.forEach((val) => { clearTimeout(val); });
        this._rdData.navigationItemsDissolveInt = [];
    }

});

module.exports = Navigation;
