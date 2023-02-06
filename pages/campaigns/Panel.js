import React, { useState, useEffect, useRef } from "react";
export default React.forwardRef(({ index }, ref) => (
  <div ref={ref}>{index + 1}</div>
));
