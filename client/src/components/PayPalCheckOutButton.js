import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";


const PaypalCheckoutButton = (props) => {
  const { cart } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    alert("Поздравляю, оплата прошла успешно!");
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

  return (
    <PayPalButtons
    onClick={(data, actions) => {
        // Validate on button click, client or server side
        const hasAlreadyBoughtCourse = false;
      
        if (hasAlreadyBoughtCourse) {
          setError(
            "You already bought this course. Go to your account to view your list of courses."
          );
      
          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
    createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: cart.price
              }
            }
          ]
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture(); 
        console.log("order", order);
      
        handleApprove(data.orderID);
      }}
      onCancel={() => {
  // Display cancel message, modal or redirect user to cancel page or back to cart
        }}
        
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
      
      />
  );
}
  
export default PaypalCheckoutButton;