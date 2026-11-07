import React from "react";
import "./Marquee.css";

/**
 * Infinite horizontal marquee. Pass an array of strings.
 */
const Marquee = ({ items = [], theme = "rule", speed = 40, separator = "/" }) => {
  const row = [...items, ...items];
  return (
    <div className={`marquee marquee--${theme}`} aria-hidden="true">
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {row.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
