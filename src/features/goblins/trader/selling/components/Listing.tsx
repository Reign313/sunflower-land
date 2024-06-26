import React from "react";

import { OuterPanel } from "components/ui/Panel";
import { InventoryItemName } from "features/game/types/game";
import { ITEM_DETAILS } from "features/game/types/images";
import token from "assets/icons/sfl.webp";
import goblin from "assets/npcs/goblin_head.png";
import { Button } from "components/ui/Button";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

interface ListingProps {
  listingId: number;
  resourceName: InventoryItemName;
  resourceAmount: number;
  sfl: number;
  tax: number;
  onCancel: () => void;
}

export const Listing: React.FC<ListingProps> = ({
  onCancel,
  listingId,
  resourceName,
  resourceAmount,
  sfl,
  tax,
}) => {
  // Round to 2 decimal places
  const { t } = useAppTranslation();
  const buyerPays = Math.round((sfl + sfl * tax) * 100) / 100;
  const goblinFee = Math.round(sfl * tax * 100) / 100;
  const sellerReceives = Math.round(sfl * 100) / 100;
  const priceperunit = (
    ((sfl + sfl * tax) * 100) /
    100 /
    resourceAmount
  ).toFixed(3);

  return (
    <OuterPanel className="!p-2">
      <div className="flex">
        {/* Item Image */}
        <div className="flex flex-col items-center w-1/3 mr-3">
          <div className="flex w-full h-full items-center justify-center">
            <img src={ITEM_DETAILS[resourceName].image} className="w-12" />
          </div>
          <span className="text-xs text-center">{`${resourceAmount} ${resourceName}`}</span>
        </div>
        {/* Sale Details */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-s">{`ID #${listingId}`}</span>
            <Button className="text-xxs w-24" onClick={onCancel}>
              {t("cancel")}
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xxs sm:text-xs flex-1">
              {t("trader.buyer.pays")}
            </span>
            <div className="flex items-center">
              <img src={token} className="w-5" />
              <span className="text-xxs sm:text-xs whitespace-nowrap pl-2">{`${buyerPays} SFL`}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xxs sm:text-xs flex-1">
              {t("trader.price.per.unit")}
            </span>
            <div className="flex items-center">
              <img src={token} className="w-5" />
              <span className="text-xxs sm:text-xs whitespace-nowrap pl-2">{`${priceperunit} SFL`}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xxs sm:text-xs flex-1">
              {t("trader.goblin.fee")}
            </span>
            <div className="flex items-center">
              <img src={goblin} className="w-5" />
              <span className="text-xxs sm:text-xs whitespace-nowrap pl-2">{`${goblinFee} SFL`}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xxs sm:text-xs flex-1">
              {t("trader.seller.receives")}
            </span>
            <div className="flex items-center">
              <img src={token} className="w-5" />
              <span className="text-xxs sm:text-xs whitespace-nowrap pl-2">{`${sellerReceives} SFL`}</span>
            </div>
          </div>
        </div>
      </div>
    </OuterPanel>
  );
};
