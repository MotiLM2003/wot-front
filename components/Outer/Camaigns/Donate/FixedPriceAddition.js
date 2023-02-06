import React from "react";

const FixedPriceAddition = ({ fixedFee, withClosing = false }) => {
  if (fixedFee <= 0) return null;
  const symbol = fixedFee < 1 ? "¢" : "$";
  const price = fixedFee < 1 ? fixedFee * 100 : fixedFee.toFixed(2);
  return (
    <div className="flex items-center">
      <div>
        &nbsp; + {fixedFee >= 1 && <span>{symbol}</span>}
        {price} {fixedFee >= 1 && ")"}
      </div>
      {fixedFee < 1 && (
        <span>
          {symbol} {withClosing && ")"}{" "}
        </span>
      )}
    </div>
  );
};

export default FixedPriceAddition;
