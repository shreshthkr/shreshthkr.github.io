import React from "react";

import Typewriter from "typewriter-effect";

export const Type = () => {
  return (
    <>
      <Typewriter
        options={{
          strings: [
            "Full Stack Developer at Inamo",
            "Building reconciliation systems",
            "Developing backend services",
            "Working with Go & AWS SNS",
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 45,
        }}
      />
    </>
  );
};