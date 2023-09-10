"use client";
import Navbar from "@/components/Nabar";
import { useState, useEffect } from "react";
import { orderType } from "../receiver/page";
import CustomTable from "@/components/customTable";
import { fetchJson } from "@/utils/fetch";
import { toast } from "react-toastify";
import { getUserNameFromLS } from "@/utils";


export default function Admin() {
    const username=getUserNameFromLS()
    const [orderData, setOrderData] = useState<orderType[]>([]);

    const columnShape = [
        {
            Header: "Order Id",
            accessor: "order_id",
            minWidth: 200,
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {value}
                    </div>
                );
            },
        },
        {
            Header: "Asset Name",
            accessor: "assetName",
            minWidth: 200,
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {value}
                    </div>
                );
            },
        },
        {
            Header: "Status",
            accessor: "status",
            minWidth: 200,
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {value}
                    </div>
                );
            },
        },
        {
            Header: "Created Date",
            accessor: "date",
            minWidth: 200,
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {value}
                    </div>
                );
            },
        },
    ];

    const getOrders = async () => {
        try {
            const res = await fetchJson(`/`, {}, {}, "api2");
            if (res.status >= 200 && res.status < 300) {
                setOrderData(res.json);
            } else {
                toast.error(res.message);
            }
        }
        catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

   return (
        <div>
            <Navbar title='Admin Portal' title2={username} />
            <main className="flex min-h-screen flex-col items-center p-9">
                <CustomTable
                    columnShape={columnShape}
                    data={orderData}
                />
            </main>
        </div>
    )
}