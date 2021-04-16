import {PaginationButtons} from "./PaginationButtons";
export function PaginationControls(props) {
    var pageSizes = props.sizes || [5, 10, 25, 100];
    var sortKeys = props.keys || ["Name", "Price"];

    const handlePageSizeChange = (ev) => {
        props.setPageSize(ev.target.value);
    }

    const handleSortKeyChange = (ev) => {
        props.setSortKey(ev.target.value);
    }

    return (
        <div className="m-2">
            <div className="text-center m-1">
                <PaginationButtons currentPage={props.currentPage}
                    pageCount={props.pageCount}
                    navigate={props.navigateToPage}/>
            </div>
            <div className="form-inline justify-content-center">
                <select className="form-control"
                    onChange={handlePageSizeChange}
                    value={props.pageSize || pageSizes[0]}>
                        { pageSizes.map(s => 
                            <option value={s} key={s}>{s} per page</option>
                        )}
                    </select>
                    <select className="form-control"
                        onChange={handleSortKeyChange}
                        value= {props.sortKey || sortKeys[0] }>
                        { sortKeys.map(k =>
                            <option value={k.toLowerCase()} key={k}>
                                Sort By {k}
                            </option>
                        )}    
                    </select>
            </div>
        </div>
    );
}