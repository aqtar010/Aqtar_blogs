import { Fragment, useEffect, useRef, useState } from "react";
import "./blog.styles.scss";
import { useSelector } from "react-redux";
import { createBlogDoc, queryBlog } from "../../utils/firebase/firebase.utils";
import UserBlogtile from "../blogtile-user.component/blogtile-user.component";

const BlogPage = () => {
  const titleRef = useRef(null);
  const blogTextRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [currentUserBlogs, setCurrentUserBlogs] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const blogDoc = {
        userName: currentUser.displayName,
        userEmail: currentUser.email,
        blogTitle: titleRef.current.value,
        blogBody: blogTextRef.current.value,
        timeStamp: Date.now(),
      };
      try {
        await createBlogDoc(blogDoc);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }

    blogTextRef.current.value = null;
    titleRef.current.value = null;
    titleRef.current.focus();
  };
  async function fetchData() {
    const bloglist = await queryBlog(currentUser.email);
    setCurrentUserBlogs(bloglist);
  }
  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return (
    <Fragment>
      {currentUser ? (
        <>
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
          {/* <button onClick={queryOnClickHandler}>Click me</button> */}
        </>
      ) : (
        <h2>Please log In</h2>
      )}
      {currentUserBlogs.length ? (
        currentUserBlogs.map((elem, index) => {
          return <UserBlogtile refetch={fetchData} key={index} elem={elem} />;
        })
      ) : (
        <>user don&apost have blogs</>
      )}
    </Fragment>
  );
};
export default BlogPage;
