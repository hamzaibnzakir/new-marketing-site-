// Real student/store proof — screenshots dropped directly into
// public/proof/. Add a new object here whenever a new image is
// added to that folder; layout doesn't need to change.

export interface ProofItem {
  src: string;
  alt: string;
  stat: string;
  label: string;
  wide?: boolean;
}

export const proofItems: ProofItem[] = [
  {
    src: "/proof/proof-08-total-1-2m.png",
    alt: "Shopify analytics dashboard showing $1,275,816.94 in total sales over an 8 month period",
    stat: "$1.27M",
    label: "Total store sales, 8 months",
  },
  {
    src: "/proof/proof-07-30day-126k.png",
    alt: "Shopify store dashboard showing $126,432.60 in sales and 2,160 orders over the last 30 days",
    stat: "$126.4K",
    label: "Sales in a single month",
    wide: true,
  },
  {
    src: "/proof/proof-04-summary-26k.png",
    alt: "Shopify summary dashboard showing $26,534 in total sales today and $13,992 net profit",
    stat: "$13,992",
    label: "Net profit, single day",
  },
  {
    src: "/proof/proof-05-summary-16k.png",
    alt: "Shopify summary dashboard showing $16,918 in total sales, up 585.76%, and $8,886 net profit",
    stat: "+585%",
    label: "Sales growth, day over day",
  },
  {
    src: "/proof/proof-01-meta-ads-roas.png",
    alt: "Meta Ads Manager showing purchase ROAS of 6.89x and 7.76x, averaging 7.38x return on ad spend",
    stat: "7.38x",
    label: "Average ROAS on ad spend",
  },
  {
    src: "/proof/proof-10-7day-10k.png",
    alt: "Shopify dashboard showing $10,117.36 in sales and 183 orders over the last 7 days",
    stat: "$10.1K",
    label: "Sales in 7 days",
  },
  {
    src: "/proof/proof-03-analytics-sessions-sales.png",
    alt: "Shopify analytics showing $2,261 and $25,444 in month-to-date sales across two stores",
    stat: "$25.4K",
    label: "Month-to-date, single store",
  },
  {
    src: "/proof/proof-06-100-orders.png",
    alt: "Shopify dashboard celebrating 100 orders reached, with $1,039.74 in daily sales, up 136%",
    stat: "100",
    label: "Orders milestone hit",
  },
  {
    src: "/proof/proof-09-live-dashboard.png",
    alt: "Live Shopify dashboard for a Brainbox Ecom store showing $1,545 in sales and 23 orders today",
    stat: "12",
    label: "Live visitors on store",
  },
  {
    src: "/proof/proof-11-daily-sales-dark.png",
    alt: "Shopify dashboard showing $1,205 in total sales, up 85%, from 24 orders with $50.22 average order value",
    stat: "$50.22",
    label: "Average order value",
  },
  {
    src: "/proof/proof-12-brainbox-profile-overlay.png",
    alt: "Brainbox Ecom store dashboard showing $13,627 in sales and 203 orders, up 65% and 95%",
    stat: "+95%",
    label: "Order growth week over week",
  },
  {
    src: "/proof/proof-02-shopify-order-box.png",
    alt: "Hand holding a Shopify branded shipping bag from a fulfilled student store order",
    stat: "Real",
    label: "Fulfilled customer order",
  },
];
