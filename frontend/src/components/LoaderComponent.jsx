import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderComponent = ({
  isLoading,
  fullScreen = true,
  size = 40,
  color = "primary",
}) => {
  if (!isLoading) return null;

  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "h-screen" : "h-32"
      } text-gray-500`}
    >
      <CircularProgress size={size} color={color} />
    </div>
  );
};

export default LoaderComponent;
