import React,{useState} from 'react'
import '../Styles/Header.css'
import Modal from 'react-modal';
import FacebookLogin from "react-facebook-login"
import GoogleLogin from "react-google-login"
// import Link from 'react-router-dom'
import Login from './login';
import Register from './register';




const modalStyle = {
  content: {

    width: "450px",
    height: "550px",
    tranform: "translate(-50%,-50%)",
    margin: "10px 360px 150px",
    overflow: "hidden"


  }
}


Modal.setAppElement('#root')
export default function Header() {

  


   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

   const facebookLogin= (response) => {
    console.log(response);
  }

  const googleLogin=(response) => {
    console.log(response);

  }  
    return (
        <div className="header">
                <div className="s-logo">
                    <span>e!</span>
                </div>
                <div className="btn-group login-block">
                    
                    <span className="login-l" onClick={()=>setIsLoginModalOpen(true)}>LogIn</span>
                    <span className="signUp"onClick={() => setIsSignUpModalOpen(true)}> Create an account</span>
                </div>
                <Modal isOpen={isLoginModalOpen} style={modalStyle}>
        <h3 class="alert alert-success">
          Login
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="btn btn-outline-success float-end"
          >
            X
          </button>
        </h3>
        
        <form>
          <div>
         <Login/>
           
          </div>

          <div className="mt-4">
            <FacebookLogin
              appId="355531226495595"
              textButton="Continue with Facebook"
              fields="name,email,picture"
              callback={facebookLogin()}
              cssClass="btn-facebook"
              icon="fa-facebook"
              // textButton="&nbsp;&nbsp;Sign In with Facebook"
            />

            <GoogleLogin
              clientId="677091314387-ebn6ijk8qncv6f1hd6t2ftoo3tp96g2u.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={googleLogin()}
              onFailure={googleLogin()}
              cookiePolicy={"single_host_origin"}
              cssClass="btn-google"
              className="btn-google"
            />
          </div>
        </form>
      </Modal>
      <Modal isOpen={isSignUpModalOpen} style={modalStyle}>
        <h2 class="alert alert-success">
          Create an account
          <button
            onClick={() => setIsSignUpModalOpen(false)}
            className="btn btn-outline-success float-end"
          >
            X
          </button>
        </h2>
        <form>
    
          <div>
          <Register/>
 
          </div>
        </form>
      </Modal>
      
        </div>
    )
    }
