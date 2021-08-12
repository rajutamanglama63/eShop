import {Redirect, useParams} from "react-router-dom"
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import "./Uprofile.css"
import { getUser } from "../../redux/actions/userAction";

const Uprofile = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getUser(params.id));
    }, [dispatch])

    if(auth.role !== 0) {
        alert("You are not authoried. Please login");
        return <Redirect to='/login' />
    }
    return (
        <div>       
            <div className="user_profile">
                <div className="user_detail">
                    <h2 style={{textAlign : 'center', marginBottom : "15px"}}>My Account</h2>
                    <h4 className="area">Name : <span className="detail">{auth.name}</span></h4>
                    <h4 className="area">Email : <span className="detail">{auth.email}</span></h4>
                    <h4 className="area">Address : <span className="detail">Ichangu Narayan</span></h4>
                    <h4 className="area">Orders : <span className="detail">You have orderd 2 items.</span></h4>
                </div>
            </div>
        </div>
    )
}

export default Uprofile
