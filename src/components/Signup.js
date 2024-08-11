import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [userData, setUserData] = useState({ name: "", email: "", password: "", location: "" });

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                location: userData.location
            })
        });

        const json = await response.json();
        console.log(json);
        console.log(json.data);
        if (!json.success)
            alert("Please enter valid data");
    }

    const onChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    }

    return (
        <div className='container'>
            <form onSubmit={handlerSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name='name' value={userData.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={userData.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" name='location' value={userData.location} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={userData.password} placeholder="***********" onChange={onChange} />
                </div>
                <button type="submit" className="m-2 btn btn-success">Submit</button>
                <Link to="/login" className="m-2 btn btn-danger">Already Signed In</Link>
            </form>
        </div>
    );
}
