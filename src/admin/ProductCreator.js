import { ValidatedForm } from "../forms/ValidatedForm";
import { Mutation } from "@apollo/client/react/components";
import { storeProduct, updateProduct } from "./clientMutations";

export function ProductCreator(props) {
    var defaultAttrs = { type: "text", required: true };
    var formModel = [ { label: "Name" }, { label: "Description"}, { label: "Category"}, {label: "Price", attrs: { type: "number"}}];
    var mutation = storeProduct;

    if (props.mode === "edit") {
        mutation = updateProduct;
        formModel = [ { label: "Id", attrs: { disabled: true}}, ...formModel]
            .map(item => ({...item, 
                            attrs: {...item.attrs,
                                    defaultValue: props.product[item.label.toLowerCase()]} 
                          }));
    }

    var navigate = () => { props.history.push("/admin/products");}

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col m-2">
                    <Mutation mutation = {mutation}>
                        { (saveMutation, {client}) => {
                            return (<ValidatedForm formModel={formModel} 
                                        defaultAttrs={ defaultAttrs }
                                        submitCallback = { data => {
                                            saveMutation({variables: { product:
                                                { ...data, price: Number(data.price) }}});
                                            if (props.mode !== "edit") {
                                                client.resetStore();
                                            }
                                            navigate();
                                        }}
                                        cancelCallback= {navigate}
                                        submitText="Save" cancelText="Cancel" />
                            );
                        }}
                    </Mutation>
                </div>
            </div>
        </div>
    );
}
