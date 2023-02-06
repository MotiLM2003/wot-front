import React, { useState, useEffect } from "react";
import { getPercentageValue } from "../../../utils/math";

const index = () => {
  const value = useEffect(() => {
    getPercentageValue(1000, 20);
  }, []);
  return (
    <div>
      <div>
        <div>
          <input type="number" value={value} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default index;
