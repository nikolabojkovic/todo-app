import { useEffect, useState } from "react";
import { SortDirection } from "../../models/ISort";
import { SortIcon } from "./SortIcon";

type Props = {
  column: string,
  text: string,
  disabled: boolean,
  sortDirection: SortDirection,
  onClick: (column: string, direction: SortDirection) => void
};

export function SortButton({ column, text, disabled, sortDirection, onClick }: Props) {

  const [direction, setDirection] = useState(sortDirection);

  useEffect(() => {
    setDirection(sortDirection);
  }, [sortDirection])

  return(
    <div className={disabled ? "App__sorting__item App__sorting__item--disabled" : "App__sorting__item"} onClick={() => {
      if (disabled) {
        return;
      }

      const newDirectionState = direction !== SortDirection.Asc ? SortDirection.Asc : SortDirection.Desc;
      setDirection(newDirectionState);
      onClick(column, newDirectionState);
    }}
    >
      <span>{text}</span> 
      <SortIcon sortDirection={direction}/>
    </div>
  )
}