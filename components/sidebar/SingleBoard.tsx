"use client";

import { setActiveClass } from "@/app/features/modalSlice";
import { RootState } from "@/app/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";

type SingleBoardProps = {
  boardName: string;
  id: string;
};
const SingleBoard = ({ boardName, id }: SingleBoardProps) => {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const activeBoardId = useSelector(
    (state: RootState) => state.modal.activeBoardId
  );

  return (
    <li
      className={`single-board ${pathName === `/tasks/${id}` ? "active" : ""}`}
    >
      <span className="board-icon">
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
            fill="#828FA3"
          />
        </svg>
      </span>

      <Link href={`/tasks/${id}`}>{boardName}</Link>
    </li>
  );
};

export default SingleBoard;
