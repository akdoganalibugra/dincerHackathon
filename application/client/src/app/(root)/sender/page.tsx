"use client";
import Navbar from "@/components/Nabar";
import { useState, useEffect } from "react";
import { StyledDialog, orderType } from "../receiver/page";
import CustomTable from "@/components/customTable";
import { fetchJson } from "@/utils/fetch";
import { toast } from "react-toastify";
import { getRecieverName, getSenderName, getUserNameFromLS, orderstatus } from "@/utils";
import { Button } from "@mui/material";
import FlexRowAlign from "@/components/flexbox/FlexRowAlign";
import FlexBox from "@/components/flexbox/Flexbox";
import { Span } from "@/components/Typography";


export default function Sender() {
    const username = getUserNameFromLS()
    const [orderData, setOrderData] = useState<orderType[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>("");
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

    const onClose = () => {
        setModal(false);
    };

    const columnShape = [
        {
            Header: "Order Id",
            accessor: "id",
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
                        {value}
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
                            setOrderId(row.original.id);
                            setModal(true);
                        }}
                    >
                        Details
                    </Button>
                );
            },
        },
    ];

    const getOrders = async () => {
        try {
            const res = await fetchJson(`/orders`, {}, {}, "api1");
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

    const getOrderDetails = async () => {
        try {
            const res = await fetchJson(`/orders/${orderId}`, {}, {}, "api1");
            if (res.status >= 200 && res.status < 300) {
                setOrderDetails(res.json);
            } else {
                toast.error(res.message);
            }
        }
        catch (error: any) {
            toast.error(error.message);
        }
    }

    const handleStatus = async (type: number) => {
        const status = type === 1 ? "ORDER_RECEIVED" : "SHIPMENT_ASSIGNED"
        try {
            const res = await fetchJson(`/orders/${orderId}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...orderDetails,
                    status,
                    updatedAt:new Date().toISOString(),
                }),
            }, {}, "api1");
            if (res.status >= 200 && res.status < 300) {
                setOrderDetails(res.json);
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

    const orderIndex = orderDetails && orderstatus.findIndex(e => e === orderDetails!.status)


    return (
        <div>
            <Navbar title='Sender Portal' title2={username} />
            <main className="flex min-h-screen flex-col items-center p-9">
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
                            backgroundColor: orderIndex >= 1 ? '#7fd48c' : "#2cc5bd1f",
                        }}>
                            {orderIndex < 1 ? (
                                <FlexBox
                                    sx={{
                                        height: '100%',
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        textAlign: 'center',
                                        alignItems: "center",
                                    }}>
                                    <Span>Accept Order</Span>
                                    <Button
                                        onClick={() => {
                                            handleStatus(1);
                                        }}
                                        sx={{
                                            backgroundColor: "#2499EF",
                                            color: "#F5F6F8",
                                            "&:hover": {
                                                backgroundColor: "#2499EF",
                                            }
                                        }}
                                    >
                                        Accept
                                    </Button>
                                </FlexBox>
                            ) : (
                                <Span>Order Received</Span>
                            )}
                        </FlexBox>
                        <FlexBox sx={{
                            width: '120px',
                            height: '120px',
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: 'center',
                            alignItems: "center",
                            backgroundColor: orderIndex >= 2 ? '#7fd48c' : "#2cc5bd1f",
                        }}>
                            {orderIndex < 2 ? (
                                <FlexBox
                                    sx={{
                                        height: '100%',
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        textAlign: 'center',
                                        alignItems: "center",
                                    }}>
                                    <Span>Assign Shipment</Span>
                                    <Button
                                        onClick={() => {
                                            handleStatus(2);
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
                            ) : (
                                <Span>Shipment Assigned</Span>
                            )}
                        </FlexBox>
                        <FlexBox sx={{
                            width: '120px',
                            height: '120px',
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: 'center',
                            alignItems: "center",
                            backgroundColor: orderIndex >= 3 ? '#7fd48c' : "#2cc5bd1f",
                        }}>
                            <Span>
                                {orderIndex > 3 ? "Shipment Acceppted" : "Shipment Waiting"}
                            </Span>
                        </FlexBox>
                        <FlexBox sx={{
                            width: '120px',
                            height: '120px',
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: 'center',
                            alignItems: "center",
                            backgroundColor: orderIndex >= 4 ? '#7fd48c' : "#2cc5bd1f",
                        }}>
                            <Span>
                                {orderIndex === 4 ? "Shipment Recieved" : "Awating Shipment"}
                            </Span>
                        </FlexBox>
                    </FlexRowAlign>
                </StyledDialog>
            </main>
        </div>
    )
}