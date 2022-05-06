import React, { useState, useEffect} from "react";
import Axios from 'axios';
import './App.css';
import CommentFeed from "./components/CommentFeed";
import AddCommentForm from "./components/AddCommentForm";

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const addComment = (comment) => {
    setLoading(false);
    setComments([...comments, comment]);
  }

  const fetchData = async () => {
    return await Axios.get("http://localhost:3001/getComments");
  };

  useEffect(() => {
    fetchData()
    .then((data) => {
      setLoading(false);
      setComments(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },[])

  return (
    <div className="App">
      <div className="row">
        {loading && (
          <div data-testid="loading">Loading...</div>
        )}
        <div className="form-container" data-testid="form-container">
          <h3 id="comments-hdr">Comments</h3>
          <AddCommentForm addComment={addComment} />
        </div>
        <div data-testid="comment-feed-container">
          <CommentFeed
          loading={loading}
          comments={comments}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
