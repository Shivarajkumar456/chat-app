import Add from '../img/addAvatar.png'

const Register = ()=>{
    return (
        <div className="formContainer">
            <div  className="formWrapper">
                <span className="logo">Logo</span>
                <span className="title">Register</span>
                <form>
                    <input type="text" placeholder="User Name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input style={{display:"none"}} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="pic" />
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign Up</button>
                </form>
                <p>do you have an account? login</p>
            </div>
        </div>
    )
}

export default Register;