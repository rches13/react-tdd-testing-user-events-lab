import React from "react";

function FormInput({ label, type, value, onChange }) {
  return (
    <div>
      <label>
        {label}
        <input type={type} value={value} onChange={onChange} />
      </label>
    </div>
  );
}

export default FormInput;