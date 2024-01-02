import React from "react";
import { Comment } from "../interfaces/character";
import { transformDate } from "../utils";

type Props = {
  comments: Comment[] | undefined;
  handleChange: (event: any) => void;
  handleSubmit: (event: any) => void;
  canComment: boolean;
  disabled: boolean;
  value: string;
};

function Comments({
  comments,
  canComment,
  handleSubmit,
  handleChange,
  disabled,
  value,
}: Props) {
  return (
    <>
      {comments &&
        comments.map((comment) => {
          return (
            <p
              key={comment.id}
              className="flex flex-row items-center justify-between border-2 border-slate-500 rounded-xl p-4 mt-2"
            >
              <span className="font-sans text-sm text-slate-300">
                {comment.body}
              </span>
              <span className="text-slate-400 text-xs">
                {transformDate(comment.createdAt)}
              </span>
            </p>
          );
        })}
      {canComment && (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full rounded h-[40px] mt-4 px-4 bg-slate-800 text-slate-300 focus:outline-none focus:border-teal-500"
            placeholder="Add a comment..."
            onChange={handleChange}
            value={value}
          />
          <button
            className="py-2 px-6 bg-blue-900 text-slate-300 rounded-xl self-end hover:bg-blue-800 w-full"
            type="submit"
            disabled={disabled}
          >
            Send
          </button>
        </form>
      )}
    </>
  );
}

export default Comments;
