import React from "react";
import SingleComment from "./SingleComment";
import '../style/CommentFeed.css';

export default function CommentFeed(props) {
  return (
    <div data-testid="comment-feed" className="commentFeed">
     {props.comments.length === 0 && !props.loading ? (
        <div className="alert text-center alert-info">
          Be the first to comment
        </div>
      ) : null}

      {props.comments.map((comment, index) => (
        <SingleComment key={index} comment={comment} />
      )).sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))}
      </div>
    );
  }