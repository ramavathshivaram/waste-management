import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button.jsx";
import useUserStore from "@/stores/useUserStore.js";

const UnderProcess = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className=" backdrop-blur-lg  max-w-lg w-full text-center"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/8144/8144719.png"
          alt="Under Process"
          className="w-70 mx-auto mb-6 animate-pulse dark:text-gray-400"
        />

        <h1 className="text-3xl font-semibold mb-2">
          Verification In Progress
        </h1>

        <p className="">
          Your profile is currently under review by the admin. You will be
          notified once approved.
        </p>

        <Button
          className="mt-6 px-6 py-3 "
          onClick={() => navigate(`/${user.role}/update`)}
        >
          Update {user.role.charAt(0).toUpperCase() + user.role.slice(1)}{" "}
          Details
        </Button>
      </motion.div>
    </div>
  );
};

export default UnderProcess;
