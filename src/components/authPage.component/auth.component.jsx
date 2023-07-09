import "./auth.styles.scss";
import { useSelector } from "react-redux";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const history=useNavigate()
  return (
    <section>
      <p>This is auth</p>
      {currentUser ? <p>User is logged in</p> : <p>Please log in</p>}
      <button
        name="google-sign-in"
        onClick={async () => {await signInWithGooglePopup()
        history("/")
        }}
      >
        Sign in with google
      </button>
    </section>
  );
};
export default Auth;
