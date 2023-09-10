const senderList = [
    {
      id: "80d56b2d-5113-d167-82e8-e0a8b1b9d06e",
      name: "Amazon",
    },
    {
      id: "80d56b2d-5114-d167-82e8-e0a8b1b9d06e",
      name: "Shopify",
    },
  ];

const recieverList = [
  {
    id: "80d56b2d-5115-d167-82e8-e0a8b1b9d06e",
    name: "Walmart",
  },
  {
    id: "80d56b2d-5116-d167-82e8-e0a8b1b9d06e",
    name: "Ikea",
  },
];

const shipperList = [
  {
    id: "80d56b2d-5117-d167-82e8-e0a8b1b9d06e",
    name: "DHL",
  },
  {
    id: "80d56b2d-5118-d167-82e8-e0a8b1b9d06e",
    name: "Dinçer",
  },
];

export function getRecieverName(id: string) {
  const name = recieverList.find((reciever) => reciever.id === id)?.name;
  return name;
}

export function getSenderName(id: string) {
  const name = senderList.find((sender) => sender.id === id)?.name;
  return name;
}

export function getShipperName(id: string) {
  const name = shipperList.find((shipper) => shipper.id === id)?.name;
  return name;
}

export function getUserNameFromLS() {
  const user = localStorage.getItem("userName");
  const userName = user ? user : "";
  return userName;
}

export const handleDate = (date: string) => {
  const newDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return newDate;
};

export const orderstatus = [
  "ORDER_CREATED",
  "ORDER_RECEIVED",
  "SHIPMENT_ASSIGNED",
  "SHIPMENT_IN_TRANSIT",
  "SHIPMENT_RECEIVED",
];
