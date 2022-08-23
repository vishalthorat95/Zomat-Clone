import React, { useState } from "react"
import "../Styles/register.css"
import axios from "axios"


const Register = () => {

 

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:7878/register", user)
            .then( res => {
                alert(res.data.message)
          
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="register">
            {console.log("User", user)}
            <input type="text" className="form-control" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" className="form-control" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" className="form-control"name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" className="form-control"name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <button className="btn btn-block btn-success" onClick={register} >Sign in</button>
        </div>
    )
}

export default Register