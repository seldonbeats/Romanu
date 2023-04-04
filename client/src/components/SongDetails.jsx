import React, { useEffect, useContext,useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import { useDispatch, useSelector } from 'react-redux'
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { GlobalContext } from "../Context/GlobalContext";
import { useStateValue } from "../Context/StateProvider";
import moment from "moment";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row  } from 'reactstrap'
import {FaStar} from 'react-icons/fa'
import {createComment} from "../api/index"
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const SongDetails  = () => {
    const params = useParams();
    const productid = params.productid;
    const { cart, addToCart, updateCart } = useContext(GlobalContext);
    const [product, setProduct] = useState([]);
    const [{ user }] = useStateValue();
    const [comment, setComment] = useState({
        content: ''
    })
    const [setAlert, setSetAlert] = useState(null);
    const [alertMsg, setAlertMsg] = useState("");
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
    console.log(product);

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
          return;
        }
    
        addToCart(newItem) 
        console.log(cart);
      };

      const submitPost=()=>{


        if(comment.content.trim()===''){
            return
        }
        createComment(comment,product._id)
        .then(data=>{
            console.log(data)
            setAlertMsg("...Comment added");
            {setAlert && (
                <>
                  {setAlert === "success" ? (
                    <AlertSuccess msg={alertMsg} />
                  ) : (
                    <AlertError msg={alertMsg} />
                  )}
                </>
              )}
            setProduct({
                ...product,
                comments:[...product.comments,data.data]
            })
            setComment({
                content:''
            })
        }).catch(error=>{
            setAlertMsg("...Comment not added");
            console.log(error)
        })
    }

return (

    <div className="w-full h-auto flex flex-col items-center justify-center bg-zinc-800">
        <Header />

        <div className="w-1510 flex flex-row py-5">
            <div className="w-340 h-650 px-2 py-4 hover:shadow-xl  bg-zinc-900 shadow-md rounded-lg flex flex-col items-center">
                <img src={product.imageURL} className="w-225 h-300 mt-5" />
                    <h2 className="text-gray-300 text-3xl "> {product.name}</h2>
                     <h3 className="text-gray-300 text-xl mt-12 flex flex-row"> {product.artist}
                        <IoMdCheckmarkCircle className="text-sky-500 mt-1 ml-1" /></h3> 
                        <h3 className="text-gray-300 text-sd mt-3 flex flex-row">Tonal {product.language}</h3>
                        <h3 className="text-gray-300 text-sd mt-3 flex flex-row">BPM {product.BPM}</h3>
                      
                       
                        <p className="text-base text-gray-100 w-275 min-w-[160px] text-center">Published: {createdAt}</p>
                        <button 
                        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={downloadfile}>Free Download</button>
                        </div>

        <div className="w-1012 h-1233  bg-zinc-900 shadow-md rounded-lg ml-14">

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
  

              <Row className="my-4">

<Col md={

    {
        size: 9,
        offset: 1
    }
}>
      <h3>Comments ({product ? product.comments.length : 0})</h3>

{
    product && product.comments.map((c, index) => (
        <Card className="mt-4 border-0" key={index}>
            <CardBody>
                <CardText>
                    {c.content}
                </CardText>
            </CardBody>
        </Card>
    ))
}


    <Card className="mt-4 border-0" >
        <CardBody>

            <Input
                type="textarea"
                placeholder="Enter comment here"
                value={comment.content}
                onChange={(event) => setComment({content:event.target.value})}
            />

            <Button  onClick={submitPost} className="mt-2 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Submit</Button>
        </CardBody>
    </Card>

</Col>

</Row>

                    </div>               
                            </div>
        <Footer />
    </div>


);
};

export default SongDetails;