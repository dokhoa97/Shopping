import { useState } from "react";

const SizeList = [
    {
        id: 1,
        name: 'Size M',
        price: 0
    },
    {
        id: 2,
        name: 'Size L',
        price: 6000
    },
]
export default function Size({ setSizePrice }) {
    const [collapse, setCollapse] = useState(false)
    const handleSize = (item) => {
        setSizePrice(item)
    }

    return (
        <div className="accordion-item  py-2 d-flex flex-column justify-content-center">
            <h5 className="accordion-header">
                <span role="button" className={`accordion-button fs-5 ${collapse ? 'collapsed' : ''}`}
                    onClick={() => setCollapse(!collapse)}>
                    Size
                </span>
            </h5>
            {
                collapse && (
                    <div className="form-group d-flex mx-4 fs-5">
                        {
                            SizeList.map((item, index) => (
                                <div key={index} className="form-check py-1 d-flex justify-content-between">
                                    <div className="mx-4">
                                        <input className="form-check-input " type="radio" name="price"
                                            id={item.id}
                                            defaultChecked={index === 0}
                                            onInput={() => handleSize(item)}
                                        />
                                        <label
                                            type="button"
                                            htmlFor={item.id}
                                            className='form-check-label'
                                        >
                                            {item.name}
                                        </label>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}