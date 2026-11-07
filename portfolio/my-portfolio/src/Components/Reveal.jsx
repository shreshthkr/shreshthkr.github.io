import React from "react";
import { motion } from "framer-motion";

/**
 * Scroll-triggered reveal. Wraps children and animates them in once
 * when they enter the viewport.
 */
const Reveal = ({
  children,
  as = "div",
  delay = 0,
  y = 28,
  className = "",
  once = true,
}) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
