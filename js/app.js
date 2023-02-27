const services = [
  {
    value: 1,
    title: "great -20%",
  },
  {
    value: 2,
    title: "ok -10%",
  },
  {
    value: 3,
    title: "bad -2%",
  },
];

services.forEach((service) => {
  const option = document.createElement("option");
  option.textContent = service.title;
  option.value = service.value;

  document.querySelector("#input-service").appendChild(option);
});

const form = document.querySelector("#tip-form");
const amaount = document.querySelector("#input-bill");
const users = document.querySelector("#input-users");
const service = document.querySelector("#input-service");
const feedback = document.querySelector(".feedback");
const loader = document.querySelector(".loader");
const results = document.querySelector(".results");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let bill = amaount.value;
  let people = users.value;
  let quality = service.value;

  if (
    bill === "" ||
    bill <= "0" ||
    people === "" ||
    people <= "0" ||
    quality === "0"
  ) {
    feedback.classList.add("showItem", "alert-danger");
    feedback.innerHTML = `
    <p>please check the value</p>
    <p>bill amaount cannot be less than zero</p>
    <p>people sharing the bill cannot be less then zero</p>
    <p>service has to be selected</p>
    `;
    setTimeout(() => {
      feedback.classList.remove("showItem", "alert-danger");
    }, 10000);
  } else {
    feedback.classList.add("showItem", "alert-success");
    feedback.innerHTML = `<p>calculating...</p>`;
    loader.classList.add("showItem");
    setTimeout(() => {
      loader.classList.remove("showItem");
      feedback.classList.remove("showItem", "alert-success");

      showResults(bill, quality, people);
      clearForm();
    }, 4000);
  }
});

const showResults = (bill, quality, people) => {
  let percent = 0;

  if (quality === "1") {
    percent = 0.2;
  } else if (quality === "2") {
    percent = 0.1;
  } else if (quality === "3") {
    percent = 0.02;
  }

  let tipAmount = parseInt(bill) * percent;
  let total = parseInt(bill) + tipAmount;
  let person = total / parseInt(people);

  results.classList.add("showItem");
  document.querySelector("#tip-amount").textContent = tipAmount;
  document.querySelector("#total-amount").textContent = total;
  document.querySelector("#person-amount").textContent = person.toFixed(2);
};

const clearForm = () => {
  amaount.value = "";
  users.value = "";
  service.value = "";
};
