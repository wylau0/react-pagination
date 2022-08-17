"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _PaginationModule = _interopRequireDefault(require("./Pagination.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Pagination = props => {
  const [mCurrent, setMCurrent] = (0, _react.useState)(false);
  const {
    current = null,
    onChange = null,
    total = 0,
    pageSize = 10,
    visiblePageCount = 5,
    buttonRender = {},
    renderButtonList = ['first', 'prev', 'page', 'next', 'last'],
    quickJump = true,
    style
  } = props;
  const totalPage = Math.ceil(total / pageSize);
  (0, _react.useEffect)(() => {
    setMCurrent(current || 1);
  }, [current]);

  const onClick = page => {
    if (current === null) setMCurrent(page);
    if (!!onChange) onChange(page);
  };

  const renderPageButtons = () => {
    const returnObj = []; // Render all buttons

    if (totalPage <= visiblePageCount) {
      for (let i = 1; i <= totalPage; i++) {
        returnObj.push( /*#__PURE__*/_react.default.createElement(PaginationButton, {
          render: buttonRender['page'] ? buttonRender['page'](i, i === mCurrent) : /*#__PURE__*/_react.default.createElement("div", {
            className: "".concat(_PaginationModule.default.button, " ").concat(i === mCurrent ? _PaginationModule.default.current : "")
          }, /*#__PURE__*/_react.default.createElement("div", null, i)),
          onClick: onClick
        }));
      }

      return returnObj;
    }

    const renderStart = Math.min(totalPage - visiblePageCount + 1, Math.max(1, Math.ceil(mCurrent - visiblePageCount / 2)));

    if (renderStart !== 1 && !!quickJump) {
      returnObj.push(renderBackwardButton(Math.max(renderStart - 2, 1)));
    }

    for (let i = renderStart; i < renderStart + visiblePageCount; i++) {
      returnObj.push( /*#__PURE__*/_react.default.createElement(PaginationButton, {
        targetPage: i,
        render: buttonRender['page'] ? buttonRender['page'](i, i === mCurrent) : /*#__PURE__*/_react.default.createElement("div", {
          className: "".concat(_PaginationModule.default.button, " ").concat(i === mCurrent ? _PaginationModule.default.current : "")
        }, /*#__PURE__*/_react.default.createElement("div", null, i)),
        onClick: onClick
      }));
    }

    if (renderStart + visiblePageCount <= totalPage && !!quickJump) {
      returnObj.push(renderForwardButton(Math.min(renderStart + visiblePageCount + 1, totalPage)));
    }

    return returnObj;
  };

  const renderBackwardButton = targetPage => {
    return /*#__PURE__*/_react.default.createElement(PaginationButton, {
      render: /*#__PURE__*/_react.default.createElement("div", {
        className: _PaginationModule.default.button
      }, /*#__PURE__*/_react.default.createElement(_icons.EllipsisOutlined, null)),
      renderOver: /*#__PURE__*/_react.default.createElement("div", {
        className: _PaginationModule.default.button
      }, /*#__PURE__*/_react.default.createElement(_icons.DoubleLeftOutlined, null)),
      onClick: onClick,
      targetPage: targetPage
    });
  };

  const renderForwardButton = targetPage => {
    if (mCurrent >= totalPage - 1) {
      return null;
    }

    return /*#__PURE__*/_react.default.createElement(PaginationButton, {
      render: /*#__PURE__*/_react.default.createElement("div", {
        className: _PaginationModule.default.button
      }, /*#__PURE__*/_react.default.createElement(_icons.EllipsisOutlined, null)),
      renderOver: /*#__PURE__*/_react.default.createElement("div", {
        className: _PaginationModule.default.button
      }, /*#__PURE__*/_react.default.createElement(_icons.DoubleRightOutlined, null)),
      onClick: onClick,
      targetPage: targetPage
    });
  };

  const renderPrevButton = () => {
    const disabled = mCurrent === 1;
    return /*#__PURE__*/_react.default.createElement(PaginationButton, {
      render: buttonRender['prev'] ? buttonRender['prev'](disabled) : /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(_PaginationModule.default.button, " ").concat(disabled ? _PaginationModule.default.disabled : "")
      }, /*#__PURE__*/_react.default.createElement(_icons.LeftOutlined, null)),
      onClick: onClick,
      targetPage: mCurrent - 1,
      disabled: disabled
    });
  };

  const renderNextButton = () => {
    const disabled = mCurrent === totalPage;
    return /*#__PURE__*/_react.default.createElement(PaginationButton, {
      render: buttonRender['next'] ? buttonRender['next'](disabled) : /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(_PaginationModule.default.button, " ").concat(disabled ? _PaginationModule.default.disabled : "")
      }, /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, null)),
      onClick: onClick,
      targetPage: mCurrent + 1,
      disabled: disabled
    });
  };

  const renderFirstButton = () => {
    const disabled = mCurrent === 1;
    return /*#__PURE__*/_react.default.createElement(PaginationButton, {
      render: buttonRender['first'] ? buttonRender['first'](disabled) : /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(_PaginationModule.default.button, " ").concat(disabled ? _PaginationModule.default.disabled : "")
      }, /*#__PURE__*/_react.default.createElement(_icons.VerticalRightOutlined, null)),
      onClick: onClick,
      targetPage: 1,
      disabled: disabled
    });
  };

  const renderLastButton = () => {
    const disabled = mCurrent === totalPage;
    return /*#__PURE__*/_react.default.createElement(PaginationButton, {
      render: buttonRender['last'] ? buttonRender['last'](disabled) : /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(_PaginationModule.default.button, " ").concat(disabled ? _PaginationModule.default.disabled : "")
      }, /*#__PURE__*/_react.default.createElement(_icons.VerticalLeftOutlined, null)),
      onClick: onClick,
      targetPage: totalPage,
      disabled: disabled
    });
  };

  const renderButton = type => {
    switch (type) {
      case "first":
        return renderFirstButton();

      case "last":
        return renderLastButton();

      case "prev":
        return renderPrevButton();

      case "next":
        return renderNextButton();

      case "page":
        return renderPageButtons();

      default:
        return null;
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: _PaginationModule.default.pagination_container,
    style: _objectSpread({}, style)
  }, renderButtonList.map(b => {
    return renderButton(b);
  }));
};

const PaginationButton = props => {
  const {
    render,
    renderOver = null,
    disabled,
    onClick: _onClick,
    targetPage
  } = props;
  const [isMouseOver, setIsMouseOver] = (0, _react.useState)(false);

  const onMouseOver = () => {
    setIsMouseOver(true);
  };

  const onMouseOut = () => {
    setIsMouseOver(false);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: _PaginationModule.default.button_container,
    onClick: () => {
      if (!disabled && !!_onClick) {
        _onClick(targetPage);
      }
    },
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut
  }, isMouseOver && !!renderOver ? typeof renderOver === "function" ? renderOver() : renderOver : typeof render === "function" ? render() : render);
};

var _default = Pagination;
exports.default = _default;