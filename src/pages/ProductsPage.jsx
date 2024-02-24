import Products from "../components/products/Products";
import Slidebar from "../components/slidebar/Slidebar";
import MainLayout from "../layouts/MainLayout";

function ProductsPage() {
    return (
        <div className="container">
            <MainLayout>
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-2">
                        <Slidebar />
                    </div>
                    <div className='col-sm-12 col-md-8 col-lg-10'>
                        <Products />
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}
export default ProductsPage