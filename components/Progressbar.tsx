import React from "react";

export default function Progressbar({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-5">
      <div
        className="bg-green-400 h-5 rounded-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
