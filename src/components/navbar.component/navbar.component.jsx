import { Link, Outlet } from "react-router-dom";
import "./navbar.styles.scss";
import { useSelector } from "react-redux";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <>
      <nav>
        <div className="nav-container">
          <Link to="/">
            <img src="/vite.svg" />
          </Link>
        </div>
        <div>
          <ul className="nav-List">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              {currentUser ? (
                <a
                  onClick={() => {
                    console.log("sign out ran");
                    signOutUser();
                  }}
                >
                  Sign Out
                </a>
              ) : (
                <Link to="/auth">Sign In</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
