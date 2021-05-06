const BuyItem = (item) => {
  const dic = {
    wood: "Madeira",
    stone: "Argila",
    iron: "Ferro",
  };

  const $itemQuantity = document.querySelector(`#premium_exchange_stock_${item}`);
  if (!$itemQuantity) return;

  const $container = document.querySelector("#quickbar_outer");

  const box = document.createElement("div");
  box.classList.add("kbra-box__box");
  box.style.marginBottom = "10px";

  const labelItem = document.createElement("label");
  labelItem.setAttribute("for", `${item}-input-limit`);
  labelItem.textContent = `Limite ${dic[item]} (kbra BOT)`;
  labelItem.style.marginRight = "10px";

  const inputItem = document.createElement("input");
  inputItem.setAttribute("id", `${item}-input-limit`);
  inputItem.type = "number";

  box.append(labelItem, inputItem);

  $container.appendChild(box);

  const observer = new MutationObserver(() => {
    console.log('alterou o html')
    const limit = inputItem.value ? parseInt(inputItem.value) : 0;
    const $interitemQuantity = document.querySelector(`#premium_exchange_stock_${item}`);

    const $itemValue = document.querySelector(
      `#premium_exchange_rate_${item} .premium-exchange-sep`
    );
    const $itemInput = document.querySelector(
      `#premium_exchange_buy_${item} .premium-exchange-input`
    );
    const $buttonBuy = document.querySelector(".btn-premium-exchange-buy");
    const itemQuantity = parseInt($interitemQuantity.textContent);
    const itemValue = parseInt($itemValue.textContent);
    const $purchadesList = [...document.querySelectorAll("#market_status_bar .nowrap")];
    const findPurchased = $purchadesList.find(($item) => {
      const icon = $item.querySelector(`.${item}`);

      if (icon) return true;
    });

    const purchased = findPurchased ? findPurchased.textContent.replace(".", "") : "0";

    if (itemQuantity > itemValue && parseInt(purchased) < limit) {
      const formatedItemQuantity = parseInt(itemQuantity / itemValue) * itemValue;
      const formatedLimitQuantity = parseInt(
        ((limit - parseInt(purchased)) / itemValue) * itemValue
      );

      console.log("formatedItemQuantity", formatedItemQuantity);
      console.log("formatedLimitQuantity", formatedLimitQuantity);

      $itemInput.value =
        itemQuantity + parseInt(purchased) > limit ? formatedLimitQuantity : formatedItemQuantity;
      $buttonBuy.click();
      recursiveClick(".evt-confirm-btn.btn-confirm-yes");
      $itemInput.value = "";
    }
  });

  observer.observe($itemQuantity, { attributes: true, childList: true, characterData: true });
};

const recursiveClick = (className) => {
  const $element = document.querySelector(className);
  if (!$element) return setTimeout(() => recursiveClick(className), 1);

  $element.click();
};

const BuyPremium = () => {
  BuyItem("wood");
  BuyItem("stone");
  BuyItem("iron");
};

const Farm = (type) => {
  const $farmIcon = document.querySelector(`.farm_icon_${type}:not(.decoration)`);
  const $pageTitle = document.querySelector("#content_value > h3");

  console.log($pageTitle?.textContent === "Assistente de saque")
  
  if (!$farmIcon && $pageTitle?.textContent === "Assistente de saque")
    return setTimeout(
      () =>
        window.location.replace(
          window.location.pathname + window.location.search + window.location.hash
        ),
      Math.floor(Math.random() * 15000)
    );

  if (!$farmIcon?.classList?.contains("farm_icon_disabled")) $farmIcon?.click();


  if ($pageTitle?.textContent === "Assistente de saque") setTimeout(
    () =>
      window.location.replace(
        window.location.pathname + window.location.search + window.location.hash
      ),
    Math.floor(Math.random() * 60000)
  );
};

BuyPremium();
Farm("b");
