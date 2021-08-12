import { Button } from "@material-ui/core"
import {useHistory}  from "react-router-dom"
import {useDispatch} from "react-redux"
import "./productList.css"
import { deleteProduct } from "../../redux/actions/productsAction"

const ProductList = ({product, setCurrentId}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const productInfoHandle = () => {
        history.push(`/product_info/${product._id}`);
    };

    const userDeleteHandle = (id) => {
        dispatch(deleteProduct(id));
    };


    return (
        <div>
            <div className="product_row">
                <h5>{product.title}</h5>
                <div className="options">
                    <Button style={{marginRight : "5px"}} onClick={() => productInfoHandle(product._id)} size="small" variant="contained" color="primary">product_info</Button>
                    <Button style={{marginLeft : "5px"}} onClick={() => userDeleteHandle(product._id)} size="small" variant="contained" color="secondary">delete</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductList
