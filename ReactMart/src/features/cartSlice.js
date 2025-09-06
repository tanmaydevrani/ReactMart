import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[],
    totalQuantity:0,
    totalPrice:0
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const product = action.payload
            const existingItem = state.items.find((item)=>item.id===product.id);
            if(existingItem){
                existingItem.quantity+=1;
            }else{
                state.items.push({...product,quantity:1})
            }
            state.totalQuantity += 1;
            state.totalPrice+=product.price
        },
        removeFromCart:(state,action)=>{
            const productId = action.payload;
            const existingItem = state.items.find((item)=>item.id===productId);

            if(existingItem){
                state.totalQuantity -= 1;
                state.totalPrice -= existingItem.price;

                if(existingItem === 1){
                    state.items=state.items.filter((item)=> item.id!==productId)
                } else{
                    existingItem.quantity-=1;
                }
            }
        },
        clearCart:(state)=>{
            state.items=[],
            state.price=0,
            state.quantity=0
        }
    }
})

export const {addToCart,removeFromCart,clearCart}= cartSlice.actions

export default cartSlice.reducer