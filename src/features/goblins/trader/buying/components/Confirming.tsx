import React from "react";

import token from "assets/icons/sfl.webp";
import goblin from "assets/npcs/goblin_head.png";

import { Button } from "components/ui/Button";
import { ITEM_DETAILS } from "features/game/types/images";
import { Listing } from "lib/blockchain/Trader";
import { KNOWN_ITEMS } from "features/game/types";
import Decimal from "decimal.js-light";
import classNames from "classnames";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

interface ConfirmProps {
  balance: Decimal;
  listing: Listing;
  onBack: () => void;
  onConfirm: () => void;
}

export const Confirming: React.FC<ConfirmProps> = ({
  balance,
  listing,
  onBack,
  onConfirm,
}) => {
  const { t } = useAppTranslation();
  const resourceName = KNOWN_ITEMS[listing.resourceId];
  const resource = ITEM_DETAILS[resourceName];

  const price = listing.sfl + listing.sfl * listing.tax;

  // Round to 2 decimal places
  const buyerPays = Math.round(price * 100) / 100;
  const goblinFee = Math.round(listing.sfl * listing.tax * 100) / 100;
  const sellerReceives = Math.round(listing.sfl * 100) / 100;
  const pricePerUnit = (
    ((listing.sfl + listing.sfl * listing.tax) * 100) /
    100 /
    listing.resourceAmount
  ).toFixed(3);

  const insufficientFunds = balance.lt(new Decimal(price));

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center p-2">
        <img src={resource.image} className="w-16" />
        <span className="text-lg pt-2">{`${listing.resourceAmount} ${resourceName}`}</span>
      </div>

      <div className="p-2 w-full">
        <div className="flex items-center">
          <span className="text-xs sm:text-sm whitespace-nowrap w-1/2">
            {t("trader.you.pay")}
          </span>
          <div className="flex items-center w-1/2">
            <img src={token} className="w-6" />
            <span
              className={classNames("py-2 pl-2 whitespace-nowrap", {
                "text-error": insufficientFunds,
              })}
            >{`${buyerPays} SFL`}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-xs sm:text-sm whitespace-nowrap w-1/2">
            {t("trader.price.per.unit")}
          </span>
          <div className="flex items-center w-1/2">
            <img src={token} className="w-6" />
            <span className="py-2 pl-2 whitespace-nowrap">{`${pricePerUnit} SFL`}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-xs sm:text-sm whitespace-nowrap w-1/2">
            {t("trader.goblin.fee")}
          </span>
          <div className="flex items-center w-1/2">
            <img src={goblin} className="w-6" />
            <span className="py-2 pl-2 whitespace-nowrap">{`${goblinFee} SFL`}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-xs sm:text-sm whitespace-nowrap w-1/2">
            {t("trader.they.receive")}
          </span>
          <div className="flex items-center w-1/2">
            <img src={token} className="w-6" />
            <span className="py-2 pl-2 whitespace-nowrap">{`${sellerReceives} SFL`}</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2 w-full">
        <Button onClick={onBack}>{t("back")}</Button>
        <Button onClick={onConfirm} disabled={insufficientFunds}>
          {t("confirm")}
        </Button>
      </div>
    </div>
  );
};
