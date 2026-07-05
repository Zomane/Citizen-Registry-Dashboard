import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table"
import type { FamilyMember } from "../../types/citizenType"
import { useMemo, useState } from "react"
import EmptyState from "../ui/EmptyState"
import styles from './CitizenFamily.module.css'
import formatDate from "../../utils/ruDate"

type Props = {
    family: FamilyMember[]
}

const tablePaginationSizes = [10, 25, 50, 100]

export default function CitizenFamily({family}: Props){
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<FamilyMember>[]>(
        () => [
            {
                accessorKey: 'fullName',
                header: 'ФИО'
            },
            {
                accessorKey: 'relation',
                header: 'Родство'
            },
            {
                accessorKey: 'birthDate',
                header: 'Дата рождения',
                cell: ({row}) => formatDate(row.original.birthDate) 
            },
            {
                accessorKey: 'livesTogether',
                header: 'Совместно проживает',
                cell: ({row}) => row.original.livesTogether === true ? 'Да' : 'Нет'
            },
            {
                accessorKey: 'phone',
                header: 'Телефон',
                cell: ({row}) => row.original.phone ? row.original.phone : '-'
            }
        ] , []
    )

    const table = useReactTable({
        data: family, 
        columns,
        state: {
            sorting,
            pagination
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })


    if(family.length === 0){
        return (
            <EmptyState title='Информация о семье не добавлена'/>
        )
    }

    return (
        <div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header)=> {
                                    const sortDirection = header.column.getIsSorted()
                                    const sortIcon = sortDirection === 'asc' ? ' ↑' : sortDirection === 'desc' ? ' ↓' : ''
                                    return (
                                        <th key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                header.column.getCanSort() ? (
                                                    <button className={styles.sortButton} type="button" onClick={header.column.getToggleSortingHandler()}>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {sortIcon}
                                                    </button>
                                                ) : (
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                )
                                            )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                <label className={styles.pageSizeLabel}>Показывать:
                    <select className={styles.pageSizeSelect} value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
                        {tablePaginationSizes.map((pageSize) => (
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        ))}
                    </select>
                </label>
                <button className={styles.pageButton} onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>{'<<'}</button>
                <button className={styles.pageButton} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>
                <span className={styles.pageInfo}>Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}</span>
                <button className={styles.pageButton} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
                <button className={styles.pageButton} onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>{'>>'}</button>
            </div>
        </div>        
    )

}
