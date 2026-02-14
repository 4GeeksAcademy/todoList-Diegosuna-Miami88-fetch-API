import React from "react";
export const Footer = ({ todos }) => {
    return(
        <div className="border border-secondary p-2 bg-primary text-white w-50 mx-auto my-2">
           {todos.length === 1 ? "1 item left" : `${todos.length} items left`}          
         </div>
    )}