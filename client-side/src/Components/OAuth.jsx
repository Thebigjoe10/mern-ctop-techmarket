import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import { getAnalytics, logEvent } from "firebase/analytics"; // Import the logEvent function
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/user.Slice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
const dispatch = useDispatch()
const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/oauth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data =await res.json()
      dispatch(signInSuccess(data))
      navigate("/")
      
      // Log a custom event using Google Analytics for Firebase
      const eventName = "button_click";
      logEvent(getAnalytics(app), eventName, {
        param1: "value1",
        param2: "value2",
        // Add additional parameters as needed
      });
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="border-solid border-2 border-slate-600 p-3 bg-slate-50 rounded-lg flex items-center justify-center hover:opacity-95"
    >
      <img
        width="24"
        src="https://img.icons8.com/color/48/google-logo.png"
        alt="google-logo"
        className="mr-2"
      />
      <span className="uppercase text-gray-900">Continue with Google</span>
    </button>
  );
}
