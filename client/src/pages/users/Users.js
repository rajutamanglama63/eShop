import {useEffect} from 'react'
// import { Button, TextField} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import UserList from '../../components/userList/UserList'
import './user.css'
import {useDispatch, useSelector} from 'react-redux'
import {allUsers} from '../../redux/actions/userAction'

const Users = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    // console.log(users);

    // const [open, setOpen] = useState(false);

    // const handleOpen = () => {
    //     setOpen(true);
    // }

    // const handleClose = () => {
    //     setOpen(false);
    // }


    useEffect(() => {
        
        dispatch(allUsers());
    }, [dispatch])

    if(auth.role !== 1) {
        return <Redirect to="/login" />
    }
    return (
        <div>
            <div className="user">
                {/* <form className="create_form" noValidate autoComplete="off">
                    <TextField label="create user" variant="outlined" fullWidth margin="dense" />
                    <Button type="submit" style={{margin : "1rem 0"}} variant="contained" color="primary">create user</Button>
                </form> */}
                <h2 style={{textAlign : "center", margin : "1rem"}}>LIST OF REGISTERED USERS</h2>
                <div className="user_list">
                    {users.map((user) => (
                        <UserList key={user._id} user={user} />
                    ))}
                </div>
                {/* <div className="user_list">
                    {users.map((user) => (
                        <UserInfo key={user._id} user={user} open={open} handleOpen={handleOpen} handleClose={handleClose} />
                    ))}
                </div> */}
            </div>
        </div>
    )
}

export default Users
