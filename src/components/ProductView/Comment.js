import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { getComments, postComment } from "../../service/commentService";

function Comment(props) {
  return (
    <div className={`comment mt-4 text-justify ${props.float}`}>
      <img
        src={props.image}
        alt=""
        className="rounded-circle"
        width="40"
        height="40"
      />

      <h4>{props.name}</h4>
      <span>- {props.date}</span>
      <br />
    
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={props.rating} readOnly />
      </Box>
      <p>{props.commentText}</p>
    </div>
  );
}

function MainBody({ valueProduct }) {
  const [value, setValue] = useState(2);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const handlePostComment = async (event) => {
    event.preventDefault(); // Ngăn chặn sự kiện mặc định của form
    const user = JSON.parse(sessionStorage.getItem("user"));
    const formData = {
      user_id: user.user_id,
      product_id: valueProduct,
      rating: value,
      content: message,
    };
    await postComment(formData).then(() => {
      fetchComment();
    });
  };
  const fetchComment = async () => {
    const { comments } = await getComments(valueProduct);
    setData(comments);
  };
  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-5 col-md-6 col-12 pb-4">
            <h1>Comments</h1>
            {data.map((item) => (
              <>
                <Comment
                  key={item.id}
                  image="https://i.imgur.com/yTFUilP.jpg"
                  name={item.user.name}
                  rating={item.rating}
                  date="20 October, 2018"
                  commentText={item.content}
                  float="float-left"
                />
              </>
            ))}
          </div>
 
          <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
            <form id="align-form" onSubmit={handlePostComment}>
              <div className="form-group">
                <h4>Leave a comment</h4>
                <label htmlFor="message">Message</label>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating
                    name="rating"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
                <textarea
                  name="msg"
                  id="msg"
                  cols="30"
                  rows="5"
                  className="form-control"
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                ></textarea>
              </div>
              <div className="form-group">
                <button type="submit" id="post" className="btn">
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Comments({ valueProduct }) {
  return (
    <div>
      <MainBody valueProduct={valueProduct} />
    </div>
  );
}

export default Comments;
