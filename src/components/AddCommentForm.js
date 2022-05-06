

import React, { useEffect, useState } from "react";
import Axios from 'axios';
import '../style/FormContainer.css';

 export default function AddCommentForm ({addComment}) {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [displayAlert, setDisplayAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formIsValid = () => {
        return name !== "" && commentText !== "";
    }

    const getDate = () => {
        const now = Date.now();
        const msgTime = new Date(now);
        const createdAt = msgTime.toUTCString();
        return createdAt;
    }

    useEffect(() => {
        setErrMessage('');
    }, [name,commentText])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formIsValid) {
            setHasError(true);
            setErrMessage("All fields requred");
            return;
        }

        setIsLoading(true);

        const timeStamp = getDate();

        Axios.post('http://localhost:3001/createComment', {
            name: name,
            message: commentText,
            created: timeStamp
        })
        .then(function (response) {
            addComment({name: name, message: commentText, created: timeStamp});
            setCommentText('');
            setName('');
            setIsLoading(false);
            setDisplayAlert(true);
        })
        .catch(function (error) {
            console.log(error);
            setHasError(true);
            setErrMessage("An error occured during form submission");
        });
    }

    return (
      <>
      <form method="post" onSubmit={(e) => {handleSubmit(e)}}>
        {displayAlert && (
          <div id="new-comments" 
            data-testid="new-comment-alert" 
            onClick={() => {setDisplayAlert(false)}}
          >
            New comments added!
          </div>
        )}
        <div className="form-group">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control"
            placeholder="Name"
            name="name"
            type="text"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value)
            }}
            className="form-control"
            placeholder="Enter Comment"
            name="message"
            rows="10"
            required
          />
        </div>

        {hasError && (
            <div className="alert">{errMessage}</div>
        )}

        <div className="form-group">
         <button data-testid="submit-comment" disabled={isLoading}>
            Comment
        </button>
        </div>
      </form>
      </>
    );
}