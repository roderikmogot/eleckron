import React from "react";

interface ITabProps {
  tabs: string[];
  methodIdx: number;
  handleMethodIdx: (i: number) => void;
}

const UITabs = ({ tabs, methodIdx, handleMethodIdx }: ITabProps) => {
  return (
    <ul className="flex gap-2">
      {tabs.map((tab, idx) => (
        <li key={idx}>
          <a
            href="#"
            onClick={() => handleMethodIdx(idx)}
            className={`px-4 py-2 font-bold ${
              methodIdx === idx
                ? "border-2 border-b-black border-t-transparent border-l-transparent border-r-transparent"
                : "text-gray-300"
            }`}
          >
            {tab}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UITabs;
