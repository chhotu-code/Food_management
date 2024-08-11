import React, { useEffect, useRef, useState } from "react";
import { useCard, useDispatchCard } from "./ContextReducer";

export default function Cards(props) {
  const dispatch = useDispatchCard();
  const data = useCard();
  const priceRef = useRef();

  const option = props.option;
  const priceOption = Object.keys(option);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(""); 

  const handlerAddtoCard = async () => {
    let food = null;
    for (const item of data) {
      if (item.id === props.food_item._id) {
        food = item;
        break;
      }
    }

    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.food_item._id, price: price, qty: qty });
      } else {
        await dispatch({ type: "ADD", id: props.food_item._id, name: props.food_item.name, price: price, qty: qty, size: size });
      }
    } else {
      await dispatch({ type: "ADD", id: props.food_item._id, name: props.food_item.name, price: price, qty: qty, size: size });
    }

    console.log(data);
  };

  let price = qty * parseInt(option[size] || 0);
  
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3 gap-3" style={{ width: "19rem", maxHeight: "450px" }}>
        <img src={props.food_item.img} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.food_item.name}</h5>
          <p className="card-text">{props.food_item.description}</p>
          <div className="container">
            <select className="h-100 m-2 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                );
              })}
            </select>
            <select className="h-100 m-2 rounded bg-success" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOption.map((data) => {
                return <option key={data} value={data}>{data}</option>;
              })}
            </select>
            <div className="d-inline h-100 w-100">
              {price}/-
            </div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handlerAddtoCard}>Add to Card</button>
        </div>
      </div>
    </div>
  );
}
