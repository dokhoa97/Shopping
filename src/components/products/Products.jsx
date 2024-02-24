import { useEffect, useState, } from "react"
import Product from "./Product"
import { useDispatch, useSelector } from "react-redux"
import productSlice, { fetchDataThunkAction } from "../../redux-toolkit/productSlice"
import { Selector, productsSelector } from "../../store/selector"
import ProductModal from "./ProductModal";
import { MdLocalDrink } from "react-icons/md";
import { FaEquals, FaTimes } from "react-icons/fa";
import { set, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
const schema = yup.object({
    fullname: yup.string().required(),
    mobile: yup.string().required(),
})
function Products() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const dispatch = useDispatch()
    const filteredProducts = useSelector(Selector)
    useEffect(() => {
        dispatch(fetchDataThunkAction())
    }, [])
    const [productId, setProductId] = useState(null)
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])
    const [amount, setAmount] = useState()
    const [quantity, setQuantity] = useState()
    const [sizePrice, setSizePrice] = useState({})
    const [cafe, setCafe] = useState({})
    const handleModal = (product) => {
        let sizeObj = { ...sizePrice, price: 0, name: 'Size M' }
        let cafeObj = { ...cafe, value: 'Đá', name: 'Đá' }
        setCafe(cafeObj)
        setSizePrice(sizeObj)
        setShow(true)
        setProductId(product?.id)
    }
    const handleDelete = (item) => {
        let copy = [...data]
        let index = data.findIndex(i => i.id === item.id)
        copy.splice(index, 1)
        let newSubTotal = 0
        for (let item of copy) {
            newSubTotal += Number(item.subtotal)
        }
        let quantitySub = 0
        for (let item of copy) {
            quantitySub += Number(item.quantity)
        }
        setData(copy)
        setAmount(newSubTotal)
        setQuantity(quantitySub)
    }
    console.log(data);
    const handleCheckOut = (customerIfo) => {
        Swal.fire({
            title: `Tên:${customerIfo.fullname}`,
            text: `Bill:${amount ? Number(amount) : '0'} VND`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                setAmount()
                setData([])
                reset()
                const BIll = { sp: [...data], customer: customerIfo, bill: amount, orderDate: new Date().valueOf() }
                dispatch(productSlice.actions.addCustomer(BIll))
                toast.success('Order is in progress !! Please wait a monent')
            }
        })
    }
    return (
        <>
            <div className="py-2 d-flex flex-column justify-content-center">
                <h6>Sản phẩm</h6>
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="row">
                            {
                                filteredProducts?.map((product) => <Product product={product} key={product.id} handleModal={handleModal} />)
                            }
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 ">
                        <div>
                            <table className="table h-50">
                                <thead>
                                    <tr>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Số Lượng</th>
                                        <th scope="col" colSpan={2} >Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.title}-{item.size}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.subtotal}</td>
                                                <td role="button"
                                                    onClick={() => handleDelete(item)}
                                                >
                                                    <FaTimes />
                                                </td>
                                            </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-around fs-4 ">
                            <span className="d-flex align-items-center text-primary"><MdLocalDrink /></span>
                            <span className="d-flex align-items-center"><FaTimes /></span>
                            <span className="d-flex align-items-center">{quantity ? `${quantity}` : 0}</span>
                            <span className="d-flex align-items-center"><FaEquals /></span>
                            <span className="d-flex align-items-center">{
                                amount ? `${amount}` : 0
                            } </span>
                        </div>
                        <form onSubmit={handleSubmit(handleCheckOut)}>
                            <div className="customer-info p-3">
                                <h3 className="border-bottom py-2">Customer Info</h3>
                                <div className="form-group mb-3">
                                    <label className="form-label">Fullname</label>
                                    <input type="text"
                                        className={`${errors.fullname?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Fullname"
                                        {...register('fullname')}
                                    />
                                    <span className="invalid-feedback">{errors.fullname?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Mobile</label>
                                    <input type="text"
                                        className={`${errors.mobile?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Mobile"
                                        {...register('mobile')}
                                    />
                                    <span className="invalid-feedback">{errors.mobile?.message}</span>
                                </div>
                            </div>
                            <div className=" bg-success mt-2 d-flex align-items-center justify-content-center text-white btn-checkout">
                                <button type="submit" className="btn btn-block flex-grow-1">
                                    CHECKOUT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ProductModal show={show} handleClose={setShow}
                productId={productId} setAmount={setAmount}
                data={data} setData={setData}
                sizePrice={sizePrice}
                setSizePrice={setSizePrice}
                setCafe={setCafe} cafe={cafe} setQuantity={setQuantity}
            />
        </>
    )
}
export default Products