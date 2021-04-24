import { Link } from "react-router-dom";

export function ProductsRow(props) {
    return (
        <tr>
            <td> { props.product.id }</td>
            <td> { props.product.name }</td>
            <td> { props.product.category }</td>
            <td className="text-right"> { props.product.price.toFixed(2) } </td>
            <td className="text-center">
                <button className="btn btn-sm btn-danger mx-1"
                    onClick= { () => props.deleteProduct(props.product.id)}>
                    Delete
                </button>
                <Link to={`/admin/products/${props.product.id}`}
                    className="btn btn-sm btn-warning">
                    Edit
                </Link>
            </td>
        </tr>
    );
}