import React from "react"
import Cell from "./Cell"

const Row = ({ row }) => {
  return (
    <tr className="bg-white border-b">
      {Object.keys(row).map((key, index) => {
        return (
          <td
            key={key}
            className=" py-1 text-sm text-gray-500 align-top lg:align-middle whitespace-nowrap"
          >
            <Cell
              type={row[key].type}
              text={row[key].value}
              userData={row.userOtherData}
            />
          </td>
        )
      })}

      {/* <td className="hidden px-4 py-4 text-sm font-medium text-gray-600 lg:table-cell whitespace-nowrap">
				<div className="flex items-center">{row.date}</div>
			</td>

			<td className="hidden px-4 py-4 text-sm font-medium text-gray-600 lg:table-cell whitespace-nowrap">
				<div className="flex items-center">{row.payment}</div>
			</td>

			<td className="hidden px-4 py-4 text-sm font-medium text-gray-600 xl:table-cell whitespace-nowrap">
				<div className="flex items-center">{row.plan}</div>
			</td>

			<td className="px-4 py-4 text-gray-600 text-sm font-medium text-right  align-top lg:align-middle lg:text-left whitespace-nowrap">
				{row.structure}
			</td>
			<td className="px-4 py-4 text-lg font-medium text-right text-primary  align-top lg:align-middle lg:text-left whitespace-nowrap">
				{row.amount}
			</td> */}
    </tr>
  )
}

export default Row
