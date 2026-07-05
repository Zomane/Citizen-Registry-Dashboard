import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table"
import type { DocumentVerificationStatus, CitizenDocument } from "../../types/citizenType"
import { useMemo, useState } from "react"
import styles from './CitizenDocuments.module.css'
import EmptyState from "../ui/EmptyState"
import formatDate from "../../utils/ruDate"

type Props = {
    documents: CitizenDocument[]
}

const tablePaginationSizes = [10, 25, 50, 100]

const documentStatus: Record<DocumentVerificationStatus, string> = {
    verified: 'Проверен',
    pending: 'На проверке',
    rejected: 'Отклонен'
}

export default function CitizenDocuments({documents} : Props){
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const columns = useMemo<ColumnDef<CitizenDocument>[]>(
        () => [
            {
                accessorKey: 'type',
                header: 'Тип документа'
            },
            {
                accessorKey: 'series',
                header: 'Серия',
                cell: ({row}) => row.original.series? row.original.series : '-'
            },
            {
                accessorKey: 'number',
                header: 'Номер'
            },
            {
                accessorKey: 'issuedAt',
                header: 'Дата выдачи',
                cell: ({row}) => row.original.issuedAt ? formatDate(row.original.issuedAt) : '-'
            },
            {
                accessorKey: 'issuedBy',
                header: 'Кем выдан',
                cell: ({row}) => row.original.issuedBy ? row.original.issuedBy : '-'
            },
            {
                accessorKey: 'verificationStatus',
                header: 'Статус',
                cell: ({row}) => (
                    <span>
                        {documentStatus[row.original.verificationStatus]}
                    </span>
                )    
            }
        ], []
    )

    const table = useReactTable({
        data: documents,
        columns,
        state: {
            sorting,
            pagination
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,

        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel()
    })

    if(documents.length === 0){
        return (
            <EmptyState title='Документы не добавлены'/>
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
