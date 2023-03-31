import React, { useState ,useContext, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo, Avatar } from "../assets/img";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";
import "../App.css";
import { FaCrown, FaCartPlus } from "react-icons/fa";
import { IoCart, IoCartOutline, IoExitOutline } from "react-icons/io5";
import { GlobalContext } from "../Context/GlobalContext";
import i18n from '../hooks/i18n';
import useLocalStorage from '../hooks/use-localstorage';
import LanguageIcon from '@mui/icons-material/Language';

import '../styles/flags.css';
import { useTranslation } from "react-i18next";

const Header = ({ setFilteredSongs }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [isMenu, setIsMenu] = useState(false);
  const [isMenuLang, setIsMenuLang] = useState(false);
  const { cart } = useContext(GlobalContext);


  const signout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/home", { replace: true });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };

  const signin = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

const { t } = useTranslation();

const handleLanguageChange = () =>{
  if (language === 'en' || language === 'ru'){
      i18n.changeLanguage('kz')
      setLanguage('kz')
  }
}
const handleLanguageChange2 = () =>{
  if (language === 'kz' || language === 'ru'){
      i18n.changeLanguage('en')
      setLanguage('en')
  }
}
const handleLanguageChange3 = () =>{
  if (language === 'en' || language === 'kz'){
      i18n.changeLanguage('ru')
      setLanguage('ru')
  }
}
  return (
  
    <header className=" flex items-center w-full p-4 md:py-2 md:px-6 bg-primary sticky top-0 z-50">
      <NavLink to={"/Home"} onClick={clearAllFilter}>
        <motion.img whileTap={{scale: 0.8 }} src={Logo}  className="w-14 flex justify-center items-center" alt="" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        {/* prettier-ignore */}
        <motion.li whileTap={{scale: 0.8 }} className="mx-5 text-lg"><NavLink to={'/home'} onClick={clearAllFilter} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>{t("Home")}</NavLink></motion.li>
        {/* prettier-ignore */}
        <motion.li whileTap={{scale: 0.8 }} className="mx-5 text-lg"><NavLink to={'/drumkit'}  className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>{t("Drum-Kit")}</NavLink></motion.li>
        {/* prettier-ignore */}
        <motion.li whileTap={{scale: 0.8 }} className="mx-5 text-lg"><NavLink to={'/price'}  className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>{t("Price")}</NavLink></motion.li>
        {/* prettier-ignore */}
        <motion.li whileTap={{scale: 0.8 }} className="mx-5 text-lg"><NavLink to={'/contact'}  className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>{t("Contact")}</NavLink></motion.li>
      </ul>

      <div
        className=" cursor-pointer flex justify-center items-center "
        onMouseEnter={() => setIsMenuLang(true)}
        onMouseLeave={() => setIsMenuLang(false)}
      >
         <div className='flags '>
    <LanguageIcon style={{width:'32px', height:'32px'}}/>
    </div>
      
      {isMenuLang && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-64 w-150 p-4 gap-4 bg-white shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
          >
     <button className="items-start text-base gap-2 text-textColor hover:font-semibold duration-150 transition-all ease-in-out" onClick={handleLanguageChange}>{t('Kazakh')}</button>
				<button className="items-start text-base gap-2 text-textColor hover:font-semibold duration-150 transition-all ease-in-out" onClick={handleLanguageChange2}>{t('English')}</button>
				<button className="items-start text-base gap-2 text-textColor hover:font-semibold duration-150 transition-all ease-in-out" onClick={handleLanguageChange3}>{t('Russian')}</button>
      </motion.div>
        )}</div>
                                   

      <motion.div whileTap={{scale: 0.8 }} className="flex items-center ml-auto px-8 cursor-pointer gap-2">
        <NavLink to={"/cart"}>                
          <span className="flex text-sm ml-7 px-3 py-0.5 bg-yellow-600 rounded-full text-gray-100 hover:bg-blue-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 "><IoCart className="flex text-2xl mr-2 text-yellow-400" />{cart.length}</span>
        </NavLink>
      </motion.div>

      <div
        className="flex items-center cursor-pointer gap-2 relative"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          src={ user ? user?.user.imageURL : Avatar}
          alt=""
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user ? user?.user.name : "Sign In"}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
          {t("Premium Member")}
            {" "}
            <FaCrown className="text-xm -ml-1 text-yellow-500" />{" "}
          </p>
          
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-white shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              {t("Profile")}
              </p>
            </NavLink>

            <NavLink to={"/cart"}>
              <p className="flex items-start text-base gap-2 text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                <IoCartOutline className="pr-1 flex items-start text-yellow-500 group-hover:text-headingColor text-2xl cursor-pointer" />
                {t("My Cart")}
              </p>
            </NavLink>
            <hr />
            {user?.user.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                  {t("Dashboard")}
                  </p>
                </NavLink>
                <hr />
              </>
            )}
            
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={signin}
            >
              {t("Sign In")}
            </p>
            
            {user?.user && (
              <>
              <hr />
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out flex"
              onClick={signout}
            >
              {t("Log Out")} <IoExitOutline className="text-md mx-2 flex  justify-center"/>
            </p>
            </>)}
          </motion.div>
        )}
      </div>
    </header>
    
  );
};

export default Header;
