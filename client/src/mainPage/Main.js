import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import Header from '../components/header/Header'
import Cart from '../pages/cart/Cart'
import Admin from '../pages/dashboard/Admin'
import DashboardHome from '../components/dashboardHome/DashboardHome'
import Detail from '../pages/detail/Detail'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Users from '../pages/users/Users'
import ProductCreate from '../pages/product/ProductCreate'
import UserInfo from '../components/userInfo/UserInfo'
import Products from '../pages/productsListPage/Products'
import ProductInfo from '../components/productInfo/ProductInfo'
import Catagories from '../pages/catagories/Catagories'
import Uprofile from '../pages/userProfile/Uprofile'

const Main = () => {
    const [currentId, setCurrentId] = useState(null);
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/product/:id" component={Detail} />
                <Route path="/cart" component={Cart} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/admin" component={Admin} />
                <Route path="/dashboardHome" component={DashboardHome} />
                <Route path="/users" component={Users} />
                <Route path="/user_info/:id" component={UserInfo} />
                <Route path="/createproduct" render={(props) => <ProductCreate {...props} currentId={currentId} setCurrentId={setCurrentId} />} />
                <Route path="/products" component={Products} />
                <Route path="/product_info/:id" render={(props) => <ProductInfo {...props} setCurrentId={setCurrentId} />} />
                <Route path="/catagories" render={(props) => <Catagories {...props} currentId={currentId} setCurrentId={setCurrentId} />} />
                <Route path="/profile" component={Uprofile} />
            </Switch>
        </div>
    )
}

export default Main
