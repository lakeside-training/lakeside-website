import React from "react"

const TableHead = ({ headers }) => {
  return (
    <thead className="hidden lg:table-header-group">
      <tr>
        {headers.map((header, index) => {
          return (
            <th
              key={header.key}
              className="py-3.5 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widest"
            >
              {header.name}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default TableHead
