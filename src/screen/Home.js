import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import { useState, useEffect } from 'react';

export default function Home() {
  const [food_items, setFoodItems] = useState([]);
  const [searchData, setsearchData] = useState('');
  const [food_category, setFoodCategory] = useState([]);


  const responce = async () => {
    try {
      const fetch_data = await fetch("http://localhost:5000/api/fooditems", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }

      });
      const responce = await fetch_data.json();
      // console.log(responce[0],responce[1]);
      setFoodCategory(responce[1]);
      setFoodItems(responce[0]);

    } catch (error) {
      console.error("fetching issue");
      console.log(error);
    }
  }

  useEffect(() => {
    responce()
  }, [])




  return (
    <>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search like Chicken, veg, fish, panner" aria-label="Search" value={searchData}  onChange={(e)=>setsearchData(e.target.value)}/>
                {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://wallpaperaccess.com/full/767152.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://wallpaperaccess.com/full/767048.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://wallpaperaccess.com/full/767277.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          food_category != [] ? food_category.map((cat_data) => {
            return (
              <div className="row m-2">
                <div key={cat_data._id} className='fs-3 m-3 '>{cat_data.CategoryName}</div>
                <hr />
                {
                  food_items != [] ? food_items.filter((food_data) => food_data.CategoryName == cat_data.CategoryName && food_data.name.toLowerCase().includes(searchData.toLocaleLowerCase())).map(filterData => {
                    return (
                      <div key={filterData._id} className="col-12 col-md-6 col-lg-3">
                        <Cards food_item = {filterData}
                          option={filterData.options[0]}
                          
                        />
                      </div>
                    )
                  }) : <div>No such data found</div>
                }
              </div>

            )
          }) : <div>No such data found</div>
        }

      </div>
      <div><Footer /></div>

    </>
  )
}
