import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaPlus, FaShoppingCart, FaTimes } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import Topping from "./Topping";
import Size from "./Size";
import CafeStyle from "./CafeStyle";
import { v4 } from "uuid";
export default function ProductModal({ show, handleClose, productId, setAmount,
    data, setData, sizePrice, setSizePrice, setCafe, cafe, setQuantity }) {
    const [toppingPrice, setToppingPrice] = useState(0)
    const [modalList, setModalList] = useState({})
    useEffect(() => {
        async function getList() {
            let res = await fetch(`http://localhost:3030/products/${productId ?? ''}`)
            let data = await res.json()
            setModalList({
                ...data, quantity: 1,
                newPrice: data.price,
            })
        }
        getList()
    }, [productId])

    const handlePlus = () => {
        let copiedObj = {
            ...modalList
        }
        copiedObj.quantity = copiedObj.quantity + 1
        copiedObj.newPrice = copiedObj.quantity * modalList.price
        setModalList(copiedObj)
    }
    const handleMinus = () => {
        if (modalList.quantity <= 1) {
            handleModalClose()
        } else {
            let copiedObj = {
                ...modalList,
            }
            copiedObj.quantity = copiedObj.quantity - 1
            copiedObj.newPrice = copiedObj.quantity * modalList.price
            copiedObj.quantityPrice = Number(sizePrice.price) * copiedObj.quantity
            setModalList(copiedObj)
        }

    }
    const total = Number(modalList.newPrice) + Number(toppingPrice) + Number(sizePrice.price * modalList.quantity)
    const handleModalClose = () => {
        let copiedObj = {
            ...modalList,
        }
        copiedObj.quantity = 1
        copiedObj.newPrice = modalList.price
        setModalList(copiedObj)
        setToppingPrice(0)
        handleClose()
    }
    const handleAddToCart = () => {
        let CopiedArr = [...data]
        CopiedArr.push({
            ...modalList,
            id: v4(),
            subtotal: total,
            size: sizePrice.name,
            cafe: cafe.value
        })
        setData(CopiedArr)
        let copiedObj = {
            ...modalList,
        }
        copiedObj.quantity = 1
        copiedObj.price = modalList.price
        copiedObj.newPrice = modalList.price
        setModalList(copiedObj)
        setToppingPrice(0)
        handleClose()
        let newSubTotal = 0
        for (let item of CopiedArr) {
            newSubTotal += Number(item.subtotal)
        }
        setAmount(newSubTotal)
        let quantitySub = 0
        for (let item of CopiedArr) {
            quantitySub += Number(item.quantity)
        }
        setQuantity(quantitySub)
        setSizePrice(0)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header >
                <span type="button" onClick={handleModalClose}><FaTimes size={30} /></span>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row" key={modalList.id}>
                        <div>
                            <img src={modalList.images} style={{ height: "150px", width: '150px' }} alt="" />
                        </div>
                        <div className="d-flex flex-column flex-row-1 m-3">
                            <div className="fs-2 fw-bolder mb-4">{modalList.title}</div>
                            <div className="text-danger">{modalList.price}đ</div>
                            <div className="d-flex align-items-center my-2">
                                <div className="me-4 text-primary">
                                    <FaMinus onClick={handleMinus} />
                                </div>
                                <div className="me-4">
                                    <span>{modalList.quantity}</span>
                                </div>
                                <div className="me-4 text-primary">
                                    <FaPlus onClick={handlePlus} />
                                </div>
                                <div className="me-4 ">
                                    <span className="me-4">Total : {total ? `${total}` : `${modalList.price}`} VND</span>
                                    <span className="text-primary" type='button' onClick={handleAddToCart}><FaShoppingCart size={25} /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Size setSizePrice={setSizePrice} />
                        {(modalList.category === 'ts') && <Topping setToppingPrice={setToppingPrice} />}
                        {(modalList.category === 'cf') && <CafeStyle setCafe={setCafe} />}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
} 