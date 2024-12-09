import React from "react";

const CustomWidgetInfo = ({
  title,
  type,
  divClassName,
  inputClassName,
  state,
  setState,
}) => {
  return (
    <div className={divClassName + " border py-1 px-4 "}>
      <label htmlFor="" className="">
        {`${title}: `}
      </label>
      <input
        type={type}
        className={inputClassName + " bg-gray-50"}
        value={state}
        onChange={(ev) => setState(ev.target.value)}
      />
    </div>
  );
};

export default CustomWidgetInfo;
