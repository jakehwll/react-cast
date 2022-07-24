"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_helmet_1 = require("react-helmet");
const MediaContext = (0, react_1.createContext)({
    initiated: false,
});
const Media = ({ children }) => {
    const [isInitiated, setInitiated] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        ;
        window['__onGCastApiAvailable'] = (isAvailable) => {
            if (isAvailable)
                setInitiated(true);
        };
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_helmet_1.Helmet, null,
            react_1.default.createElement("script", { src: "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" })),
        react_1.default.createElement(MediaContext.Provider, { value: {
                initiated: isInitiated,
            } }, children)));
};
exports.default = Media;
