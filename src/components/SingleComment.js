import React from "react";
import '../style/CommentContainer.css';

export default function SingleComment(props) {
   const { created, message, name } = props.comment;
   
    return (
        <div className="CommentContainer" data-testid="single-comment">
            <div className="comment">{message?.trim()}</div>
            <div className="metaData">{name} on {created}</div>
        </div>
    );
}