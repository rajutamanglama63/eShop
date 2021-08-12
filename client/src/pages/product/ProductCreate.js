import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, useHistory} from 'react-router-dom'
import {TextField, Button} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {getCatagories} from '../../redux/actions/catagoryAction'
import './productCreate.css'
import { createProduct, updateProduct, uploadPic } from '../../redux/actions/productsAction';

const ProductCreate = ({currentId, setCurrentId}) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const upload = useSelector(state => state.upload);
    const catagories = useSelector(state => state.catagories);
    // console.log(catagories)

    const toBeIndividuallyEditedProduct = useSelector((state) => currentId ? state.products.find((p) => p._id === currentId) : null);
    // console.log(upload.data);
    const history = useHistory();

    // const [selectOption, setSelectOption] = useState([]);

    // To upload picture in cloudinary
    const [picture, setPicture] = useState(""); 

    // To create product along with image we need uploaded pictures url
    // const [images, setImages] = useState("");

    const [productsData, setProductsData] = useState({
        product_id : "",
        title : "",
        price : "",
        category : "",
        description : "",
        content : "",
        countInStock : "",
        images : upload.data
    })

    useEffect(() => {
        dispatch(getCatagories());
    }, [dispatch]);
    
    useEffect(() => {
        if(toBeIndividuallyEditedProduct) setProductsData(toBeIndividuallyEditedProduct);
    }, [toBeIndividuallyEditedProduct]);

    // useEffect(() => {
    //     setSelectOption(catagories);
    // }, [catagories]);

    const uploadPicHandler = () => {
        try {
            let formData = new FormData()
            formData.append("file", picture);

            dispatch(uploadPic(formData));
        } catch (error) {
            console.log(error);
        }
    }

    const clear = () => {
        setCurrentId(null);
        setProductsData({
            product_id : "",
            title : "",
            price : "",
            category : "",
            description : "",
            content : "",
            countInStock : "",
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(currentId === null) {
            dispatch(createProduct(productsData));
            clear();
        }else{
            dispatch(updateProduct(currentId, productsData));
            clear();
        }
        
        history.push('/');
    }

    if(auth.role !== 1) {
        alert("You are not authorized!");
        return <Redirect to='/' />
    }

    return (
        <div>
            <div className="create_product">
                <h3 style={{textAlign : "center", color : "navy", marginBottom : "1rem"}}>Create Product</h3>
                <div className="image_upload">
                    <TextField 
                    type="file" 
                    margin="dense" 
                    onChange={(e) => setPicture(e.target.files[0])}
                    />
                    <Button onClick={() => uploadPicHandler()} size="small" variant="contained" color="primary">
                        <CloudUploadIcon fontSize="small" />
                    </Button>
                </div>
                <form className="product_form" autoComplete="off" noValidate onSubmit={submitHandler}>
                    <TextField 
                     variant="outlined" 
                     fullWidth 
                     label="Product id" 
                     margin="dense" 
                     value={productsData.product_id}
                     onChange={(e) => setProductsData({...productsData, product_id : e.target.value})}
                    />
                    <TextField 
                     variant="outlined" 
                     fullWidth
                     label="Title" 
                     margin="dense" 
                     value={productsData.title}
                     onChange={(e) => setProductsData({...productsData, title : e.target.value})}
                    />
                    <TextField 
                     variant="outlined" 
                     fullWidth
                     label="Price" 
                     margin="dense" 
                     value={productsData.price}
                     onChange={(e) => setProductsData({...productsData, price : e.target.value})} 
                    />
                    {/* <TextField 
                     variant="outlined" 
                     fullWidth 
                     label="Category" 
                     margin="dense" 
                     value={productsData.category}
                     onChange={(e) => setProductsData({...productsData, category : e.target.value})}
                    /> */}
                    <div className="select_option">
                        <select value={productsData.category} onChange={(e) => setProductsData({...productsData, category : e.target.value})}>
                            <option value="">Please select a category</option>
                            {catagories.map((catagory) => (
                                <option value={catagory._id} key={catagory._id}>
                                    {catagory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <TextField 
                     variant="outlined" 
                     fullWidth 
                     label="CountInStock" 
                     margin="dense" 
                     type="number" 
                     value={productsData.countInStock}
                     onChange={(e) => setProductsData({...productsData, countInStock : e.target.value})}
                    />
                    <TextField 
                     variant="outlined" 
                     multiline 
                     rows={4} 
                     fullWidth 
                     label="Description" 
                     margin="dense" 
                     value={productsData.description}
                     onChange={(e) => setProductsData({...productsData, description : e.target.value})}
                    />
                    <TextField 
                     variant="outlined" 
                     multiline 
                     rows={4} 
                     fullWidth 
                     label="Content" 
                     margin="dense" 
                     value={productsData.content}
                     onChange={(e) => setProductsData({...productsData, content : e.target.value})}
                    />
                    <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Create</Button>
                </form>
            </div>
        </div>
    )
}

export default ProductCreate
