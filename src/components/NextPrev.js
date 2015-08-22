'use strict';

var React = require('react/addons');
var Router = require('react-router');
var classNames = require('classNames');


var NextPrev = React.createClass({
    mixins: [Router.State],

    render: function () {
        var nextPrevMenu = null;

        if (this.props.showStaticNextPrevMenu || this.props.showDynamicNextPrevMenu) {

            let nextPrevMenuCssClasses = classNames(
                'net-sthzg-rd-nextprev',
                {
                    'net-sthzg-rd-nextprev-menu-static': this.props.showStaticNextPrevMenu,
                    'net-sthzg-rd-nextprev-menu-dynamic': this.props.showDynamicNextPrevMenu,
                    'net-sthzg-rd-nextprev-menu-dissolved': this.props.showDynamicNextPrevMenu
                }
            );

            nextPrevMenu = <div className={nextPrevMenuCssClasses} />;

            // The menu only appears if an item is selected.
            if (this.props.activeIdx > -1) {
                let prev = null;
                let close = null;
                let next = null;
                let lang = this.props.language;

                if (this.props.showLabelCollapse) {
                    close = <Router.Link to="/"><span>{this.props.labelCollapse}</span></Router.Link>;
                }

                if (this.props.showLabelPrevious && this.props.activeIdx > 0) {
                    prev = (
                        <Router.Link to="detail" params={{slug: this.props.pickerItems[this.props.activeIdx - 1].slug[lang]}}>
                            <span>{this.props.labelPrevious}</span>
                        </Router.Link>
                    );
                }

                if (this.props.showLabelNext && this.props.activeIdx < (this.props.pickerItems.length - 1)) {
                    next = (
                        <Router.Link to="detail" params={{slug: this.props.pickerItems[this.props.activeIdx + 1].slug[lang]}}>
                            <span>{this.props.labelNext}</span>
                        </Router.Link>
                    );
                }

                nextPrevMenu = (
                    <div className={nextPrevMenuCssClasses}>
                        <div className="net-sthzg-rd-nextprev-menu-prev">{prev}</div>
                        <div className="net-sthzg-rd-nextprev-menu-close">{close}</div>
                        <div className="net-sthzg-rd-nextprev-menu-next">{next}</div>
                    </div>
                );
            }
        }

        return nextPrevMenu;
    }

});

module.exports = NextPrev;
