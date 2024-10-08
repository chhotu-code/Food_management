import React, { Children, createContext, useContext, useReducer } from "react";

const CardStateContext = createContext();
const CardDispatchContext = createContext();

const reducer = (state,action) =>{
    switch(action.type){
        case "ADD":
            return[...state,{id:action.id, name: action.name, qty:action.qty, size: action.size, price: action.price, img: action.img}]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1);
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food,index)=>{
                if(food.id === action.id){
                    arr[index] = {...food, qty:parseInt(action.qty) + food.qty, price: action.price + food.price}
                }
                return arr;
            })
            return arr;
            case "DROP":
                let empArray = []
                return empArray 
            default:
                console.log("Error in reducer");
    }
}
export const CardProivider = ({children})=>{

    const[state,dispatch] = useReducer(reducer,[])
    return(
        <CardDispatchContext.Provider value={dispatch}>
            <CardStateContext.Provider value={state}>
                {children}
            </CardStateContext.Provider>
        </CardDispatchContext.Provider>
    )
}
export const useCard = ()=> useContext(CardStateContext);
export const useDispatchCard = ()=>useContext(CardDispatchContext);