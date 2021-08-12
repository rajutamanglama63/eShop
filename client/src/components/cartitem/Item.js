import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'
import './item.css'

const Item = ({cartItem, qtyChangeHandler, removeHandler}) => {
    return (
        <div>
            <div className="item">
                <div className="item_content">
                    <img className="pic" src={cartItem.images.url} alt="foto" width="100%" />
                    <p>{cartItem.title}</p>
                    <span>Rs. {cartItem.price}</span>
                    <select value={cartItem.qty} onChange={(e) => qtyChangeHandler(cartItem._id, e.target.value)}>
                        {[...Array(cartItem.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option> 
                        ))}
                    </select>
                    <Button size="small" color="secondary" variant="text" onClick={() => removeHandler(cartItem._id)}>
                        <DeleteIcon fontSize="medium" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Item
