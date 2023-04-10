import { useEffect, useState } from "react"
import Row from "./Row"
import TableHead from "./TableHead"
import Spinner from "../spinner/Spinner"
import ReactPaginate from "react-paginate"
import { ChevronLeft, ChevronRight } from "react-feather"

function Items({ currentItems }) {
    return (
        <tbody>
            {currentItems &&
                currentItems.map((item, idx) => (
                    <Row
                        row={item}
                        key={idx}
                    />
                ))}
        </tbody>
    )
}
const Table = ({ headers, rowData, handleTypeChange, handleUserChange, userFilter }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState(null)
    const [searchTimeout, setSearchTimeout] = useState(null)

    const itemsPerPage = 10

    useEffect(() => {
        if (rowData === null) return setSearchResult([])
        if (rowData?.length) {
            setSearchResult(rowData)
        }
    }, [rowData])

    const handleSearch = (e) => {
        clearTimeout(searchTimeout)
        setSearchTerm(e.target.value)

        if (!searchResult || !rowData) {
            return
        }

        if (e.target.value === "" || e.target.value === null) {
            return setSearchResult(rowData)
        }
        setSearchTimeout(
            setTimeout(() => {
                const filtered = searchResult?.filter(
                    (row) =>
                        row.username.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        row.name.value.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        row.email.value.toLowerCase().includes(searchTerm.toLowerCase())
                )
                setSearchResult(filtered)
            }, 500)
        )
    }

    // react-paginate
    const [itemOffset, setItemOffset] = useState(0)

    const endOffset = itemOffset + itemsPerPage
    const currentItems = searchResult?.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(searchResult?.length / itemsPerPage)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % searchResult?.length
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
        setItemOffset(newOffset)
    }

    return (
        <div className="w-full">
            <div className=" bg-white sm:py-16 lg:py-2">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="">
                        <div className="flex items-center justify-end mt-4 sm:justify-end sm:mt-0 sm:space-x-7">
                            {/* {
                userFilter && (
                  <div className="flex items-center justify-start">
                    <label
                      for="sort"
                      className="text-base font-medium text-gray-900 sm:text-sm"
                    >
                      {" "}
                      Sort:{" "}
                    </label>
                    <select
                      id="sort"
                      name="sort"
                      className="block w-full py-2 pl-1 pr-10 text-base border-gray-300 border-none rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                      onChange={(e) => handleUserChange(e)}
                    >
                      <option value="all" >All</option>
                      <option value="oneTime" >One Time</option>
                    </select>
                  </div>
                )
              } */}

                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        aria-hidden="true"
                                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    onChange={handleSearch}
                                    value={searchTerm}
                                    type="search"
                                    id="default-search"
                                    class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search user, email, cou..."
                                />
                            </div>

                            <div className="flex items-center justify-start">
                                <label
                                    for="sort"
                                    className="text-base font-medium text-gray-900 sm:text-sm"
                                >
                                    {" "}
                                    Sort:{" "}
                                </label>
                                <select
                                    id="sort"
                                    name="sort"
                                    className="block w-full py-2 pl-1 pr-10 text-base border-gray-300 border-none rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                    onChange={(e) => handleTypeChange(e)}
                                >
                                    <option value={"all"}>All</option>
                                    <option value={"day"}>Day</option>
                                    <option value={"week"}>Weekly</option>
                                    <option value={"month"}>Monthly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Table Component */}

                    <div className="flex flex-col mt-4 lg:mt-8">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                                    <TableHead headers={headers} />
                                    {searchResult === null ? (
                                        <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
                                            <Spinner />
                                        </div>
                                    ) : searchResult.length === 0 ? (
                                        <div className="absolute lg:top-1/2 left-[50%] lg:left-[58%] transform -translate-x-1/2 -translate-y-1/2">
                                            <h1>There is no data in table</h1>
                                        </div>
                                    ) : (
                                        <>
                                            <Items currentItems={currentItems} />
                                            <ReactPaginate
                                                breakLabel="..."
                                                nextLabel={<ChevronRight width={20} />}
                                                onPageChange={handlePageClick}
                                                pageRangeDisplayed={5}
                                                pageCount={pageCount}
                                                previousLabel={<ChevronLeft width={20} />}
                                                className="flex gap-2 pagination"
                                                renderOnZeroPageCount={null}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                containerClassName={"pagination"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                activeClassName={"active"}
                                            />
                                        </>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Table
