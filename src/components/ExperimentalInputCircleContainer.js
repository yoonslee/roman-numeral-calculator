import React from "react";

function ExperimentalInputCircleContainer({
  width,
  hasError,
  previousOperation
}) {
  const maxHeight = 300;
  const height = width > maxHeight ? maxHeight : width;
  const r1 = maxHeight / 2.5;
  const r2 = maxHeight / 2.9;
  const cx = width / 2;
  const cy = height / 2;

  const stroke = hasError
    ? "#ffc000"
    : !previousOperation
    ? "white"
    : "#00ff74";

  return (
    <svg width={width} height={height}>
      <circle
        cx={cx}
        cy={cy}
        r={r1}
        strokeDasharray="1,6"
        strokeWidth={1}
        stroke={stroke}
        fill="transparent"
      >
        {!previousOperation && (
          <animate
            attributeType="XML"
            attributeName="stroke-width"
            from={1}
            to={10}
            dur="4s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      <circle
        cx={cx}
        cy={cy}
        r={r2}
        strokeWidth={1}
        stroke={stroke}
        fill="transparent"
        opacity={!previousOperation ? 0.1 : 1}
      >
        {!previousOperation && (
          <animate
            attributeType="XML"
            attributeName="opacity"
            from={0}
            to={0.3}
            dur="4s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  );
}

export default ExperimentalInputCircleContainer;
