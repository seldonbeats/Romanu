import React, { useEffect, useState } from "react";
import { trees } from "../assets/img";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import {UserAuth} from "../Context/AuthContext"

const SignUp = ({ setAuth }) => {

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {createUser} = UserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
        await createUser(email,password)
        navigate("/login");
    } catch (e) {
        setError(e.message)
        console.log(e.message) 
    }
  };
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              window.localStorage.setItem("auth", "true");
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/home");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true")
      navigate("/", { replace: true });
  }, []);

  return (
    <div className='w-full h-screen flex'>
    <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
        <div className='w-full h-[550px] hidden md:block'>
            <img className='w-full h-full' src={trees} alt="/" />
        </div>
        <div className='p-4 flex flex-col justify-around'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-4xl font-bold text-center mb-20'>Sign Up</h2>
                <div>
                    <input className='border p-2 mr-2' type="text" placeholder='Username' />
                    <input onChange={(e) => setEmail(e.target.value)} className='border p-2 mr-2' type="text" placeholder='e-mail' />
                    <input onChange={(e) => setPassword(e.target.value)} className='border p-2' type="password" placeholder='Password' />
                </div>
                <button className='w-full py-2 my-4 bg-green-600 hover:bg-green-500'>Sign In</button>
                <p className='text-center'>Forgot Username or Password?</p>
            </form>
            <div
            onClick={loginWithGoogle}
            className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
          >
            <FcGoogle className="text-xl" />
            <p>Signin with Google</p>
          </div>
        </div>
    </div>
</div>
  );
};
export default SignUp;
