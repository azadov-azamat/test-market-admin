import {useHistory, useLocation} from "react-router-dom"
import qs from "qs"
import ReactPaginate from "react-paginate"
import React from "react"

export default function CustomPagination({
                                             currentPage,
                                             size,
                                             total_count,
                                             totalPages,
                                             limit
                                         }) {
    const history = useHistory()
    const location = useLocation()
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    console.log(currentPage)
    const startIndex = (currentPage === 1 ? currentPage : ((currentPage - 1) * limit))
    const lastIndex = startIndex + (size - 1)
    const handlePaginate = (page) => {
        console.log(page.selected)
        history.push({
            pathname: location.pathname,
            search: qs.stringify({
                ...query,
                page: (page?.selected + 1) || undefined
            })
        })
    }

    return (
        <div className="mt-2 pagination-my d-flex align-items-center justify-content-between">
            <p>Ma`lumotlar {startIndex} dan {lastIndex} gacha, {total_count} ta dan
            </p>
            <div>
                <ReactPaginate
                    previousLabel={''}
                    nextLabel={''}
                    forcePage={currentPage - 1}
                    onPageChange={page => handlePaginate(page)}
                    pageCount={totalPages}
                    breakLabel={'...'}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    activeClassName="active"
                    pageClassName="page-item"
                    breakClassName="page-item"
                    nextLinkClassName="page-link"
                    pageLinkClassName="page-link"
                    breakLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextClassName="page-item next-item"
                    previousClassName="page-item prev-item"
                    containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-start pe-1'}
                />
            </div>
        </div>
    )
}