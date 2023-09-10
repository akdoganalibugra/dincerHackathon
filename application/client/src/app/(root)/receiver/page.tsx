"use client";
import { useAppSelector } from "@/redux/hooks";
import CustomTable from '@/components/customTable';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, useEffect, SyntheticEvent, FormEvent } from "react";
import { Tab } from "@mui/material";
import Navbar from "@/components/Nabar";
import Input from "@/components/Elements/input";
import { Button } from "@/components/Elements/buttons";
import uuid from 'react-uuid';
import { toast } from "react-toastify";
import { fetchJson } from "@/utils/fetch";

interface orderType {
    assetName: string;
    price: number;
    quantity: number;
}


export default function Sender() {
    const { form } = useAppSelector((state) => state.user)
    const [tabValue, setTabValue] = useState<string>("1");
    const [loading, setLoading] = useState<boolean>(false);
    const [orderData, setOrderData] = useState<orderType[]>([]);

    const handleTabChange = (_: SyntheticEvent, value: string) =>
        setTabValue(value);

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
    ];

    const [data, setData] = useState<
        { assetName: string; price: number, quantity: number }
    >({
        assetName: "",
        price: 0,
        quantity: 0,
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetchJson(`/`, {
                method: "POST",
                body: JSON.stringify({
                    ...data,
                    orderId: uuid(),
                    senderId: uuid(),
                    receiverId: uuid(),
                    status: "INITIALIZED_LEDGER",
                    trackingInfo: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            }, {}, "api2");
            if (res.status >= 200 && res.status < 300) {
                toast.success("Recorded successful");
            } else {
                toast.error(res.message);
            }
        }
        catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

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

    // useEffect(() => {
    //     getOrders();
    // }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // onSubmit();
    };

    return (
        <div>
            <Navbar title='Reciever Portal' title2={form.username} />
            <main className="flex min-h-screen flex-col items-center p-9">
                <TabContext value={tabValue}>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab sx={{ marginRight: 6 }} value="1" label="see orders" />
                        <Tab sx={{ marginRight: 6 }} value="2" label="Place an order" />
                    </TabList>
                    <TabPanel value="1">
                        <CustomTable
                            columnShape={columnShape}
                            data={orderData}
                        />
                    </TabPanel>
                    <TabPanel value="2">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-y-4 mt-6 w-[200%] ml-[-50px]">
                                <Input
                                    label="Asset Name"
                                    value={data.assetName}
                                    labelColor="ph_blue"
                                    required={true}
                                    color={data.assetName === "" ? "ph_graywhite" : "ph_blue_light"}
                                    htmlFor="assetName"
                                    type="text"
                                    id="assetName"
                                    name="assetName"
                                    placeholder="Input Asset Name"
                                    onChange={(e) => {
                                        setData({ ...data, assetName: e.target.value });
                                    }}
                                />
                            </div>
                            <div className="grid gap-y-4 mt-6 w-[200%] ml-[-50px]">
                                <Input
                                    label="Price"
                                    value={data.price}
                                    labelColor="ph_blue"
                                    required={true}
                                    color={data.price === 0 ? "ph_graywhite" : "ph_blue_light"}
                                    htmlFor="price"
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Input Price"
                                    onChange={(e) => {
                                        setData({ ...data, price: Number(e.target.value) });
                                    }}
                                />
                            </div>
                            <div className="grid gap-y-4 mt-6 w-[200%] ml-[-50px]">
                                <Input
                                    label="Quantitiy"
                                    value={data.quantity}
                                    labelColor="ph_blue"
                                    required={true}
                                    color={data.quantity === 0 ? "ph_graywhite" : "ph_blue_light"}
                                    htmlFor="quantity"
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="Input Quantitiy"
                                    onChange={(e) => {
                                        setData({ ...data, quantity: Number(e.target.value) });
                                    }}
                                />
                                <Button type="submit" text="Submit" loading={loading} />
                            </div>
                        </form>
                    </TabPanel>
                </TabContext>
            </main>
        </div>
    )
}