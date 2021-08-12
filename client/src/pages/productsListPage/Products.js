import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { Button} from '@material-ui/core'
// import {Redirect} from 'react-router-dom'
import ProductList from '../../components/productList/ProductList'
import './products.css'
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../../redux/actions/productsAction'

const Products = () => {
    // const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(state => state.products);
    


    useEffect(() => {
        
        dispatch(getProducts());
    }, [dispatch])

    // if(auth.role !== 1) {
    //     return <Redirect to="/login" />
    // }

    const createHandler = () => {
        history.push('/createproduct');
    };

    return (
        <div>
            <div className="product">
                <form className="create_form" noValidate autoComplete="off">
                    {/* <TextField label="create new product" variant="outlined" fullWidth margin="dense" /> */}
                    <Button onClick={createHandler} style={{margin : "1rem 0"}} variant="contained" color="primary">create new product</Button>
                </form>
                <div className="product_list">
                    {products.map((product) => (
                        <ProductList key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products
