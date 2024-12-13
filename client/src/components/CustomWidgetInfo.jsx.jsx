import React from "react";

const CustomWidgetInfo = ({
  title,
  placeholder = "",
  type,
  divClassName,
  inputClassName,
  state,
  setState,
}) => {
  return (
    <div className={divClassName + " py-1 px-4"}>
      <label htmlFor="" className="">
        {`${title}: `}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        className={"bg-gray-50 " + inputClassName}
        value={state}
        onChange={(ev) => setState(ev.target.value)}
      />
    </div>
  );
};

export default CustomWidgetInfo;
