import React, { useEffect, useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  EllipsisOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons';
import styles from './Pagination.module.css';

const Pagination = (props) => {
  const [mCurrent, setMCurrent] = useState(false);

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

  useEffect(() => {
    setMCurrent(current || 1);
  }, [current]);

  const onClick = (page) => {
    if (current === null) setMCurrent(page);
    if(!!onChange) onChange(page);
  }

  const renderPageButtons = () => {
    const returnObj = [];

    // Render all buttons
    if (totalPage <= visiblePageCount) {
      for (let i = 1; i <= totalPage; i++) {
        returnObj.push(
          <PaginationButton
            render={
              buttonRender['page']
              ? buttonRender['page'](i, i === mCurrent)
              : <div className={`${styles.button} ${i === mCurrent ? styles.current : ""}`}><div>{i}</div></div>
            }
            onClick={onClick}
          />
        );
      }
      return returnObj;
    }
    const renderStart = Math.min(
      totalPage - visiblePageCount + 1,
      Math.max(1, Math.ceil(mCurrent - visiblePageCount / 2))
    );
    if (renderStart !== 1 && !!quickJump) {
      returnObj.push(renderBackwardButton(Math.max(renderStart - 2, 1)));
    }
    for (let i = renderStart; i < renderStart + visiblePageCount; i++) {
      returnObj.push(
        <PaginationButton
          targetPage={i}
          render={
            buttonRender['page']
            ? buttonRender['page'](i, i === mCurrent)
            : <div className={`${styles.button} ${i === mCurrent ? styles.current : ""}`}><div>{i}</div></div>
          }
          onClick={onClick}
        />
      );
    }
    if (renderStart + visiblePageCount <= totalPage && !!quickJump) {
      returnObj.push(renderForwardButton(Math.min(renderStart + visiblePageCount + 1, totalPage)));
    }
    return returnObj;
  }

  const renderBackwardButton = (targetPage) => {
    return (
      <PaginationButton
        render={<div className={styles.button}><EllipsisOutlined /></div>}
        renderOver={<div className={styles.button}><DoubleLeftOutlined /></div>}
        onClick={onClick}
        targetPage={targetPage}
      />
    )
  }

  const renderForwardButton = (targetPage) => {
    if (mCurrent >= totalPage - 1) {
      return null;
    }

    return (
      <PaginationButton
        render={<div className={styles.button}><EllipsisOutlined /></div>}
        renderOver={<div className={styles.button}><DoubleRightOutlined /></div>}
        onClick={onClick}
        targetPage={targetPage}
      />
    )
  }

  const renderPrevButton = () => {
    const disabled = mCurrent === 1;
    return (
      <PaginationButton
        render={
          buttonRender['prev']
          ? buttonRender['prev'](disabled)
          : <div className={`${styles.button} ${disabled ? styles.disabled : ""}`}><LeftOutlined /></div>}
        onClick={onClick}
        targetPage={mCurrent - 1}
        disabled={disabled}
      />
    )
  }

  const renderNextButton = () => {
    const disabled = mCurrent === totalPage;
    return (
      <PaginationButton
        render={buttonRender['next']
        ? buttonRender['next'](disabled)
        : <div className={`${styles.button} ${disabled ? styles.disabled : ""}`}><RightOutlined /></div>}
        onClick={onClick}
        targetPage={mCurrent + 1}
        disabled={disabled}
      />
    )
  }

  const renderFirstButton = () => {
    const disabled = mCurrent === 1;
    return (
      <PaginationButton
        render={
          buttonRender['first']
          ? buttonRender['first'](disabled)
          : <div className={`${styles.button} ${disabled ? styles.disabled : ""}`}><VerticalRightOutlined /></div>}
        onClick={onClick}
        targetPage={1}
        disabled={disabled}
      />
    )
  }

  const renderLastButton = () => {
    const disabled = mCurrent === totalPage;
    return (
      <PaginationButton
        render={
          buttonRender['last']
          ? buttonRender['last'](disabled)
          : <div className={`${styles.button} ${disabled ? styles.disabled : ""}`}><VerticalLeftOutlined /></div>}
        onClick={onClick}
        targetPage={totalPage}
        disabled={disabled}
      />
    )
  }

  const renderButton = (type) => {
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
  }

  return (
    <div className={styles.pagination_container} style={{...style}}>
      {renderButtonList.map((b) => {
        return renderButton(b)
      })}
    </div>
  );
};

const PaginationButton = (props) => {
  const {
    render,
    renderOver = null,
    disabled,
    onClick,
    targetPage,
  } = props;
  const [isMouseOver, setIsMouseOver] = useState(false);

  const onMouseOver = () => { setIsMouseOver(true); }
  const onMouseOut = () => { setIsMouseOver(false); }

  return (
    <div
      className={styles.button_container}
      onClick={() => {
        if (!disabled && !!onClick) {
          onClick(targetPage);
        }
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {
        (isMouseOver && !!renderOver)
        ? (typeof renderOver === "function" ? renderOver() : renderOver)
        : (typeof render === "function" ? render() : render)
      }
    </div>
  );
};

export default Pagination;
