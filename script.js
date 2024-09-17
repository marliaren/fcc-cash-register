// let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

let cash = document.getElementById("cash");
let price = document.getElementById("price");
let changeDue = document.getElementById("change-due");
let purchaseBtn = document.getElementById("purchase-btn");
let totalChange = document.getElementById("total-change");
let cashindrawer = document.getElementById("cash-in-drawer");

// put the price set in js to the price span
// document.getElementById("price").innerText = price;

//don't show changeDue div yet
changeDue.style.display = "none";

// span for the cid
// penniesSpan = document.getElementById("pennies-span");
// nickelsSpan = document.getElementById("nickels-span");
// dimesSpan = document.getElementById("dimes-span");
// quartersSpan = document.getElementById("quarters-span");
// onesSpan = document.getElementById("ones-span");
// fivesSpan = document.getElementById("fives-span");
// tensSpan = document.getElementById("tens-span");
// twentiesSpan = document.getElementById("twenties-span");
// hundredsSpan = document.getElementById("hundreds-span");

// //set to the initial values from the 2d array
// penniesSpan.textContent = cid[0][1];
// nickelsSpan.textContent = cid[1][1];
// dimesSpan.textContent = cid[2][1];
// quartersSpan.textContent = cid[3][1];
// onesSpan.textContent = cid[4][1];
// fivesSpan.textContent = cid[5][1];
// tensSpan.textContent = cid[6][1];
// twentiesSpan.textContent = cid[7][1];
// hundredsSpan.textContent = cid[8][1];

const purchaseEvent = () => {
  // get value of the input cash
  let cashValue = parseFloat(cash.value);
  let priceValue = parseFloat(price.value);

  // get totalChange
  let change = Number((cashValue - priceValue).toFixed(2));
  totalChange.innerHTML = `Total Change: $${change}`;

  // check if it is getting right values
  console.log(cashValue);
  console.log(priceValue);

  // total cid
  let totalCid = Number(
    cid.reduce((total, sum) => total + sum[1], 0).toFixed(2)
  );

  if (cashValue < priceValue) {
    alert("Customer does not have enough money to purchase the item.");
    return;
  } else if (cashValue === priceValue) {
    changeDue.style.display = "block";
    changeDue.innerText = "No change due - customer paid with exact cash.";
    return;
  }
  // if user did not enter cash / price
  else if (cash.value === "") {
    changeDue.style.display = "block";
    changeDue.innerHTML = "Please enter cash received.";
    return;
  } else if (price.value === "") {
    changeDue.style.display = "block";
    changeDue.innerHTML = "Please enter total price.";
    return;
  }

  // not enough cash in drawer for change
  if (totalCid < change) {
    changeDue.style.display = "block";
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const denomination = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const denominationName = [
    "ONE HUNDRED",
    "TWENTY",
    "TEN",
    "FIVE",
    "ONE",
    "QUARTER",
    "DIME",
    "NICKEL",
    "PENNY",
  ];
  let changeArr = [];
  let cidCopy = [...cid];

  for (let i = 0; i < denomination.length; i++) {
    let totalDenomination = 0;
    while (
      change >= denomination[i] &&
      cidCopy[cidCopy.length - 1 - i][1] > 0
    ) {
      cidCopy[cidCopy.length - 1 - i][1] = Number(
        (cidCopy[cidCopy.length - 1 - i][1] - denomination[i]).toFixed(2)
      );
      change = Number((change - denomination[i]).toFixed(2));
      totalDenomination += denomination[i];
    }

    if (totalDenomination > 0) {
      changeArr.push([denominationName[i], totalDenomination]);
    }
  }

  if (change > 0) {
    changeDue.style.display = "block";
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let remainingCid = cidCopy.reduce((total, sum) => total + sum[1], 0);
  if (remainingCid === 0) {
    changeDue.style.display = "block";
    changeDue.innerHTML =
      "Status: CLOSED " +
      changeArr.map((cash) => `${cash[0]}: $${cash[1].toFixed(2)}`).join(" ");
    cid = cid.map((denom) => [denom[0], 0]);
  } else {
    changeDue.style.display = "block";
    changeDue.innerHTML =
      "Status: <b style='font-size: 1.5rem'>OPEN</b> <br><br>" +
      changeArr
        .map(
          (cash) =>
            `<b style='font-size: 1.5rem'>${cash[0]}</b>: $${cash[1].toFixed(
              2
            )} <br>`
        )
        .join(" ");
    cid = cidCopy;
  }

  displayCid();
};

const displayCid = () => {
  cashindrawer.innerHTML = cid
    .map(
      (cash) =>
        `<b style='font-size: 1.5rem'>${cash[0]}: </b> $${cash[1].toFixed(
          2
        )} <br>`
    )
    .join("");
};

window.onload = displayCid();

purchaseBtn.addEventListener("click", purchaseEvent);

// every enter on cash input it will also call the purchaseEvent function
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    purchaseEvent();
  }
});
