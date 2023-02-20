import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser, setUser, toggleLoading } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";

function App() {
  const dispatch = useDispatch()
  console.log(process.env)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        dispatch(getUser(user.email))
      } else {
        dispatch(toggleLoading())
      }
    })
  }, [])
  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
