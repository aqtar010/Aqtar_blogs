import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar.component/navbar.component";
//import Home from "./components/home.component/home.component";
//import About from "./components/about.component/about.component";
//import Auth from "./components/authPage.component/auth.component";
import BlogPage from "./components/blogs.component/blogs.component";
import { useDispatch } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./features/user.slice/user.slice";

function App() {
  const dispatch = useDispatch();
  const About = lazy(() =>
    import("./components/about.component/about.component")
  );
  const Home = lazy(() => import("./components/home.component/home.component"));
  const Auth = lazy(() =>
    import("./components/authPage.component/auth.component")
  );
  // const BlogPage = lazy(() =>
  //   import("./components/blogs.component/blogs.component")
  // );

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blogs" element={<BlogPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
