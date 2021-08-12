import { Button } from "@material-ui/core"
import {useHistory}  from "react-router-dom"
import {useDispatch} from "react-redux"
import "./userList.css"
import { deleteUser } from "../../redux/actions/userAction"

const UserList = ({user}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const userInfoHandle = () => {
        history.push(`/user_info/${user._id}`);
    };

    const userDeleteHandle = (id) => {
        dispatch(deleteUser(id));
    };


    return (
        <div>
            <div className="user_row">
                <h5>{user.name}</h5>
                <div className="options">
                    <Button style={{marginRight : "5px"}} onClick={userInfoHandle} size="small" variant="contained" color="primary">user_info</Button>
                    <Button style={{marginLeft : "5px"}} onClick={() => userDeleteHandle(user._id)} size="small" variant="contained" color="secondary">delete</Button>
                </div>
            </div>
        </div>
    )
}

export default UserList
