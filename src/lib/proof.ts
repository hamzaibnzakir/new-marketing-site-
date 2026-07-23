// Real student/store proof — screenshots dropped directly into
// public/proof/. Add a new object here whenever a new image is
// added to that folder; layout doesn't need to change.
// width/height are the image's real pixel dimensions, used to size
// each card at its natural aspect ratio in the masonry layout —
// never force-cropped or letterboxed.

export interface ProofItem {
  src: string;
  alt: string;
  stat: string;
  label: string;
  width: number;
  height: number;
}

export const proofItems: ProofItem[] = [
  {
    src: "/proof/proof-08-total-1-2m.png",
    alt: "Shopify analytics dashboard showing $1,275,816.94 in total sales over an 8 month period",
    stat: "$1.27M",
    label: "Total store sales, 8 months",
    width: 467,
    height: 836,
  },
  {
    src: "/proof/proof-07-30day-126k.png",
    alt: "Shopify store dashboard showing $126,432.60 in sales and 2,160 orders over the last 30 days",
    stat: "$126.4K",
    label: "Sales in a single month",
    width: 438,
    height: 167,
  },
  {
    src: "/proof/proof-04-summary-26k.png",
    alt: "Shopify summary dashboard showing $26,534 in total sales today and $13,992 net profit",
    stat: "$13,992",
    label: "Net profit, single day",
    width: 385,
    height: 846,
  },
  {
    src: "/proof/proof-05-summary-16k.png",
    alt: "Shopify summary dashboard showing $16,918 in total sales, up 585.76%, and $8,886 net profit",
    stat: "+585%",
    label: "Sales growth, day over day",
    width: 385,
    height: 846,
  },
  {
    src: "/proof/proof-01-meta-ads-roas.png",
    alt: "Meta Ads Manager showing purchase ROAS of 6.89x and 7.76x, averaging 7.38x return on ad spend",
    stat: "7.38x",
    label: "Average ROAS on ad spend",
    width: 477,
    height: 846,
  },
  {
    src: "/proof/proof-10-7day-10k.png",
    alt: "Shopify dashboard showing $10,117.36 in sales and 183 orders over the last 7 days",
    stat: "$10.1K",
    label: "Sales in 7 days",
    width: 435,
    height: 837,
  },
  {
    src: "/proof/proof-03-analytics-sessions-sales.png",
    alt: "Shopify analytics showing $2,261 and $25,444 in month-to-date sales across two stores",
    stat: "$25.4K",
    label: "Month-to-date, single store",
    width: 475,
    height: 840,
  },
  {
    src: "/proof/proof-06-100-orders.png",
    alt: "Shopify dashboard celebrating 100 orders reached, with $1,039.74 in daily sales, up 136%",
    stat: "100",
    label: "Orders milestone hit",
    width: 563,
    height: 842,
  },
  {
    src: "/proof/proof-09-live-dashboard.png",
    alt: "Live Shopify dashboard for a Brainbox Ecom store showing $1,545 in sales and 23 orders today",
    stat: "12",
    label: "Live visitors on store",
    width: 491,
    height: 836,
  },
  {
    src: "/proof/proof-11-daily-sales-dark.png",
    alt: "Shopify dashboard showing $1,205 in total sales, up 85%, from 24 orders with $50.22 average order value",
    stat: "$50.22",
    label: "Average order value",
    width: 392,
    height: 831,
  },
  {
    src: "/proof/proof-12-brainbox-profile-overlay.png",
    alt: "Brainbox Ecom store dashboard showing $13,627 in sales and 203 orders, up 65% and 95%",
    stat: "+95%",
    label: "Order growth week over week",
    width: 338,
    height: 691,
  },
  {
    src: "/proof/proof-02-shopify-order-box.png",
    alt: "Hand holding a Shopify branded shipping bag from a fulfilled student store order",
    stat: "Real",
    label: "Fulfilled customer order",
    width: 608,
    height: 836,
  },
];
