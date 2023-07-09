import { Fragment, useEffect, useRef } from "react";
import "./blog.styles.scss";
import { useSelector } from "react-redux";

const BlogPage = () => {
  const titleRef = useRef(null);
  const blogTextRef = useRef(null);
  const userLoginState = useSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    console.log(userLoginState);
  }, [userLoginState]);
  const handleSubmit = (e) => {
    e.preventDefault();
    titleRef.current.focus();
  };
  return (
    <Fragment>
      {userLoginState ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="Title" ref={titleRef} required />
          <br />
          <input
            type="text"
            placeholder="Write your blog here"
            ref={blogTextRef}
            required
          />
          <br />
          <button type="submit">Submit Blog</button>
        </form>
      ) : (
        <h2>Please log In</h2>
      )}
    </Fragment>
  );
};
export default BlogPage;
