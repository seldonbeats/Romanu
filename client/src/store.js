import { createStore, combineReducers } from 'redux'


 import { productReviewCreateReducer } from './Context/reducer'


 const reducer = combineReducers({
   productReviewCreate: productReviewCreateReducer,
   
 })



 const store = createStore(
   reducer,

 )

 export default store