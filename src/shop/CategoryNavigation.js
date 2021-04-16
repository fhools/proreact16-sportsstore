import React from "react";
import {ToggleLink} from "../ToggleLink";
export function CategoryNavigation(props) {
    return (
        <React.Fragment>
            <ToggleLink to={ `${props.baseUrl}/all`} exact={false}>
                All
            </ToggleLink>
            { props.categories && props.categories.map(cat =>
                <ToggleLink key={cat}
                  to={`${props.baseUrl}/${cat.toLowerCase()}`}>{cat}</ToggleLink>)}
        </React.Fragment>        
    );
}