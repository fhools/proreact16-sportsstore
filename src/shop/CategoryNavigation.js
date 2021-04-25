import React from "react";
import {ToggleLink} from "../ToggleLink";
import { Link } from "react-router-dom";
export function CategoryNavigation(props) {
    return (
        <React.Fragment>
            <ToggleLink to={ `${props.baseUrl}/all`} exact={false}>
                All
            </ToggleLink>
            { props.categories && props.categories.map(cat =>
                <ToggleLink key={cat}
                  to={`${props.baseUrl}/${cat.toLowerCase()}`}>{cat}
                </ToggleLink>)}
            <Link className="btn btn-block btn-secondary fixed-bottom m-2 col-3"
                to="/admin">
                Administration
            </Link>
        </React.Fragment>        
    );
}