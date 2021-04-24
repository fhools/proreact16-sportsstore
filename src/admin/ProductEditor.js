import { Query } from "@apollo/react-components";
import { ProductCreator } from "./ProductCreator";
import { product } from "./clientQueries";

export function ProductEditor(props) {
    return (
        <Query query={ product } variables={ {id: props.match.params.id}} >
            { ({ loading, data }) => {
                if (!loading) {
                    return (
                        <ProductCreator {...props } product={data.product}
                            mode="edit" />
                    );
                }
                return null;
            }}
        </Query>
    );
}