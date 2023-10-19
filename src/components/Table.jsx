import ReactPaginate from 'react-paginate'
import qs from 'qs'
import {useHistory, useLocation} from "react-router-dom"
import {ChevronDown} from 'react-feather'
import DataTable from 'react-data-table-component'
import {Card, CardBody} from 'reactstrap'
import "../assets/scss/Table.scss"

const TableComponent = ({ref, data, total_count, columns, currentPage, totalPages, limit, size, ...rest}) => {

    const history = useHistory()
    const location = useLocation()
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})

    const startIndex = (currentPage === 1 ? (currentPage - 1) : ((currentPage - 1) * limit)) + 1
    const lastIndex = startIndex + (size - 1)

    const handleSort = (column) => {

        history.push({
            search: qs.stringify({
                ...query,
                sort: column?.sortField
            })
        })
    }

    const handlePaginate = (page) => {
        history.push({
            pathname: location.pathname,
            search: qs.stringify({
                ...query,
                page: (page?.selected + 1) || undefined,
                limit
            })
        })
    }

    const CustomPagination = () => (
        <div className='mt-2 pagination-my d-flex align-items-center justify-content-between'>
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
                    activeClassName='active'
                    pageClassName='page-item'
                    breakClassName='page-item'
                    nextLinkClassName='page-link'
                    pageLinkClassName='page-link'
                    breakLinkClassName='page-link'
                    previousLinkClassName='page-link'
                    nextClassName='page-item next-item'
                    previousClassName='page-item prev-item'
                    containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-start pe-1'}
                />
            </div>
        </div>
    )

    return (
        <div className='react-dataTable'>
            <Card className='mt-2'>
                <CardBody>
                    <DataTable
                        {...rest}
                        noHeader
                        actions={ref}
                        data={data}
                        onSort={handleSort}
                        columns={columns}
                        noDataComponent={"Reyestrdan ma`lumot topilmadi"}
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10}/>}
                        paginationPerPage={size}
                        paginationDefaultPage={currentPage + 1}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                    />
                </CardBody>
            </Card>
            <CustomPagination/>
        </div>
    )
}

export default TableComponent

// https://t.me/azamat_azadov