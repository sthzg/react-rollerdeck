'use strict';

var React = require('react/addons');
var Navigation = require('./Navigation');
var NextPrev = require('./NextPrev');
var Router = require('react-router');
var jQuery = require('jquery');


var AppCtrl = React.createClass({
    mixins: [Router.State],

    render() {
        return (
            <div className="net-sthzg-rd-layout">
                {
                    (this.props.showStaticNextPrevMenu || this.props.showDynamicNextPrevMenu)
                        ? <NextPrev
                            pickerItems={this.props.rdData.pickerItems}
                            activeIdx={this.getActiveItemIdx()}
                            activeItem={this.getActiveItem()}
                            showStaticNextPrevMenu={this.props.showStaticNextPrevMenu}
                            showDynamicNextPrevMenu={this.props.showDynamicNextPrevMenu}
                            shouldDissolveUnselectedItems={this.props.shouldDissolveUnselectedItems}
                            unselectedItemsDissolveAfter={this.props.unselectedItemsDissolveAfter}
                            labelNext={this.props.labelNext}
                            labelPrevious={this.props.labelPrevious}
                            labelCollapse={this.props.labelCollapse}
                            showLabelNext={true}
                            showLabelPrevious={true}
                            showLabelCollapse={true}
                            language={this.props.language}
                            />
                        : null
                }

                <Navigation
                    pickerItems={this.props.rdData.pickerItems}
                    shouldDissolveUnselectedItems={this.props.shouldDissolveUnselectedItems}
                    unselectedItemsDissolveAfter={this.props.unselectedItemsDissolveAfter}
                    shouldRevealDissolvedItemsOnContainerHover={this.props.shouldRevealDissolvedItemsOnContainerHover}
                    language={this.props.language}
                    />

                <Router.RouteHandler rdData={this.props.rdData} activeIdx={this.getActiveItemIdx()} language={this.props.language} />
            </div>
        );
    },

    /**
     * Returns the index of the actively selected item or -1.
     */
    getActiveItemIdx() {
        let activeIdx = -1;
        if (this.getPath() !== '/') {
            // TODO(sthzg) check if I need polyfill for older browsers to provide forEach.
            this.props.rdData.pickerItems.forEach((item, idx) =>
                {
                    if (`/${item.slug[this.props.language]}` === this.getPath()) {
                        activeIdx = idx;
                        return false;
                    }
                },
                this
            );
        }
        return activeIdx;
    },

    /**
     * Returns the actively selected item or undefined.
     */
    getActiveItem() {
        return (this.getActiveItemIdx() === -1)
            ? undefined
            : this.props.rdData.pickerItems[this.getActiveItemIdx()];
    }

});

module.exports = AppCtrl;
