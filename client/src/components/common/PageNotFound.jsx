import React from "react";
import { motion } from "motion/react";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <motion.h1
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
          },
          y: 0,
        }}
        className="text-5xl animate-pulse"
      >
        Page not found
      </motion.h1>
    </div>
  );
};

export default PageNotFound;
