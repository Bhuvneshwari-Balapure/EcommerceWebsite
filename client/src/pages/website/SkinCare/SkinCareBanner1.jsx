import SkinCareProduct from "./SkinCareProduct";

function SkinCareBanner1() {
  return (
    <div>
      <div className="SkincareBanner1"></div>
      <div className="scrolling-text">
        <strong
          style={{
            color: "rgb(163, 6, 90)",
            letterSpacing: "3px",
            wordSpacing: "4px",
          }}
        >
          50% OFF SALE, SALE IS LIVE!! FREE SHIPPING ON ALL ORDERS ABOVE ₹299
        </strong>
      </div>

      {/* fashion page  is link here*/}
      <SkinCareProduct />
    </div>
  );
}

export default SkinCareBanner1;
