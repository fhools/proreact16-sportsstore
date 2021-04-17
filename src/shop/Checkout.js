import { ValidatedForm } from "../forms/ValidatedForm";

export function Checkout(props) {
    var defaultAttrs = { type: "text", required: true};
    var formModel = [
        { label: "Name"},
        { label: "Email", attrs: { type: "email"}},
        { label: "Address" },
        { label: "City"},
        { label: "Zip/Postal Code", name: "zip"},
        { label: "Country" }];
    
    const handleSubmit = (formData) => {
        const order = {...formData, products: props.cart.map(item => 
            ({ quantity: item.quantity, product_id: item.product.id})) };
        props.placeOrder(order);
        props.clearCart();
        props.history.push("/shop/thanks");
    }

    const handleCancel= () => {
        props.history.push("/shop/cart");
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-white">
                    <div className="navbar-brand">SPORTS STORE</div>
                </div>
            </div>
            <div className="row">
                <div className="col m-2">
                    <ValidatedForm formModel={formModel}
                        defaultAttrs={defaultAttrs}
                        submitCallback={handleSubmit}
                        cancelCallback={handleCancel}
                        submitText="Place Order"
                        cancelText="Return to Cart" />
                </div>
            </div>
        </div>
    );
}