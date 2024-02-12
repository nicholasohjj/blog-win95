import React, { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import { useNavigation } from "@refinedev/core";
import { flexRender } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableHeadCell,
    TableDataCell,
    Window,
    WindowHeader,
    WindowContent,
    Button,
    Select,
    NumberInput,
    Hourglass,
    ScrollView,
} from "react95";

export const HouseList = () => {
    const { edit } = useNavigation();

    // Hardcoded list of houses
    const data = useMemo(() => [
        { id: 1, name: "Aonyx", total_points: 100 },
        { id: 2, name: "Chelonia", total_points: 200 },
        { id: 3, name: "Manis", total_points: 150 },
        { id: 4, name: "Orcaella", total_points: 180 },
        { id: 5, name: "Panthera", total_points: 170 },
        { id: 6, name: "Rusa", total_points: 90 },
        { id: 7, name: "Strix", total_points: 110 },
    ], []);

    const columns = useMemo(
        () => [
            {
                id: "name",
                header: "House",
                accessorKey: "name",
            },
            {
                id: "totalpoints",
                header: "Total Points",
                accessorKey: "total_points",
            },
            {
                id: "action",
                header: "Action",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 16,
                            }}
                        >
                            <Button
                                size="sm"
                                onClick={() =>
                                    edit("houses", getValue())
                                }
                            >
                                Details
                            </Button>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        options: { pageCount },
        getState,
        setPageIndex,
        setPageSize,
        refineCore: {
            tableQueryResult: { isLoading },
        },
    } = useTable({
        data, // Use the hardcoded data here
        columns,
        refineCoreProps: {
            meta: {
                select: "*, categories(*)",
            },
        },
    });

    return (
        <>
            <Window style={{ width: "100%" }}>
                <WindowHeader>Houses</WindowHeader>
                <WindowContent>
                    <ScrollView style={{ width: "100%", height: "410px" }}>
                        <Table>
                            <TableHead>
                                {getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHeadCell
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                            </TableHeadCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody>
                                {getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableDataCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableDataCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {isLoading && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "350px",
                                }}
                            >
                                <Hourglass size={32} />
                            </div>
                        )}
                    </ScrollView>
                </WindowContent>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 8,
                        marginTop: 8,
                        alignItems: "flex-end",
                    }}
                >
                    <Select
                        style={{ marginLeft: 8 }}
                        value={getState().pagination.pageSize}
                        onChange={(option) => {
                            setPageSize(option.value);
                        }}
                        options={pageSizeOptions}
                        defaultValue={10}
                    ></Select>
                    <span style={{ marginLeft: 8 }}>
                        Page{" "}
                        <strong>
                            {getState().pagination.pageIndex + 1} of {pageCount}
                        </strong>
                        <span style={{ marginLeft: 8 }}>
                            Go to page:
                            <NumberInput
                                style={{ marginLeft: 8 }}
                                min={1}
                                defaultValue={
                                    getState().pagination.pageIndex + 1
                                }
                                width={130}
                                onChange={(value) => {
                                    const page = value ? Number(value) - 1 : 0;
                                    setPageIndex(page);
                                }}
                            />
                        </span>
                    </span>
                </div>
            </Window>
        </>
    );
};

const pageSizeOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
];
