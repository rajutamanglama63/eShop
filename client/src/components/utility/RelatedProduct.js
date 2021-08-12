import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core'
import useStyles from './styles'
import './relatedProduct.css'

// this page is to show detailed view of related products

const RelatedProduct = ({product}) => {
    const classes = useStyles();
    return (
        <div>
            <div className="card">
                <img className="card_image" src={product.images.url} alt="foto" width="100%" />
                <h4 style={{marginTop : "10px"}}>{product.title}</h4>
                <span className="price">Rs. {product.price}</span>
                <p className="desc">{product.description} </p>
                <div className="btn">
                    <Link to={`/product/${product._id}`} style={{textDecoration : "none", color : "navy"}}>
                        <Button className={classes.btn1} variant="contained" color="inherit" size="small">view</Button>
                    </Link>
                    <Button className={classes.btn2} variant="contained" color="primary" size="small">cart</Button>
                </div>
            </div>
        </div>
    )
}

export default RelatedProduct
