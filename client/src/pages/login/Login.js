import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {TextField, Button, Typography} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import './login.css'
import { login } from '../../redux/actions/authAction'

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const auth = useSelector(state => state.auth);
    
    const [credentials, setCredentials] = useState({
        email : "",
        password : ""
    });

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(credentials.email, credentials.password));
        setCredentials({
            email : "",
            password : ""
        });
        history.push('/');
    }
    // if(auth._id) {
    //     return <Redirect to="/" />
    // }
    
    return (
        <div>
            <div className="auth">
                <div className="auth_content">
                    <h2 style={{textAlign : "center", margin : "1rem 0", color : "navy", letterSpacing : "4px"}}>Login</h2>
                    <form noValidate autoComplete="off" onSubmit={submitHandler}>
                        <TextField 
                         name="email"
                         fullWidth 
                         variant="outlined" 
                         label="Email" 
                         margin="dense" 
                         value={credentials.email}
                         onChange={(e) => setCredentials({...credentials, email : e.target.value})}
                        />
                        <TextField 
                         name="password"
                         fullWidth 
                         variant="outlined" 
                         label="Password" 
                         margin="dense" 
                         value={credentials.password}
                         onChange={(e) => setCredentials({...credentials, password : e.target.value})}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{margin : "1rem 0"}}>Login</Button>
                        <Typography variant="body1">
                            Not registered yet. <Link to='/register'>Register</Link>
                        </Typography>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
