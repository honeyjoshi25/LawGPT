import React from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="mx-2">
      <TailSpin
        height="20"
        width="20"
        color="white"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export const ThreeDotLoader = () => {
  return (
    <ThreeDots
      visible={true}
      height="20"
      width="20"
      color="rgb(0 238 255)"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
