import {Link} from "react-router-dom";
export function CartSummary(props) {
    function getSummary() {
        if (props.cartItems > 0 ) {
            return (
                <span>
                    {props.cartItems} item(s), ${props.cartPrice.toFixed(2)}
                </span>
            );
        } else {
            return <span>Your cart: (empty)</span>
        }
    }

    function getLinkClasses() {
        return `btn btn-sm bg-dark text-white ${props.cartItems === 0 ? "disabled": ""}`;
    }

    return (
        <div className="float-right">
            <small>
                { getSummary() }
                <Link className={getLinkClasses()} to="/shop/cart">
                    <i className="fa fa-shopping-cart"></i>
                </Link>
            </small>
        </div>
    );
}