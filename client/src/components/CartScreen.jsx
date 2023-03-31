import React, { useContext,useEffect } from "react";
import Header from "./Header";
import { useStateValue } from "../Context/StateProvider";
import { GlobalContext } from "../Context/GlobalContext";
import { getAllArtist } from "../api";
import { actionType } from "../Context/reducer";
import { IoLogoPaypal } from "react-icons/io5";
import  '../styles/style_media.css'
import PaypalCheckoutButton from "./PayPalCheckOutButton"

const CartScreen = () => {
    const { cart, removeItem } = useContext(GlobalContext);
    //console.log(cart);
    const [{ artists}, dispatch] = useStateValue();

    useEffect(() => {
        if (!artists) {
            getAllArtist().then((data) => {
                dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
            });
        }
    }, []);

    const totalprice = cart.reduce((acc, rec) => (acc += rec.price), 0);


    return (

        <div className="w-full p-4 flex items-center flex-col">
     
            <Header />
            
            
            <div className=" main relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex justify-evenly">
            <div className="w-1012 flex flex-col "> <p className=" text-black text-3xl pt-14 pl-16 flex mb-14 items-center justify-evenly">Cart Buskets</p>
            <hr className="w-656 bg-red-800 h-0.5 ml-24 my-3 "/>
            <div className="flex justify-center ">
              <p className="mx-36">ITEM</p>
              <p className="mx-36">PRICE</p>
            </div>
            
          

            {cart.length > 0 ? (
              cart.map((item) => {
                return (
                  
                    <div className="flex ml-24 my-1 justify-between">
                      
                    <ul className="flex items-center  ">

                    <li className="">
                      <img src={item.image} className="flex w-18 h-16 rounded-sm" />                      
                    </li>
                  
                    <li className= "ml-5 text-lg ">
                      {item.name}
                    </li>
                    </ul>


                    <div className="flex">
                    <ul className="flex mr-24 items-center ">
              
                    <li className="">
                      ${item.price.toFixed(2)}
                    </li>
                   
                   
                    <li className=" ml-5">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="py-1 px-2 rounded bg-red-500 text-white"
                      >
                        Remove
                      </button>
                    </li>
                    </ul>
                    
                    </div>
                    
                    </div>
                    
                    
                );
              })
            ) : (
              <ul>
                <li colSpan="6" className="text-center font-bold text-3xl">
                  No Item Selected
                </li>
              </ul>
            )}
            </div>
            <div className=" check w-880 h-600 bg-black flex flex-col mr-56 mt-24 rounded-xl">
                <h1 className="text-gray-200 text-2xl ml-8 mt-8 flex flex-col">Check List</h1>
                <div className="flex flex-row items-center mx-5 my-8">
                  {artists &&
                        artists.map((data) => (
                            <>
                                  <img src={data?.imageURL} className="flex w-50 h-50 object-cover rounded-full "/>                                 
                            </>
                        ))} <p className=" text-gray-50 flex ml-4">Seldon</p>
                        
                        </div>
                       
                        <hr className="w-508 text-gray-800 ml-6"/>
                        <p className=" text-gray-50 flex ml-6 mt-5 text-lg items-center ">Total Gross
                        <h3 className="my-2 text-lg text-gray-100 items-end flex  ml-auto mr-7 "> ${totalprice}</h3></p>
                        <p className=" text-gray-50 flex ml-6  text-lg items-center ">Discount
                        <h3 className="my-2 text-lg text-gray-100 items-end flex  ml-auto mr-7"> -$0.00</h3></p>

                        <p className=" text-yellow-200 flex ml-8 mt-5 text-2xl  items-center ">Total
                        <h3 className="my-2 text-2xl text-yellow-200 items-end flex  ml-auto mr-7 "> ${totalprice}</h3></p>

                      <IoLogoPaypal className="mr-1" icon="fa-brands fa-paypal " />
                      {/* <PaypalCheckoutButton   cart={cart.reduce((items) => (items.price))}/> */}
                      
              </div>
            
        </div>
        </div>

);
                                             
};

export const ArtistCard = ({data}) => {
  <img
  src={data?.imageURL}
  className="w-300 h-96 object-cover rounded-md "
  alt=""
/>
};


export default CartScreen;