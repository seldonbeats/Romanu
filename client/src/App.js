import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { getAuth, GoogleAuthProvider, inMemoryPersistence, signInWithPopup, } from "firebase/auth";
import { app } from "./config/firebase.config";
import { getAllSongs, validateUser } from "./api";
import { Dashboard, Drumkit, Home, Loader, Login, MusicPlayer, UserProfile } from "./components";
import { StateProvider, useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "./components/Contact";
import MyModal from "./components/Price";
import CartScreen from "./components/CartScreen";
import SongDetails from "./components/SongDetails";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import SignUp from "./components/SignUp";
// import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user, allSongs, song, isSongPlaying, miniPlayer}, dispatch] =
    useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true");
    
  useEffect(() => {
    
    firebaseAuth.onAuthStateChanged((userCred) => {
      
      if (userCred) { 
        setIsLoading(true);
        userCred.getIdToken().then((token) => {
           ///console.log(token);
          window.localStorage.setItem("auth", "true");
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(true);
      } else {
        setAuth(false);
        setIsLoading(true);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        window.localStorage.setItem("auth", "false");
        navigate("/home");
      }
    });
  }, []);

  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  return (
    // <AuthContextProvider>
    <PayPalScriptProvider
    options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
  >
    <AnimatePresence>
      <div className="h-auto flex items-center justify-center min-w-[680px]">
        {isLoading ||
          (!user && (
            <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
              <Loader />
            </div>
          ))}
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/drumkit" element={<Drumkit />} />
          <Route path="/price" element={<MyModal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/songdetails/:productid" element={<SongDetails />} />

        </Routes>

        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-20  inset-x-0 bottom-0  bg-white drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
    </PayPalScriptProvider>
    // </AuthContextProvider>
  );
}

export default App;
