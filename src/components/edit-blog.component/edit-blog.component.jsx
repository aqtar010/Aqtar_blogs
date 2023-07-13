/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { updateBlog } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const EditBlog = ({ elem, setEditState }) => {
    const history=useNavigate()
  const refTitle = useRef();
  const refBody = useRef();
  const [inputTitleValue, setTitleInputValue] = useState(elem[0].blogTitle);

  const handleTitleChange = (event) => {
    setTitleInputValue(event.target.value);
  }
  const [inputBodyValue, setBodyInputValue] = useState(elem[0].blogBody);

  const handleBodyChange = (event) => {
    setBodyInputValue(event.target.value);
  }
  const onUpdateHandler =async () => {
    await updateBlog(elem[1], {
      blogTitle: refTitle.current.value,
      blogBody: refBody.current.value,
    });
    setEditState(false)

  };
  return (
    <div>
      <input type="text" value={inputTitleValue} ref={refTitle} onChange={handleTitleChange}/>
      <input type="text" value={inputBodyValue} ref={refBody} onChange={handleBodyChange}/>
      <button type="submit" onClick={onUpdateHandler}>
        Update
      </button>
      <button
        onClick={() => {
          setEditState(false);
        }}
      >
        cancel
      </button>
    </div>
  );
};
export default EditBlog;
