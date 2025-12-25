import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button.jsx";
import useUserStore from "@/stores/useUserStore.js";

const UnderProcess = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg text-center backdrop-blur-lg"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/8144/8144719.png"
          alt="Under Process"
          className="mx-auto mb-6 w-70 animate-pulse dark:text-gray-400"
        />

        <h1 className="mb-2 text-3xl font-semibold">
          Verification In Progress
        </h1>

        <p className="">
          Your profile is currently under review by the admin. You will be
          notified once approved.
        </p>

        <Button
          className="px-6 py-3 mt-6 "
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
