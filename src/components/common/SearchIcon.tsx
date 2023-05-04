import React from "react";

interface Props {
  color: string;
  viewBox: string;
  size: number;
}

const SearchIcon = (props: Props) => {
  const { color, viewBox, size } = props;

  return (
    <svg
      role="presentation"
      viewBox={viewBox}
      width={size}
      height={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
    </svg>
  );
};

export default SearchIcon;
