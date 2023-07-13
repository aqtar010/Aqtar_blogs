//import { gptRequestHandler } from "../../utils/chatGPT/chatgpt.utils";
import BlogTile from "../blog-tile.component.jsx/blogtile.component";
import "./home.styles.scss";
import { useEffect, useState, useRef } from "react";
const Home = () => {
  const [blogList, setBlogList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null);
  const handleUserInputField = (e) => {
    setUserInput(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setBlogList((prev) => {
      return [...prev, { category: e.target.category.value }];
    });
    setUserInput("");
    inputRef.current.focus();
  };
  useEffect(() => {
    if (blogList.length) {
      //gptRequestHandler(blogList[blogList.length-1].category)
    }
  }, [blogList]);

  return (
    <div id="home">
      <div className="quote">
        <h1 className="Home-title">
          Welcome to this blog <br/><strong>BLOG GEN</strong>
        </h1>
        <p>
          This is a personal project which leverages chatGPT 3.5 model to
          generate a blog on user input topics along with a relevant image
          fetched from Unsplash Api.
        </p>
      </div>
      <form type="submit" onSubmit={(e) => formSubmitHandler(e)}>
        <input
          type="text"
          placeholder="Enter a category to be summoned"
          name="category"
          ref={inputRef}
          onChange={(e) => {
            handleUserInputField(e);
          }}
          value={userInput}
        ></input><br/>
        <button type="submit">Submit</button>
      </form>

<div className=""></div>
      <div className="blogs">
        {blogList.map((item, index) => {
          return <BlogTile key={index} category={item.category} />;
        })}
      </div>
    </div>
  );
};

export default Home;
