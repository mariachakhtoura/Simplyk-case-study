"use client";

import { NextUIProvider, Pagination } from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { TransactionWithDonation } from "@/models/donation";
import { getFormattedDate } from "@/utils/date";

const columns = [
    { key: "createdAtUtc", label: "Date" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "amount", label: "Amount" },
];

export default function DonationsTable() {
    const [donations, setDonations] = useState<TransactionWithDonation[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const rowsPerPage = 10;

    // const items = useMemo(() => {
    //     const start = (page - 1) * rowsPerPage;
    //     const end = start + rowsPerPage;
    //     return donations.slice(start, end);
    // }, [page, donations]);

    useEffect(() => {
        TransactionWithDonation.getPaginatedItems(page,rowsPerPage)
            .then((donations) => {
              if(!donations.length){
                return;
              }
                setDonations(donations);
                const pages = page+1;
                setPages(pages);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [page]);

    return (
        <NextUIProvider>
            <Table
                aria-label="donations table"
                bottomContent={
                    // <Pagination
                    //     isCompact
                    //     showControls
                    //     showShadow
                    //     color="primary"
                    //     page={page}
                    //     total={pages}
                    //     onChange={setPage}
                    // />
                   <div className="flex justify-between">
                    <button onClick={() => {
                      setPage((oldPage) => oldPage - 1)
                    }}>
                      Previous
                    </button>
                    <button onClick={() => {
                      setPage((oldPage) => oldPage + 1)
                    }}>
                      Next
                    </button>
                    </div>
                }
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={donations} emptyContent={"No rows to display."}>
                    {(item) => (
                        <TableRow key={item.id} className="text-black">
                            <TableCell>
                                {getFormattedDate(item.donation.createdAtUtc)}
                            </TableCell>
                            <TableCell>{item.donation.firstName}</TableCell>
                            <TableCell>{item.donation.lastName}</TableCell>
                            <TableCell>
                                {(
                                    item.donation.amount - item.refundedAmount
                                ).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </NextUIProvider>
    );
}
