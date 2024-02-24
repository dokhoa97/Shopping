import { CiCirclePlus } from "react-icons/ci";
function Product({ product, handleModal }) {
    return (
        <div className="col-md-4 mb-4  ">
            <div className="card card-item">
                <img src={product.images}
                    alt="card"
                    className="card-image-top"
                    style={{ width: "100%", height: "200px" }}
                />
                <div>
                    <div className="text-center ">
                        {product.title}
                    </div>
                    <div className="d-flex align-items-center justify-content-around my-2 fs-10">
                        <div className="text-danger">{product.price} VND</div>
                        <div className="text-primary"><CiCirclePlus size={20}
                            type="button"
                            onClick={() => handleModal(product)}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product