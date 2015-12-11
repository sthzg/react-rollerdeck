'use strict';

var ReactRollerdeckApp = require('./ReactRollerdeckApp');
var AppCtrl = require('./AppCtrl');
var Home = require('./Home');
var Detail = require('./Detail');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

// TODO(sthzg) make nice
window.netSthzgRollerdeck = {
    _rdApp: null,
    _domTargetId: null,

    init(options) {
        this._domTargetId = options.domTargetId || 'content';
        let rdData = options.rdData;
        let showStaticNextPrevMenu = options.showStaticNextPrevMenu || false;
        let shouldDissolveUnselectedItems = options.shouldDissolveUnselectedItems || false;
        let shouldRevealDissolvedItemsOnContainerHover = options.shouldRevealDissolvedItemsOnContainerHover || false;
        let unselectedItemsDissolveAfter = options.unselectedItemsDissolveAfter || 1500;
        let showDynamicNextPrevMenu = options.showDynamicNextPrevMenu || false;
        let labelNext = options.labelNext || 'Next ❯';
        let labelPrevious = options.labelPrevious || '❮ Previous';
        let labelCollapse = options.labelCollapse || '▲ Collapse';
        let showLabelNext = options.showLabelNext || true;
        let showLabelPrevious = options.showLabelPrevious || true;
        let showLabelCollapse = options.showLabelCollapse || true;
        let lang = options.language;
        let locationType = options.locationType || 'HashLocation';
        let smallImgWidth = options.smallImgWidth || 32;
        let largeImgWidth = options.largeImgWidth || 96;

        let content = document.getElementById(this.getDOMTargetId());

        let Routes = (
            <Route handler={ReactRollerdeckApp}>
                <Route path="/" name="/" handler={AppCtrl} ignoreScrollBehavior>
                    <Route path="/" name="home" handler={Home} ignoreScrollBehavior />
                    <Route path="/:slug" name="detail" handler={Detail} ignoreScrollBehavior />
                </Route>
            </Route>
        );

        this._rdApp = Router.run(Routes, Router[locationType], (Root) => {
            React.render(
                <Root
                    rdData={rdData}
                    smallImgWidth={smallImgWidth}
                    largeImgWidth={largeImgWidth}
                    showStaticNextPrevMenu={showStaticNextPrevMenu}
                    shouldDissolveUnselectedItems={shouldDissolveUnselectedItems}
                    shouldRevealDissolvedItemsOnContainerHover={shouldRevealDissolvedItemsOnContainerHover}
                    unselectedItemsDissolveAfter={unselectedItemsDissolveAfter}
                    showDynamicNextPrevMenu={showDynamicNextPrevMenu}
                    labelNext={labelNext}
                    labelPrevious={labelPrevious}
                    labelCollapse={labelCollapse}
                    showLabelNext={showLabelNext}
                    showLabelPrevious={showLabelPrevious}
                    showLabelCollapse={showLabelCollapse}
                    language={lang}
                    />,
                content
            );
        });
    },

    getApp() {
        return this._rdApp;
    },

    getDOMTargetId() {
        return this._domTargetId;
    },

    destroy() {
        this.getApp().stop();
        React.unmountComponentAtNode(document.getElementById(this.getDOMTargetId()));
    }

};
