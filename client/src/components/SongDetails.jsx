import React, { useEffect, useContext,useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Message from './Message'
import Header from "./Header";
import Footer from "./footer";
import { createProductReview } from '../api/index'
import RatingStars from './RatingStars'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { GlobalContext } from "../Context/GlobalContext";
import { useStateValue } from "../Context/StateProvider";
import { Row, Col, ListGroup } from 'react-bootstrap'
import moment from "moment";
import {FaStar} from 'react-icons/fa'

const SongDetails = ({match}) => {
    const params = useParams();
    const productid = params.productid;
    const { cart, addToCart, updateCart } = useContext(GlobalContext);
    const [product, setProduct] = useState([]);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const PRODUCT_CREATE_REVIEW_RESET = 'PRODUCT_CREATE_REVIEW_RESET'
    const [{ user }] = useStateValue();
    const {
        success: successProductReview,
        error: errorProductReview,
      } = productReviewCreate
    
       useEffect(() => {
        if (successProductReview) {
          alert('Review Submitted!')
          setRating(0)
          setComment('')
          dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

       }, [dispatch, match, successProductReview])
    
       const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          createProductReview(match.params.id, {
            rating,
            comment,
          })
        )
      }
    
    const downloadfile = ()=>{
        const element = document.createElement("a");
        element.setAttribute("href", product.songUrl);
        element.setAttribute("download", product.name);
        element.setAttribute("target","_blank");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };
    
    useEffect(() => {
        axios({
            url: `http://localhost:4000/api/songs/getOne/${productid}`,
            method: "get",
        })
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [productid]);

    const createdAt = moment(new Date(product.createdAt)).format("MMMM Do YYYY");

    const addToCartHandler = () => {
        const newItem = {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.imageURL,
          BPM: product.BPM,
          language: product.language,
          


        };
    
        const findItem = cart.find((item) => item.id === product._id);
    
        if (findItem) {
          console.log("exist");
          updateCart(product._id);
          console.log(cart);
          return;
        }
    
        addToCart(newItem)
    
        console.log(cart);
        console.log(newItem);
      };


return (

    <div className="w-full h-auto flex flex-col items-center justify-center bg-zinc-800">
        <Header />

        <div className="w-1510 flex flex-row py-5">
            <div className="w-340 h-650 px-2 py-4 hover:shadow-xl  bg-zinc-900 shadow-md rounded-lg flex flex-col items-center">
                <img src={product.imageURL} className="w-225 h-300 mt-5" />
                    <h2 className="text-gray-300 text-3xl "> {product.name}</h2>
                     <h3 className="text-gray-300 text-xl mt-12 flex flex-row"> {product.artist}
                        <IoMdCheckmarkCircle className="text-sky-500 mt-1 ml-1" /></h3> 
                        <h3 className="text-gray-300 text-xl mt-12 flex flex-row">Tonal {product.language}</h3>
                        <h3 className="text-gray-300 text-xl mt-12 flex flex-row">BPM {product.BPM}</h3>
                        <RatingStars
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                        <p className="text-base text-textColor w-275 min-w-[160px] text-center">Published: {createdAt}</p>
                        <button 
                        className="bg-gray-300 mt-8 text-black rounded-sm px-3 "
                        onClick={downloadfile}>Free Download</button>
                        </div>

        <div className="w-1012 h-656  bg-zinc-900 shadow-md rounded-lg ml-14">

            <h2 className="hover:text-red-400 text-gray-200 ml-8">{product.name} </h2>
            <h4 className="hover:text-red-400 text-gray-300 mt-24 ml-8 text-2xl">License</h4>
            <div className="w-880 h-225 px-2 hover:shadow-xl  bg-zinc-700 shadow-md rounded-lg flex flex-col items-center ml-14">
                <h3 className="text-gray-300 mt-3 ml-8 text-xl">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more</h3>
            </div>

            <hr className="w-880 text-gray-700 ml-14 mt-12"/>
           
              <h3 className="my-2 text-xl text-gray-400 flex justify-end mr-14 mt-10">
            TOTAL:</h3>
            <h3 className="my-2 text-3xl text-gray-100 flex justify-end mr-14 ">{product.price}$</h3>

            <div className="flex justify-end mr-14 mt-6">
            <button onClick={addToCartHandler}
            className="w-190 h-60 flex items-center self-end py-3 px-5 bg-red-500 text-xl text-white rounded hover:bg-gray-300 hover:text-orange-400">
                <IoCartOutline className="pr-2 flex items-start text-yellow-500 group-hover:text-headingColor text-4xl cursor-pointer" />
              Add To Cart</button></div>
                    </div>
          
                    <Row>
          <Col md={6}>
            <h2 className="text-xl">Reviews</h2>
            {product.reviews === 0 && <Message>No Reviews</Message>}
               <ListGroup variant='flush'>
             
                 <ListGroup.Item>
                 {errorProductReview && (
                     <Message variant='danger'>{errorProductReview}</Message>
                   )}
                   {user ? (
                     <form className="form" onSubmit={submitHandler}>
                     <div>
                       <h2 className="text-xl">Write a customer review</h2>
                     </div>
                     <div>
                       <label htmlFor="rating">Rating</label>
                       <select id="rating" value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                           <option value="">Select</option>
                           <option value="1">1- Bad</option>
                           <option value="2">2- Fair</option>
                           <option value="3">3- Good</option>
                           <option value="4">4- Very good</option>
                           <option value="5">5- Excelent</option>


                       </select>
                     </div>
                       <div>
                       <label htmlFor="comment">Comment</label>
                       <textarea
                         id="comment"
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                       ></textarea>
                     </div>
                    
                     <div>
                       <label />
                       <button className="primary" type="submit">
                         Submit
                       </button>
                     </div>
                     
                   </form>
                     
                   ) : (<Message>Please <Link to='/login'
                   >sign in</Link>to write a review</Message>)}
                   
                 </ListGroup.Item>
              </ListGroup>
              

          </Col>
        </Row>

        )

        
        

        

    )
                            </div>
        <Footer />
    </div>


);
};

export default SongDetails;