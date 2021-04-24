import {ValidationError} from "./ValidationError";
import { useRef, useEffect, useState } from "react";
import React from "react";
import { GetMessages } from "./ValidationMessages";


function InputField(props) {
    const name = props.modelItem.name || props.modelItem.label.toLowerCase();
    return (
        <div className="form-group" key={ props.modelItem.label }>
                <label>{ props.modelItem.label}</label>
                <ValidationError errors={props.errors} />
                <input className="form-control"
                    name={ name } 
                    ref={props.forwardedRef}
                    {...props.defaultAttrs } {...props.modelItem.attrs } />
        </div>
    )
}
export function ValidatedForm(props) {
    var [validationErrors, setValidationErrors] = useState({});
    var formElements = useRef({});
    var [isSubmitting, setIsSubmitting] = useState(false);
    const { submitCallback } = props;
    const handleSubmit = () => {
        setValidationErrors({});
        Object.values(formElements.current).forEach(elem => {
            if (!elem.checkValidity()) {
                setValidationErrors(prevState => ({...prevState,
                                        [elem.name]: GetMessages(elem)}));
            }
        });
        setIsSubmitting(true);
    }

    useEffect(() => {
        if (Object.keys(validationErrors).length === 0 && isSubmitting) {
            const data = Object.assign(...Object.entries(formElements.current)
                .map(e => 
                    ({[e[0]]: e[1].value})));
            submitCallback(data);
        }
        setIsSubmitting(false);
    }, [validationErrors, submitCallback, isSubmitting]);

    return (
        <React.Fragment>
            {props.formModel.map((m,i) => 
                <InputField modelItem={m} key={m.name || m.label.toLowerCase()} forwardedRef={ (element) => (formElements.current[m.name || m.label.toLowerCase()] = element)}
                    defaultAttrs={props.defaultAttrs}
                    errors={validationErrors[(m.name || m.label.toLowerCase())]}/>)}
            <div className="text-center">
                <button className="btn btn-secondary m-1"
                    onClick = { props.cancelCallback }>
                        { props.cancelText || "Cancel"}
                    </button>
                <button className="btn btn-secondary m-1"
                    onClick= { handleSubmit }>
                    { props.submitText  || "Submit" }
                </button>
            </div>
        </React.Fragment>
    );
}