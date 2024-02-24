import { CiShop } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrUserManager } from "react-icons/gr";
function Header() {
    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container border-bottom">
                <div className="navbar-brand d-flex align-items-center">
                    <Link to={'/'}>
                        <CiShop size={40} className="me-2" />
                    </Link>Khoa's Drink
                </div>
                <div>
                    <Link to={'/'}><GrUserManager className="me-2" size={25} /></Link>
                    <Link to={'/'}><FaUser className="me-2" size={25} /></Link>
                </div>
            </div>
        </nav>
    )
}
export default Header