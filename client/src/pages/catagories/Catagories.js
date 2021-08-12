import {TextField, Button} from '@material-ui/core'
import { useHistory, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import CatagoryList from '../../components/cagatoryList/CatagoryList'
import './catagories.css'
import { createCatagory, getCatagories, updateCatagory } from '../../redux/actions/catagoryAction'

const Catagories = ({currentId, setCurrentId}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const catagories = useSelector(state => state.catagories);

    const toBeUpdatedCatagory = useSelector((state) => currentId ? state.catagories.find((catagory) => catagory._id === currentId) : null)
    const [catagoryData, setCatagoryData] = useState({
        name : ""
    })

    useEffect(() => {
        dispatch(getCatagories());
    }, [dispatch]);

    useEffect(() => {
        if(toBeUpdatedCatagory) setCatagoryData(toBeUpdatedCatagory);
    }, [toBeUpdatedCatagory])


    const clear = () => {
        setCurrentId(null);
        setCatagoryData({
            name : ""
        })
    }

    const createCatagoryHandler = (e) => {
        e.preventDefault();
        if(currentId === null) {
            dispatch(createCatagory(catagoryData));
            clear();
        }else{
            dispatch(updateCatagory(currentId, catagoryData));
            clear();
        }
        history.push('/admin')
    } 

    if(auth.role !== 1) {
        alert("You are not authorized!");
        return <Redirect to='/' />
    }

    return (
        <div>
            <div className="catagory">
                <form className="create_form" noValidate autoComplete="off" onSubmit={createCatagoryHandler}>
                    <TextField 
                     label="create new catagory" 
                     variant="outlined" 
                     fullWidth 
                     margin="dense" 
                     value={catagoryData.name}
                     onChange={(e) => setCatagoryData({...catagoryData, name : e.target.value})}
                    />
                    <Button type="submit"  style={{margin : "1rem 0"}} variant="contained" color="primary">create catagory</Button>
                </form>
                <div className="catagory_list">
                    {catagories.map((catagory) => (
                        <CatagoryList key={catagory._id} catagory={catagory} setCurrentId={setCurrentId} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Catagories
