import { FiShoppingCart } from "react-icons/fi";

function CartWidget({cantidad}) {

  return (
    <div className="efw_cartWidget d-flex align-items-center">
      <a href="#" className="text-dark position-relative me-3">
        <FiShoppingCart /> ({cantidad}) 
      </a>
    </div>
  )
}

export default CartWidget;