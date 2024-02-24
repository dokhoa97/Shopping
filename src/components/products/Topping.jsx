import { useState } from "react"
const toppingList = [
    {
        id: 1,
        name: "Thêm trân châu sương mai",
        price: 6000
    },
    {
        id: 2,
        name: "Thêm trân châu hoàng kim",
        price: 5500
    },
    {
        id: 3,
        name: "Thêm thạch café",
        price: 5000
    },
    {
        id: 4,
        name: "Thêm Phô Mai Tươi",
        price: 7000
    },
    {
        id: 5,
        name: "Thêm rau câu",
        price: 6000
    },
    {
        id: 6,
        name: "Bánh plan",
        price: 10000
    },
]
export default function Topping({ setToppingPrice }) {
    const [collapse, setCollapse] = useState(false)
    const [topping, setTopping] = useState([])
    const handleTopping = (item) => {
        let toppingPush = [...topping]
        if (toppingPush.includes(item)) {
            let index = toppingPush.findIndex(i => i.id === item.id)
            toppingPush.splice(index, 1)
        } else {
            toppingPush.push(item)
        }
        setTopping(toppingPush)
        let newSubTotal = 0
        for (let item of toppingPush) {
            newSubTotal += Number(item.price)
        }
        setToppingPrice(newSubTotal)
    }
    return (
        <div className="accordion-item  py-2 d-flex flex-column justify-content-center">
            <h5 className="accordion-header">
                <span role="button" className={`accordion-button fs-5 ${collapse ? 'collapsed' : ''}`}
                    onClick={() => setCollapse(!collapse)}>
                    Topping
                </span>
            </h5>
            {
                collapse && (
                    <div className="form-group">
                        {
                            toppingList.map((item, index) => (
                                <div key={index} className="form-check py-1 d-flex justify-content-between">
                                    <div>
                                        <input className="form-check-input" type="checkbox" name="price"
                                            id={`price_${index}`}
                                            value={item.price}
                                            onInput={() => { handleTopping(item) }}
                                        />
                                        <label
                                            role="button"
                                            htmlFor={`price_${index}`}
                                            className='form-check-label'
                                        >
                                            {item.name}
                                        </label>
                                    </div>
                                    <label
                                        role="button"
                                        htmlFor={`price_${index}`}
                                        className='form-check-label'
                                    >
                                        +{item.price}đ
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>

    )
}