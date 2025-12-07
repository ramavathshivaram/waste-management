// import React from "react";
// import { useAdminPickups } from "../../hooks/use-admin-query.js";
// import {
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { pickupColumns } from "../../components/common/pickupColumns";

// const Pickups = () => {
//   const { data, isLoading } = useAdminPickups();

//   if (isLoading) return <div>Loading...</div>;

//   // ⭐ FIX: Extract correct array
//   const pickups = data?.data?.pickups || [];

//   const table = useReactTable({
//     data: pickups, // ⭐ fixed
//     columns: pickupColumns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     initialState: {
//       pagination: { pageSize: 5 },
//     },
//   });

//   return (
//     <div className="border border-black rounded-xl bg-white p-4">
//       <table className="w-full border-collapse text-sm">
//         {/* HEADER */}
//         <thead>
//           {table.getHeaderGroups().map((group) => (
//             <tr key={group.id} className="border-b border-black">
//               {group.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   className="px-3 py-2 text-left cursor-pointer select-none"
//                 >
//                   {flexRender(
//                     header.column.columnDef.header,
//                     header.getContext()
//                   )}
//                   {{
//                     asc: " ↑",
//                     desc: " ↓",
//                   }[header.column.getIsSorted()] || ""}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         {/* BODY */}
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="border-b border-gray-300">
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="px-3 py-2">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* PAGINATION */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           className="border border-black px-3 py-1 rounded disabled:opacity-50"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Prev
//         </button>

//         <span>
//           Page {table.getState().pagination.pageIndex + 1} of{" "}
//           {table.getPageCount()}
//         </span>

//         <button
//           className="border border-black px-3 py-1 rounded disabled:opacity-50"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pickups;


import React from 'react'

const Pickups = () => {
  return (
    <div>
      Pickup page
    </div>
  )
}

export default Pickups
