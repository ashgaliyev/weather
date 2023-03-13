import * as React from "react";
import PropTypes from "prop-types";

function Page({ heading, topBlockLeft, topBlockRight, content }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between border-b pb-3 mb-3">
        <div className="flex justify-start">{topBlockLeft}</div>
        <div className="flex justify-end">{topBlockRight}</div>
      </div>
      <h1>{heading}</h1>
      <div>{content}</div>
    </div>
  );
}

Page.propTypes = {
  heading: PropTypes.string.isRequired,
  topBlockLeft: PropTypes.node,
  topBlockRight: PropTypes.node,
  content: PropTypes.node,
};

Page.defaultProps = {
  topBlockLeft: null,
  topBlockRight: null,
  content: null,
};

export default Page;
