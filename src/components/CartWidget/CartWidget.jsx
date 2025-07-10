import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router';

function CartWidget({cantidad}) {

  return (
    <div className="efw_cartWidget d-flex align-items-center">
        <Link to="/carrito">
            <FiShoppingCart /> ({cantidad}) 
        </Link>      
      {/* <a href="/carrito" className="text-dark position-relative me-3">       
      </a> */}
    </div>
  )
}

export default CartWidget;
