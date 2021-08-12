import { Button } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import RelatedProduct from '../../components/utility/RelatedProduct'
import { addToCart } from '../../redux/actions/cartAction'
import "./detail.css"

const Detail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    const [qty, setQty] = useState(1);
    const [detailProduct, setDetailProduct] = useState([]);
    

    useEffect(() => {
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    const addToCartHandler = () => {
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) {
                    dispatch(addToCart(product._id, qty));
                }
            })
        }
    }

    return (
        <div>
            <div className="detail">
                <div className="detail_item">
                            <img className="detailed_image" src={detailProduct.images.url} alt="foto" width="100%" />
                            <div className="detailed_info">
                                <div className="title_id">
                                    <h2>{detailProduct.title}</h2>
                                    <span className="p_id">PID : {detailProduct.product_id}</span>
                                </div>
                                <p>Price : Rs. {detailProduct.price}</p>
                                <p className="desc">
                                    {detailProduct.description}
                                </p>
                                <p>
                                    Status: <span>{detailProduct.countInStock > 0 ? "In stock" : "Out of stock"}</span>
                                </p>
                                <span className="sold">
                                    Qty : 
                                            <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(detailProduct.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                </span>
                                <Link to="/cart" style={{textDecoration : "none"}}>
                                    <Button variant="contained" color="primary" size="small" onClick={addToCartHandler}>Add to cart</Button>
                                </Link>
                            </div> 
                </div>
            </div>

            <div className="products">
                <h4 style={{margin : "1rem 0"}}>Related products</h4>
                <div className="grid_container">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <RelatedProduct key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Detail
