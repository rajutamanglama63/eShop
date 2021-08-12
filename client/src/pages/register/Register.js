import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {TextField, Button, Typography} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import './register.css'
import { register } from '../../redux/actions/authAction'

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const auth = useSelector(state => state.auth);
    const [user, setUser] = useState({
        name : "",
        email : "",
        password : ""
    });

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(user));
        alert("You are successfully registered. Now you can login")
        history.push('/login');
        setUser({
            name : "",
            email : "",
            password : ""
        });
    };

    // if(auth._id) {
    //     return <Redirect to='/' />
    // }

    return (
        <div>
            <div className="auth">
                <div className="auth_content">
                    <h2 style={{textAlign : "center", margin : "1rem 0", color : "navy", letterSpacing : "4px"}}>Register</h2>
                    <form noValidate autoComplete="off" onSubmit={submitHandler}>
                        <TextField 
                         fullWidth 
                         variant="outlined" 
                         label="Name" 
                         margin="dense" 
                         value={user.name}
                         onChange={(e) => setUser({...user, name : e.target.value})}
                        />
                        <TextField 
                         fullWidth 
                         variant="outlined" 
                         label="Email" 
                         margin="dense" 
                         value={user.email}
                         onChange={(e) => setUser({...user, email : e.target.value})}
                        />
                        <TextField 
                         fullWidth 
                         variant="outlined" 
                         label="Password" 
                         margin="dense" 
                         value={user.password}
                         onChange={(e) => setUser({...user, password : e.target.value})}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{margin : "1rem 0"}}>Register</Button>
                        <Typography variant="body1">
                            Already registered. <Link to='/login'>Login</Link>
                        </Typography>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
