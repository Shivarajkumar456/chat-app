import React from 'react';

const Login = ()=>{
    return (
        <div className="formContainer">
            <div  className="formWrapper">
                <span className="logo">Logo</span>
                <span className="title">Register</span>
                <form>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign Up</button>
                </form>
                <p>You don't have an account? Register</p>
            </div>
        </div>
    )
}

export default Login;