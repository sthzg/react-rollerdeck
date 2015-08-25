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
        let unselectedItemsDissolveAfter = options.unselectedItemsDissolveAfter || undefined;
        let showDynamicNextPrevMenu = options.showDynamicNextPrevMenu || false;
        let labelNext = options.labelNext || 'Next ❯';
        let labelPrevious = options.labelPrevious || '❮ Previous';
        let labelCollapse = options.labelCollapse || '▲ Collapse';
        let showLabelNext = options.showLabelNext || true;
        let showLabelPrevious = options.showLabelPrevious || true;
        let showLabelCollapse = options.showLabelCollapse || true;
        let lang = options.language;

        var content = document.getElementById(this.getDOMTargetId());

        var Routes = (
            <Route handler={ReactRollerdeckApp}>
                <Route path="/" name="/" handler={AppCtrl}>
                    <Route path="/" handler={Home}/>
                    <Route path="/:slug" name="detail" handler={Detail}/>
                </Route>
            </Route>
        );
        this._rdApp = Router.run(Routes, (Root) => {
            React.render(
                <Root
                    rdData={rdData}
                    showStaticNextPrevMenu={showStaticNextPrevMenu}
                    shouldDissolveUnselectedItems={shouldDissolveUnselectedItems}
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
        this.getApp().clearAllRoutes();
        React.unmountComponentAtNode(document.getElementById(this.getDOMTargetId()));
    }
};
