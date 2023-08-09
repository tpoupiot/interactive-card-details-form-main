const useRegex = (tab)=>{
    let regex = /[0-9]+/i;
    return regex.test(tab);
};
const onlyNumbers = (input)=>{
    input.addEventListener("input", ()=>{
        let value = input.value.split("");
        if (!useRegex(value)) {
            value.pop();
            input.value = value.join();
        }
    });
};
const checkWrongFormat = (qs, error, errorName)=>{
    let qsVal = qs.querySelector("input").value.split(" ").join("");
    if (qs.querySelector(`.${errorName}-error`) != null) qs.removeChild(qs.querySelector(`.${errorName}-error`));
    if (isNaN(qsVal) || qsVal === "") {
        if (qs.querySelector(`.${errorName}-error`) == null) qs.appendChild(error);
    }
};
const verify = ()=>{
    console.log("verifying...");
    let formNumber = document.querySelector(".form_cb-number");
    let formDate = document.querySelector(".cb-more_date");
    let formCvc = document.querySelector(".cb-more_cvc");
    let numberError = document.createElement("div");
    numberError.classList.add("numberError-error");
    numberError.innerHTML = `<span>Wrong format, numbers only</span>`;
    let blankError = document.createElement("div");
    blankError.classList.add("blankError-error");
    blankError.innerHTML = `<span>Can't be blank</span>`;
    checkWrongFormat(formNumber, numberError, "numberError");
    checkWrongFormat(formDate.querySelector(".cb-date_inputs"), blankError, "blankError");
    checkWrongFormat(formCvc, blankError, "blankError");
};
document.addEventListener("DOMContentLoaded", ()=>{
    let number = document.querySelector("input#cb-number");
    let month = document.querySelector("input#cb-date1");
    let year = document.querySelector("input#cb-date2");
    let cvc = document.querySelector("input#cb-cvc");
    number.addEventListener("input", ()=>{
        let value = number.value.split("");
        if ([
            5,
            10,
            15
        ].includes(value.length) && value.at(-1) !== " ") {
            let pop = value.pop();
            number.value = value.join("") + " " + pop;
        }
    });
    onlyNumbers(month);
    onlyNumbers(year);
    onlyNumbers(cvc);
});

//# sourceMappingURL=index.672d4772.js.map
