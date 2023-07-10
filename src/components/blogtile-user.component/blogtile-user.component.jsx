/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { deleteBlog } from "../../utils/firebase/firebase.utils";

const UserBlogtile = ({ elem,refetch }) => {
    const deleteBlogHandler=async ()=>{
        await deleteBlog(elem[1]);
        refetch()
    }
  return (
    <Fragment>
      <div>
        <h2>{elem[0].blogTitle}</h2>
        <p>{elem[0].blogBody}</p>
        <button onClick={deleteBlogHandler}>Delete Blog </button>
      </div>
    </Fragment>
  );
};
export default UserBlogtile;
