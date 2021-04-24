import { Link } from "react-router-dom";
import { PaginationControls } from "../PaginationControls";
import { ProductsRow } from "./ProductsRow";

export function ProductsTable(props) {
    return (
        <div>
            <h4 className="bg-info text-white text-center p-2">
                { props.totalSize } Products
            </h4>
            <PaginationControls keys={["ID", "Name", "Category"]}
                {...props} />
            <table className="table table-sm table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th className="text-right">Price</th>
                        <th className="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    { props.products.map(prod =>
                        <ProductsRow key={ prod.id } product={ prod }
                            deleteProduct={ props.deleteProduct } />)}
                </tbody>
            </table>
            <div className="text-center">
                <Link to="/admin/products/create" className="btn btn-primary">
                    Create Product
                </Link>
            </div>
        </div>
    );
}