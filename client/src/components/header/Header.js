import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import './header.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { IconButton } from '@material-ui/core'
import { logout } from '../../redux/actions/authAction'

const Header = () => {
    const auth = useSelector(state => state.auth);
    const menuHandler = () => {
        alert("Hey it's working.");
    }

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <div>
            <div className="header">
                <div className="header_content">
                    
                    <h1 className="brand">eShop</h1>

                    {(auth.role === 0 ) ? (
                        <>
                            <ul className="header_list" style={{width : "95%"}}>
                                <li className="header_item">
                                    <span className="header_link_zero_greeting">Hello <span style={{fontWeight: "bold"}}>{auth.name}!</span></span>
                                </li>
                                <li className="header_item">
                                    <Link to="/" className="header_link_zero">Home</Link>
                                </li>
                                <li className="header_item">
                                    <Link to="/profile" className="header_link_zero">Profile</Link>
                                </li>
                                <li className="header_item">
                                    <Link to="/cart" className="header_link_zero">
                                        Cart
                                    </Link>
                                </li>
                                <li className="header_item">
                                    <IconButton variant="text" size="small" onClick={logoutHandler}>
                                        <ExitToAppIcon fontSize="small"/>
                                    </IconButton>
                                </li>
                            </ul>
                        </>
                    ) : (auth.role === 1) ? (
                        <>
                            <ul className="header_list" style={{width : "95%"}}>
                                <li className="header_item">
                                    <span className="header_link_zero_greeting">Hello <span style={{fontWeight: "bold"}}>{auth.name}!</span></span>
                                </li>
                                <li className="header_item">
                                    <Link to="/" className="header_link">Home</Link>
                                </li>
                                <li className="header_item">
                                    <Link to="/admin" className="header_link">Dashbord</Link>
                                </li>
                                <li className="header_item">
                                    <IconButton variant="text" size="small" onClick={logoutHandler}>
                                        <ExitToAppIcon fontSize="small"/>
                                    </IconButton>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul className="header_list">
                                <li className="header_item">
                                    <Link to="/" className="header_link">Home</Link>
                                </li>
                                <li className="header_item">
                                    <Link to="/cart" className="header_link">
                                        Cart
                                    </Link>
                                </li>
                                <li className="header_item">
                                    <Link to="/login" className="header_link">Login</Link>
                                </li>
                            </ul>
                        </>
                    )}
                    <div className="hamburgur_menu" onClick={menuHandler}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
