import {useHistory, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Button} from '@material-ui/core'
import './productInfo.css'
// import { getProduct } from '../../redux/actions/productsAction'

const ProductInfo = ({setCurrentId}) => {
    const history = useHistory();
    const params = useParams();
    // const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [productDetail, setProductDetail] = useState({});
    console.log(productDetail);

    useEffect(() => {
        if(params.id) {
            products.forEach((product) => {
                if(product._id === params.id) setProductDetail(product);
            })
        }
    })

    // if(productDetail.length === 0) return null;

    const goBackHandler = () => {
        history.push('/products');
    }

    const editHandler = () => {
        setCurrentId(params.id);
        history.push('/createproduct');
    }

    return (
        <div>
            <div className="product_info">
                <div className="product_info_block">
                    <h3 style={{textAlign : "center"}}>PRODUCT'S DETAIL INFORMATION</h3>
                    <ul className="detail_list">
                        <li className="detail_data">_id : <span className="colour">{productDetail._id}</span></li>
                        <li className="detail_data">ProductID :  <span className="colour">{productDetail.product_id}</span></li>
                        <li className="detail_data">Title: <span className="colour">{productDetail.title}</span></li>
                        <li className="detail_data">Price : <span className="colour">{productDetail.price}</span></li>
                        <li className="detail_data">Description : <span className="colour">{productDetail.description}</span></li>
                        <li className="detail_data">Content : <span className="colour">{productDetail.content}</span></li>
                        <li className="detail_data">Category :  <span className="colour">{productDetail.category}</span></li>
                        <li className="detail_data">CountInStock : <span className="colour">{productDetail.countInStock}</span></li>
                        <li className="detail_data">Quantity :  <span className="colour">{productDetail.qty}</span></li>
                        {/* <li className="detail_data">Image :  {productDetail.images}</li> */}
                        <li className="detail_data">Checked :  <span className="colour">{productDetail.checked}</span></li>
                    </ul>
                    <div className="btns">
                        <Button onClick={goBackHandler} variant="contained" color="primary" size="small">Go back</Button>
                        <Button onClick={editHandler} variant="contained" color="inherit" size="small">Edit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo
