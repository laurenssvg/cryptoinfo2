import React from "react";

const CoinCard = ({ label, image, current_price }) => {
  return (
    <article className="flex p-4 border border-gray-200 space-x-4 m-5 rounded-xl shadow-md hover:bg-gray-100 hover:cursor-pointer hover:transition-all ease-in-out hover:translate-x-1">
      <img
        src={image}
        className="flex-none w-14 h-14 object-cover rounded-lg bg-gr"
      />
      <div className="flex justify-between min-w-0 relative flex-auto divide-x">
        <h2 className="flex text-lg font-semibold items-center">{label}</h2>
        <div className="text-lg font-semibold pr-2 flex items-center pl-5">
          {current_price.toLocaleString("en-GB", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 10,
          })}
        </div>
      </div>
    </article>
  );
};

export default CoinCard;
