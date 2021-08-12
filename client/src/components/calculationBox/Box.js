import React from 'react'
import {Button} from '@material-ui/core'
import './box.css'

const Box = ({getCartSubTotal, getCartCount}) => {
    return (
        <div>
            <div className="card_box">
                <h4>SubTotal({getCartCount()}) item</h4>
                <p style={{margin : "10px 0"}}>Rs. {getCartSubTotal()}</p>
                <Button fullWidth size="small" variant="contained" color="primary">Proceed</Button>
            </div>
        </div>
    )
}

export default Box
