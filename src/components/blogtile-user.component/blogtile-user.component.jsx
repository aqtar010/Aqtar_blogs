/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { deleteBlog } from "../../utils/firebase/firebase.utils";
import "./blogtile-user.styles.scss";
import EditBlog from "../edit-blog.component/edit-blog.component";

const UserBlogtile = ({ elem, refetch }) => {
  const [editState,setEditState]=useState(false)
  const deleteBlogHandler = async () => {
    await deleteBlog(elem[1]);
    refetch();
  };
  useEffect(() => {
    refetch()
    
  }, [editState]);
  return (
    <Fragment>{
      editState?(<EditBlog elem={elem} setEditState={setEditState}/>):(
        <div className="user-blogs-container">
        <span className="user-blogs-img"></span>
        <span className="user-blog-content">
          <h2>{elem[0].blogTitle}</h2>
          <p>{elem[0].blogBody}</p>
          <button onClick={deleteBlogHandler}>Delete Blog </button>
          <button onClick={()=>{setEditState(true)}}>Edit Blog</button>
        </span>
      </div>)
      }
      
    </Fragment>
  );
};
export default UserBlogtile;
