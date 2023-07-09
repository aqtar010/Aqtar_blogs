import "./blogtile.styles.scss";
import { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const BlogTile = ({category}) => {
  const api = import.meta.env.VITE_API_KEY;
  const [imgUrls, setImgUrls] = useState([]);
  const [generatedText,setGeneratedText]=useState('')
  let count = 0;
  useEffect(() => {
    if (count === 1) {
        console.log(category);
      axios
        .get(
          `https://api.unsplash.com/photos/random?client_id=${api}&query=${category}&orientation=landscape&count=1&content_filter=high`
        )
        .then((response) => {
          setImgUrls(response.data); // Access the `data` property of the response
        });
    } else {
      count++;
    }
  }, []);
  return (
    <div className="blog-tile-component">
      <div className="image-display-container">
        {imgUrls.map((elem, index) => {
          return (
            <img key={index} src={elem.urls.small} alt={`Image ${index}`} />
          );
        })}
      </div>
      <div>
        <p>
          {generatedText}
        </p>
      </div>
    </div>
  );
};
export default BlogTile;
