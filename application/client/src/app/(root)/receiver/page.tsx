"use client";
import CustomTable from '@/components/customTable';
import { useState, useEffect, SyntheticEvent, FormEvent } from "react";
import { Dialog, Tab, styled } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button } from '@mui/material'
import Navbar from "@/components/Nabar";
import Input from "@/components/Elements/input";
import { Button1 } from "@/components/Elements/buttons";
import uuid from 'react-uuid';
import { toast } from "react-toastify";
import { fetchJson } from "@/utils/fetch";
import { getRecieverName, getSenderName, getUserNameFromLS, handleDate, orderstatus } from "@/utils";
import FlexBox from '@/components/flexbox/Flexbox';
import FlexRowAlign from '@/components/flexbox/FlexRowAlign';
import { Span } from '@/components/Typography';

export interface orderType {
    id: string,
    assetName: string;
    price: number;
    quantity: number;
    receiveId: string;
    senderId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const StyledDialog = styled(Dialog)(() => ({
    "& .MuiDialog-paper": {
        borderRadius: 8,
        padding:"16px",
        width: "100%",
        height: "150px",
    },
}));

export default function Sender() {
    const username = getUserNameFromLS()
    const [tabValue, setTabValue] = useState<string>("1");
    const [loading, setLoading] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>("");
    const [orderData, setOrderData] = useState<orderType[]>([]);
    const [orderDetails, setOrderDetails] = useState<orderType>({
        id: "",
        assetName: "",
        price: 0,
        quantity: 0,
        receiveId: "",
        senderId: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    });
    const [modal, setModal] = useState<boolean>(false);

    const handleTabChange = (_: SyntheticEvent, value: string) =>
        setTabValue(value);

    const onClose = () => {
        setModal(false);
    };

    const columnShape = [
        {
            Header: "Order Id",
            accessor: "orderId",
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
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {value}
                    </div>
                );
            },
        },
        {
            Header: "Price",
            accessor: "price",
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {value}
                    </div>
                );
            },
        },
        {
            Header: "Quantity",
            accessor: "quantity",
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {value}
                    </div>
                );
            },
        },
        {
            Header: "receive Id",
            accessor: "receiveId",
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {getRecieverName(value)}
                    </div>
                );
            },
        },
        {
            Header: "sender Id",
            accessor: "senderId",
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {getSenderName(value)}
                    </div>
                );
            },
        },
        {
            Header: "Created Date",
            accessor: "createdAt",
            Cell: ({ value }: any) => {
                return (
                    <div >
                        {handleDate(value)}
                    </div>
                );
            },
        },
        {
            Header: "Actions",
            Cell: ({ row }: any) => {
                return (
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#2499EF",
                            color: "#F5F6F8",
                        }}
                        onClick={() => {
                            setOrderId(row.original.orderId);
                            setModal(true);
                        }}
                    >
                        Details
                    </Button>
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

    const getOrders = async () => {
        try {
            const res = await fetchJson(`/orders`, {}, {}, "api2");
            if (res.status >= 200 && res.status < 300) {
                setOrderData(res.json.data);
            } else {
                toast.error(res.message);
            }
        }
        catch (error: any) {
            toast.error(error.message);
        }
    }

    const onSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetchJson(`/orders`, {
                method: "POST",
                body: JSON.stringify({
                    ...data,
                    orderId: uuid(),
                    assetId:uuid(),
                    senderId: "80d56b2d-5113-d167-82e8-e0a8b1b9d06e",
                    receiveId: "80d56b2d-5115-d167-82e8-e0a8b1b9d06e",
                    status: "ORDER_CREATED",
                    trackingInfo: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            }, {}, "api2");
            if (res.status >= 200 && res.status < 300) {
                toast.success("Recorded successful");
                setTabValue("1");
                getOrders();
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
   
    const getOrderDetails = async () => {
        try {
            const res = await fetchJson(`/orders/${orderId}`, {}, {}, "api2");
            if (res.status >= 200 && res.status < 300) {
                setOrderDetails(res.json.data);
            } else {
                toast.error(res.message);
            }
        }
        catch (error: any) {
            toast.error(error.message);
        }
    }

    const handleStatus = async () => {
        try {
            const res = await fetchJson(`/orders/${orderId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    ...orderDetails,
                    status: "SHIPMENT_RECEIVED",
                    updatedAt:new Date().toISOString(),
                }),
            }, {}, "api2");
            if (res.status >= 200 && res.status < 300) {
                setOrderDetails(res.json.data);
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

    useEffect(() => {
        orderId && getOrderDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    const orderIndex = orderDetails && orderstatus.findIndex(e => e === orderDetails!.status)


    return (
        <div>
            <Navbar title='Reciever Portal' title2={username} />
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
                        <StyledDialog
                            open={modal}
                            onClose={onClose}
                            sx={{
                                zIndex: 1300,
                                "& .css-15ziy8l-MuiPaper-root-MuiDialog-paper": {
                                    bgcolor: "background.default",
                                    px: 10,
                                    py: 5,
                                },
                            }}
                        >
                            <FlexRowAlign gap={2} sx={{
                                width: '100%',
                                height: '100%',
                                alignItems: "center",
                            }}>
                                <FlexBox sx={{
                                    width: '120px',
                                    height: '120px',
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#7fd48c",
                                }}>
                                    <Span>
                                        Order Placed
                                    </Span>
                                </FlexBox>
                                <FlexBox sx={{
                                    width: '120px',
                                    height: '120px',
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    textAlign: 'center',
                                    alignItems: "center",
                                    backgroundColor: orderIndex > 0 ? '#7fd48c' : "#2cc5bd1f",
                                }}>
                                    <Span>
                                        {orderIndex > 0 ? "Order Acceppted" : "Order Waiting"}
                                    </Span>
                                </FlexBox>
                                <FlexBox sx={{
                                    width: '120px',
                                    height: '120px',
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    textAlign: 'center',
                                    alignItems: "center",
                                    backgroundColor: orderIndex > 1 ? '#7fd48c' : "#2cc5bd1f",
                                }}>
                                    <Span>
                                        {orderIndex > 1 ? "Shipment Acceppted" : "Shipment Waiting"}
                                    </Span>
                                </FlexBox>
                                <FlexBox sx={{
                                    width: '120px',
                                    height: '120px',
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    textAlign: 'center',
                                    alignItems: "center",
                                    backgroundColor: orderIndex === 4 ? '#7fd48c' : "#2cc5bd1f",
                                }}>
                                    {orderIndex === 4 ? (
                                        <Span>Shipment Received</Span>
                                    ) : orderIndex < 2 ? (
                                        <Span>Awaiting Shipment</Span>
                                    ) : (
                                        <FlexBox
                                            sx={{
                                                height: '100%',
                                                flexDirection: "column",
                                                justifyContent: "space-evenly",
                                                textAlign: 'center',
                                                alignItems: "center",
                                            }}>
                                            <Span>Accept Shipment</Span>
                                            <Button
                                                onClick={() => {
                                                    handleStatus();
                                                }}
                                                sx={{
                                                    backgroundColor: "#2499EF",
                                                    color: "#F5F6F8",
                                                    "&:hover": {
                                                        backgroundColor: "#2499EF",
                                                    }
                                                }}
                                            >
                                                Received
                                            </Button>
                                        </FlexBox>
                                    )}
                                </FlexBox>
                            </FlexRowAlign>
                        </StyledDialog>
                    </TabPanel>
                    <TabPanel value="2">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-y-4 mt-6 w-[200%] ml-[-50px]">
                                <Input
                                    label="Asset Name"
                                    value={data.assetName}
                                    labelColor="ph_blue"
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
                                    color={data.price === 0 ? "ph_graywhite" : "ph_blue_light"}
                                    htmlFor="price"
                                    type="number"
                                    id="price"
                                    name="price"
                                    min="0"
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
                                    color={data.quantity === 0 ? "ph_graywhite" : "ph_blue_light"}
                                    htmlFor="quantity"
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="0"
                                    placeholder="Input Quantitiy"
                                    onChange={(e) => {
                                        setData({ ...data, quantity: Number(e.target.value) });
                                    }}
                                />
                                <Button1 type="submit" text="Submit" loading={loading} />
                            </div>
                        </form>
                    </TabPanel>
                </TabContext>
            </main>
        </div >
    )
}