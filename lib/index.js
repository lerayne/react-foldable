'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHeight = require('react-height');

var _reactHeight2 = _interopRequireDefault(_reactHeight);

var _Foldable = require('./Foldable.css');

var _Foldable2 = _interopRequireDefault(_Foldable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by M. Yegorov on 2016-04-29.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Foldable = function (_Component) {
    _inherits(Foldable, _Component);

    function Foldable(props) {
        _classCallCheck(this, Foldable);

        var _this = _possibleConstructorReturn(this, (Foldable.__proto__ || Object.getPrototypeOf(Foldable)).call(this, props));

        _this.state = {
            expanded: props.expanded || false,
            bodyStyle: {},
            carrotStyle: {},
            timeout: false,
            animationSpeed: props.speed || 200
        };

        if (typeof _this.props.onToggle == 'function') {
            _this.onToggle = function () {
                var _this$props;

                (_this$props = _this.props).onToggle.apply(_this$props, arguments);
            };
        } else {
            _this.onToggle = function () {};
        }
        return _this;
    }

    _createClass(Foldable, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var title = _props.title;
            var children = _props.children;
            var className = _props.className;
            var _state = this.state;
            var bodyStyle = _state.bodyStyle;
            var carrotStyle = _state.carrotStyle;
            var animationSpeed = _state.animationSpeed;


            var animationStyle = {
                transition: 'all ' + animationSpeed + 'ms ease'
            };

            var classNames = [_Foldable2.default.main, className];

            return _react2.default.createElement(
                'div',
                { className: classNames.join(' ') },
                _react2.default.createElement(
                    'div',
                    { className: 'caption', style: { cursor: 'pointer' }, onClick: function onClick(e) {
                            return _this2.toggle();
                        } },
                    _react2.default.createElement('span', { className: 'carrot', style: _extends({}, animationStyle, carrotStyle) }),
                    _react2.default.createElement(
                        'span',
                        { className: 'title' },
                        title
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'body', style: _extends({}, animationStyle, bodyStyle) },
                    _react2.default.createElement(
                        'div',
                        { ref: function ref(element) {
                                return _this2.childrenContainer = element;
                            }, className: 'children-container' },
                        _react2.default.createElement(
                            _reactHeight2.default,
                            { onHeightReady: function onHeightReady(height) {
                                    return _this2.onHeightReady();
                                } },
                            children
                        )
                    )
                )
            );
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.state.expanded) {
                this.close();
            } else {
                this.open();
            }
        }
    }, {
        key: 'onHeightReady',
        value: function onHeightReady() {
            var _this3 = this;

            if (this.state.expanded) {

                this.setState({
                    bodyStyle: { height: this.childrenContainer.offsetHeight }
                }, function () {
                    if (typeof _this3.props.onHeightReady == 'function') {
                        _this3.props.onHeightReady(_this3.childrenContainer.offsetHeight);
                    }
                });
            }
        }
    }, {
        key: 'open',
        value: function open() {
            var _this4 = this;

            if (!this.state.expanded) {

                if (this.state.timeout) {
                    clearTimeout(this.state.timeout);
                }

                var timeout = setTimeout(function () {
                    _this4.setState({
                        bodyStyle: { height: _this4.childrenContainer.offsetHeight },
                        carrotStyle: { transform: 'rotate(0deg)' }
                    }, function () {
                        return setTimeout(function () {
                            return _this4.onToggle(_this4.childrenContainer.offsetHeight);
                        }, _this4.state.animationSpeed);
                    });
                });

                this.setState({
                    expanded: true,
                    timeout: timeout
                });
            }
        }
    }, {
        key: 'close',
        value: function close() {
            var _this5 = this;

            if (this.state.expanded) {

                if (this.state.timeout) {
                    clearTimeout(this.state.timeout);
                }

                var timeout = setTimeout(function () {
                    _this5.setState({
                        expanded: false
                    }, function () {
                        return _this5.onToggle(0);
                    });
                }, this.state.animationSpeed);

                this.setState({
                    bodyStyle: {},
                    carrotStyle: {},
                    timeout: timeout
                });
            }
        }
    }]);

    return Foldable;
}(_react.Component);

exports.default = Foldable;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map