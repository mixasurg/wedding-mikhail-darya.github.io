import type { CSSProperties } from "react";

const tokens = [
  "0",
  "1",
  "{",
  "}",
  "<3",
  "∞",
  "true",
  "love",
  "M×D",
  "17.10",
  "always",
  "us",
  "yes",
  "0101",
  "1100",
  "reality",
  "forever",
];

const streams = Array.from({ length: 24 }, (_, column) =>
  Array.from({ length: 76 }, (_, row) => {
    const offset = row * 7 + column * 11 + ((row + column) % 5);
    return tokens[offset % tokens.length];
  }).join("\n"),
);

export default function MatrixBackdrop() {
  return (
    <div className="matrix-backdrop" aria-hidden="true">
      <div className="matrix-grid" />
      <div className="matrix-vignette" />
      {streams.map((stream, index) => {
        const style = {
          "--stream-x": `${2 + index * 4.15}%`,
          "--stream-delay": `${-(index % 9) * 2.9}s`,
          "--stream-duration": `${25 + (index % 7) * 3.5}s`,
          "--stream-opacity": `${0.085 + (index % 4) * 0.018}`,
        } as CSSProperties;

        return (
          <span className="matrix-column" style={style} key={index}>
            {stream}
          </span>
        );
      })}
    </div>
  );
}
