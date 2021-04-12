import { CategoryNavigation } from "./CategoryNavigation";
import { ProductList } from "./ProductList";

export function Shop(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-white">
                    <div className="navbar-brand">SPORTS STORE</div>
                </div>
            </div>
            <div className="row">
                <div className="col-3 p-2">
                    <CategoryNavigation baseUrl="/shop/products" categories={props.categories}></CategoryNavigation>
                </div>
                <div className="col-9 p-2">
                    <ProductList products={props.products}></ProductList>
                </div>
            </div>
        </div>
    );
}