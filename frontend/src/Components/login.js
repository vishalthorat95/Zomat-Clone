import React, {useState} from "react"
import '../Styles/login.css'
import axios from "axios"


const Login = ({ setLoginUser}) => {

 
    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:7878/login", user)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
           
        })
    }
    return (
        <div className="login">
          
            <input type="text" className="form-control" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <button className="btn btn-block btn-success"  onClick={login}>Login</button>
            
           
        </div>
    )
}

export default Login