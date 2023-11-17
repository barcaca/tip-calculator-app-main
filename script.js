// ---------- I. BILL AMOUNT INPUT SECTION ----------//

// Get the input element for the bill amount
const billInput = document.getElementById("billAmount");
// Define the maximum desired value
const MAX_BILL_AMOUNT = 99999999.99;
// Initialize the bill amount variable
let billAmount = 0;

// Add an event listener to the bill input for input changes
billInput.addEventListener("input", function (eventBill) {
  // Remove any non-numeric characters
  let inputValue = eventBill.target.value.replace(/[^0-9]/g, "");

  // Limit the value to the maximum defined value
  inputValue = Math.min(parseFloat(inputValue), MAX_BILL_AMOUNT);

  billAmount = inputValue / 100; // Convert the value to dollars

  // Format the value as currency for the bill
  const formattedBill = formatCurrencyBill(inputValue);
  eventBill.target.value = formattedBill; // Update the value in the input
  updateTotal(); // Update the total based on the new bill amount
});

//---------- II. TIP AND PEOPLE INPUT SECTION ----------//

// Get all elements with the class 'tip'
const selectTip = document.querySelectorAll(".tip");
// Get the input element for the number of people
const peopleInput = document.getElementById("numberPeople");

let selectedTip = 0; // Initialize selectedTip to 0
let numberOfPeople = 1; // Initialize numberOfPeople to 1

// Add an input event listener to the "Number of People" input field
peopleInput.addEventListener("input", function (eventPeople) {
  // Parse the input value as an integer; if not a valid integer, default to 1 person
  numberOfPeople = parseInt(eventPeople.target.value) || 1;
  updateTotal(); // Update total amount based on the new number of people
});

// ---------- III. TIP SELECTION SECTION ----------//

// Add click event listeners to each tip button
selectTip.forEach((button) => {
  button.addEventListener("click", function () {
    resetSelectTip(); // Reset selected tip styles
    button.classList.add("btn--active"); // Add active to the clicked button
    updateTotal(); // Update the total based on the new tip
  });
});

// Function to set a custom tip value
function setTip(value) {
  // Clear the custom tip input value when a predefined tip button is selected
  document.getElementById("customTip").value = "";

  selectedTip = parseFloat(value) || 0;

  resetSelectTip(); // Reset selected tip styles
  updateTotal(); // Update the total based on the new tip
}

// Function to set a custom tip value
function setCustomTip(value) {
  // Parse the input value as a floating-point number, or set it to 0 if not a valid number
  let parsedValue = parseFloat(value) || 0;
  // Ensure the parsed value is within the range [1, 100]
  selectedTip = Math.min(Math.max(parsedValue, 1), 100);
  // Update the input value to the sanitized value
  document.getElementById("customTip").value = selectedTip;

  resetSelectTip(); // Reset selected tip styles
  updateTotal(); // Update the total based on the new tip
}

// ---------- IV. UPDATE TOTAL AMOUNT DISPLAY SECTION ----------//

// Function to update the total amount and tip amount displayed
function updateTotal() {
  // Calculate the tip amount and total amount per person
  const tipAmountPerPerson = calculateTipAmountPerPerson();
  const totalAmountPerPerson = calculateTotalAmount();

  // Update the displayed tip amount and total amount
  document.getElementById("tipAmount").innerText =
    formatCurrency(tipAmountPerPerson);
  document.getElementById("totalAmount").innerText =
    formatCurrency(totalAmountPerPerson);
}

// ---------- V. TIP AND TOTAL AMOUNT CALCULATION SECTION ----------//

// Function to calculate the tip amount per person
function calculateTipAmountPerPerson() {
  return (billAmount * selectedTip) / 100 / numberOfPeople;
}

// Function to calculate the total amount per person
function calculateTotalAmount() {
  const totalAmount = billAmount + (billAmount * selectedTip) / 100;
  return totalAmount / numberOfPeople;
}

// ---------- VI. RESET VALUES AND STYLES SECTION ----------//

// Function to reset all values to their initial state
function resetValues() {
  billAmount = 0;
  selectedTip = 0;
  numberOfPeople = 1;

  resetSelectTip(); // Reset selected tip styles

  // Clear the bill amount input and set the number of people input to '1'
  document.getElementById("billAmount").value = "";
  document.getElementById("numberPeople").value = "1";

  // Remove the 'btn--reset--active' class from toggleButtonReset
  toggleButtonReset.classList.remove("btn--reset--active");

  updateTotal(); // Update the total based on the reset values
}

// Function to reset the styles of all tip buttons
function resetSelectTip() {
  selectTip.forEach((button) => {
    button.classList.remove("btn--active");
  });
}

// ---------- VII. CURRENCY FORMATTING FUNCTIONS SECTION ----------//

// Function to format the bill amount as currency
function formatCurrencyBill(value) {
  const floatValue = value / 100; // Convert to a floating-point number

  // Check if it is a valid number
  if (isNaN(floatValue)) {
    return "";
  }

  // Format as currency for the bill
  const formattedValue = floatValue.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedValue;
}
// Function to format a value as currency
function formatCurrency(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

// ---------- VIII. BUTTON BACKGROUND UPDATE FUNCTION ----------//

// Get the button element for the reset button  background
const toggleButtonReset = document.getElementById("buttonReset");

// Add an event listener to the bill input for changes, triggering the update function
billInput.addEventListener("input", updateButtonBackground);

// Function to update the button background based on the bill input value
function updateButtonBackground() {
  // Check if the bill input value is empty or '0.00'
  if (billInput.value === "" || billInput.value === "0.00") {
    // If true, remove the 'btn--reset--active' class
    toggleButtonReset.classList.remove("btn--reset--active");
  } else {
    // If false, add the 'btn--reset--active' class
    toggleButtonReset.classList.add("btn--reset--active");
  }
}
