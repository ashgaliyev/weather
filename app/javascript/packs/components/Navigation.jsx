import * as React from "react";
import PropTypes from "prop-types";

const Navigation = ({ links }) => (
  <div className="flex flex-row">
    {links.map((link, index) => (
      <div
        key={index}
        className={`mr-3 ${index < links.length - 1 ? "border-r pr-3" : ""}`}
      >
        {link.url ? (
          <a href={link.url}>{link.name}</a>
        ) : (
          <span
            onClick={() => {
              if (link.onClick) {
                link.onClick();
              }
            }}
          >
            {link.name}
          </span>
        )}
      </div>
    ))}
  </div>
);

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default Navigation;
