import React from "react";

function ErroroMessage({ message }) {
  return (
    <p className="error">
      <span>⛔⛔</span>
      {message}
    </p>
  );
}

export default ErroroMessage;
