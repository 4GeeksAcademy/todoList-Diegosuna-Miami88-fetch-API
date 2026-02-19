import React from "react";

export const Footer = ({ todos }) => {
  return (
    <div className="mt-3 p-2 bg-primary text-white w-50 mx-auto">
      {(todos || []).length} items left
    </div>
  );
};
