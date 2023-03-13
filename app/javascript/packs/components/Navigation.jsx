/* eslint-disable react/no-array-index-key */
import * as React from "react";
import PropTypes from "prop-types";

function Link({ name, url, onClick, dataTestId }) {
  if (url) {
    return <a href={url}>{name}</a>;
  }

  if (onClick) {
    return (
      <span
        onClick={onClick}
        data-test-id={dataTestId || ""}
        className="hover:cursor-pointer"
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
      >
        {name}
      </span>
    );
  }

  return <span>{name}</span>;
}

Link.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  onClick: PropTypes.func,
  dataTestId: PropTypes.string,
};

Link.defaultProps = {
  url: null,
  onClick: null,
  dataTestId: null,
};

function Navigation({ links }) {
  return (
    <div className="flex flex-row">
      {links.map((link, index) => (
        <div
          key={index}
          className={`mr-3 ${index < links.length - 1 ? "border-r pr-3" : ""}`}
        >
          <Link {...link} />
        </div>
      ))}
    </div>
  );
}

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      onClick: PropTypes.func,
      dataTestId: PropTypes.string,
    })
  ).isRequired,
};

export default Navigation;
