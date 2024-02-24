import { useState } from "react";

const CafeStylelist = [
    {
        value: 'Đá',
        name: 'Đá',
    },
    {
        name: 'Nóng',
        value: 'Nóng',
    },
]
export default function CafeStyle({ setCafe }) {
    const [collapse, setCollapse] = useState(false)
    const handleCafeStyle = (item) => {
        setCafe(item);
    }

    return (
        <div className="accordion-item  py-2 d-flex flex-column justify-content-center">
            <h5 className="accordion-header">
                <span role="button" className={`accordion-button fs-5 ${collapse ? 'collapsed' : ''}`}
                    onClick={() => setCollapse(!collapse)}>
                    Cafe style
                </span>
            </h5>
            {
                collapse && (
                    <div className="form-group d-flex mx-4 fs-5">
                        {
                            CafeStylelist.map((item, index) => (
                                <div key={index} className="form-check py-1 d-flex justify-content-between">
                                    <div className="mx-4">
                                        <input className="form-check-input " type="radio" name="value"
                                            id={item.value}
                                            defaultChecked={index === 0}
                                            onInput={() => handleCafeStyle(item)}
                                        />
                                        <label
                                            role="button"
                                            htmlFor={item.value}
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