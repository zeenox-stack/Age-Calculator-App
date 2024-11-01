const dayLabel = document.querySelector(".day-label");
const monthLabel = document.querySelector(".month-label");
const yearLabel = document.querySelector(".year-label");

const date = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");

const dateDiv = document.querySelector(".days");
const monthDiv = document.querySelector(".months");
const yearDiv = document.querySelector(".years");

const dayDisplay = document.querySelector(".day-display");
const monthDisplay = document.querySelector(".month-display");
const yearDisplay = document.querySelector(".year-display");

const button = document.querySelector(".success");

class ErrorHandler {
  constructor(input, div) {
    this.input = input ? input.value : console.error("input cannot be empty");
    this.div = div ? div : console.error("div cannot be empty");
    this.errorFlag = false;
  }

  errorChecker() {
    let p = this.div.querySelector("p");
    if (!this.input) {
      if (!p) {
        p = document.createElement("p");
        p.style.color = "red";
        p.textContent = "This field is required!";
        this.div.appendChild(p);
      }
      this.errorFlag = true;
    } else {
      if (p) {
        this.div.removeChild(p);
      }
      this.errorFlag = false;
    }
  }
}

function updateError(div, message, showError) {
  let p = div.querySelector("p");
  let errorFlag = false;
  if (showError) {
    if (!p) {
      p = document.createElement("p");
      p.textContent = message;
      p.style.color = "red";
      div.appendChild(p);
    }

    errorFlag = true;
  } else if (p) {
    div.removeChild(p);
    errorFlag = false;
  }

  return errorFlag;
}

function checkInput(date, month, year) {
  const currentYear = new Date().getFullYear();

  const yearFlag = updateError(
    yearDiv,
    "Invalid Year",
    year.value > currentYear
  );
  const monthFlag = updateError(
    monthDiv,
    "Invalid Month",
    month.value < 1 || month.value > 12
  );

  const dateInvalid =
    date.value < 1 ||
    date.value > 31 ||
    (month.value == 2 && year.value % 4 === 0
      ? date.value > 29
      : date.value > 28) ||
    ([4, 6, 9, 11].includes(parseInt(month.value)) && date.value > 30);

  const dateFlag = updateError(dateDiv, "Invalid Date", dateInvalid);
  return dateFlag || monthFlag || yearFlag;
}

button.addEventListener("click", () => {
  const dateError = new ErrorHandler(date, dateDiv);
  const monthError = new ErrorHandler(month, monthDiv);
  const yearError = new ErrorHandler(year, yearDiv);

  dateError.errorChecker();
  monthError.errorChecker();
  yearError.errorChecker();

  if (!dateError.errorFlag && !monthError.errorFlag && !yearError.errorFlag) {
    const checks = checkInput(date, month, year);
    if (!checks) {
      const dayP = document.querySelector(".days-display");
      const monthP = document.querySelector(".months-display");
      const yearP = document.querySelector(".years-display");

      const currentDate = new Date();

      dayP.textContent = `${currentDate.getDate() - date.value}`;
      monthP.textContent = `${currentDate.getMonth() - month.value}`;
      yearP.textContent = `${currentDate.getFullYear() - year.value}`;
    }
  }
});

const root = document.querySelector("body");
const themeButton = document.querySelector(".theme");
const lightTheme = document.querySelector(".light-mode");
const darkTheme = document.querySelector(".dark-mode");

let isLightMode = true;

themeButton.addEventListener("click", () => {
  if (isLightMode) {
    lightTheme.style.display = "flex";
    darkTheme.style.display = "none";
    root.classList.add("dark-theme");
  } else {
    darkTheme.style.display = "flex";
    lightTheme.style.display = "none";
    root.classList.remove("dark-theme");
  }

  isLightMode = !isLightMode;
});
