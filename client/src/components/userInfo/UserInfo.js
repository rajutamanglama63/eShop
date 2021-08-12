import {useState, useEffect} from 'react'
import {useParams, useHistory, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './userInfo.css'
import { Button } from '@material-ui/core'

const UserInfo = () => {
    const params = useParams();
    const history = useHistory();
    const users = useSelector(state => state.users)
    const auth = useSelector(state => state.auth)

    const [userDetail, setUserDetail] = useState([]);

    useEffect(() => {
        if(params.id) {
            users.forEach((user) => {
                if(user._id === params.id) setUserDetail(user);
            })
        }
    })

    const goBackHandler = () => {
        history.push('/users');
    }

    if(auth.role !== 1) {
        alert("You are not authorized!");
        return <Redirect to="/login" />
    }
    return (
        <div>
            <div className="user_info">
                <div className="user_info_block">
                    <h3 style={{textAlign : "center"}}>USER'S DETAIL INFORMATION</h3>
                    <ul className="detail_list">
                        <li className="detail_data">_id : <span className="colour">{userDetail._id}</span></li>
                        <li className="detail_data">Name :  <span className="colour">{userDetail.name}</span></li>
                        <li className="detail_data">Email :  <span className="colour">{userDetail.email}</span></li>
                        <li className="detail_data">Role :  <span className="colour">{userDetail.role}</span></li>
                    </ul>
                    <Button onClick={goBackHandler} variant="contained" color="primary" size="small">Go back</Button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
