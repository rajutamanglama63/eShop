import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { deleteCatagory} from '../../redux/actions/catagoryAction'
import './catagoryList.css'

const CatagoryList = ({catagory, setCurrentId}) => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const catagoryDeleteHandler = (id) => {
        dispatch(deleteCatagory(id));
    };

    const catagoryUpdateHandler = (id) => {
        setCurrentId(id);
        // history.push('/catagories');
    };

    return (
        <div>
            <div className="catagory_row">
                <h5>{catagory.name}</h5>
                <div className="options">
                    <Button style={{marginRight : "5px"}} onClick={() => catagoryUpdateHandler(catagory._id)} size="small" variant="contained" color="primary">update</Button>
                    <Button style={{marginLeft : "5px"}} onClick={() => catagoryDeleteHandler(catagory._id)} size="small" variant="contained" color="secondary">delete</Button>
                </div>
            </div>
        </div>
    )
}

export default CatagoryList
