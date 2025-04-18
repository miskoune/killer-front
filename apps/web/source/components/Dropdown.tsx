import { useState } from 'react';

import Active from '@/assets/icons/active.svg?react';
import Expand from '@/assets/icons/expand.svg?react';
import { onEnter } from '@/helpers/keys';

interface Props {
  items: string[];
  activeItem: string;
  onClick: (item: string) => void;
}

export function Dropdown({ items, activeItem, onClick }: Props) {
  const [showList, setShowList] = useState(false);

  const handleShowList = (): void => {
    setShowList(!showList);
  };

  const handleClick = (item: string): void => {
    onClick(item);
    setShowList(false);
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="flex items-center justify-between p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
        onClick={handleShowList}
        onKeyDown={({ key }) => onEnter({ key, fn: handleShowList })}
      >
        <p className="text-lg">{activeItem}</p>
        <Expand />
      </div>
      {showList && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md">
          {items.map((item) => (
            <div
              role="button"
              tabIndex={0}
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
              key={item}
              onClick={() => handleClick(item)}
              onKeyDown={({ key }) =>
                onEnter({ key, fn: () => handleClick(item) })
              }
            >
              <p className="text-lg">{item}</p>
              {item === activeItem && <Active />}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
