const useRegex = (tab) => {
    let regex = /[0-9]+/i;
    return regex.test(tab);
}

const onlyNumbers = (input) => {
    input.addEventListener("input", () => {
        let value = input.value.split("");

        if (!useRegex(value)) {
            value.pop();
            input.value = value.join();
        }
    })
}


const checkWrongFormat = (qs, error, errorName) => {
    let qsVal = qs.querySelectorAll("input");
    let errorFound = false;

    qsVal.forEach((item) => {
        let itemVal = item.value.split(" ").join("");
        item.classList.remove("isWrong");

        if (isNaN(itemVal) || itemVal === "") {
            errorFound = true;
            item.classList.add("isWrong");
        }
    })

    if (qs.querySelector(`.${errorName}`) != null) {
        qs.removeChild(qs.querySelector(`.${errorName}`));

    }
    if (errorFound) {
        if (qs.querySelector(`.${errorName}`) == null) {
            qs.appendChild(error);
        }
    }
    console.log(errorFound);
    return errorFound;
}

const verify = () => {
    console.log("verifying...")
    let formNumber = document.querySelector(".form_cb-number");
    let formDate = document.querySelector(".cb-more_date");
    let formCvc = document.querySelector(".cb-more_cvc");

    let numberError = document.createElement("div");
    numberError.classList.add("error");
    numberError.innerHTML = `<span>Wrong format, numbers only</span>`;

    let blankError1 = document.createElement("div");
    blankError1.classList.add("error");
    blankError1.innerHTML = `<span>Can't be blank</span>`;

    let blankError2 = document.createElement("div");
    blankError2.classList.add("error");
    blankError2.innerHTML = `<span>Can't be blank</span>`;

    let n = checkWrongFormat(formNumber, numberError, "error");
    let d = checkWrongFormat(formCvc, blankError1, "error");
    let c = checkWrongFormat(formDate, blankError2, "error");

    if (!n && !d && !c) {
        startEndToggle();
    }
}

const numberCardUpdate = () => {
    let numberInput = document.querySelector("input#cb-number");
    let numberOutput = document.querySelector(".cb_front_number");
    let initialOutput = "0000 0000 0000 0000";
    numberOutput.innerHTML = numberInput.value + initialOutput.slice(numberInput.value.length, initialOutput.length);
}

const nameCardUpdate = () => {
    let nameInput = document.querySelector("input#cb-name");
    let nameOutput = document.querySelector(".cb_front_infos")
        .querySelector("span");

    if (nameInput.value.length <= 25) {
        nameOutput.innerText = nameInput.value;
    } else {
        let name = nameInput.value.split(" ");
        name[0] = name[0].slice(0, 1) + ".";
        nameOutput.innerText = name.join(" ");
    }
}

const startEndToggle = () => {
    let toggleSection = document.querySelectorAll(".toggle-section");

    toggleSection.forEach((item) => {
        item.classList.toggle("isHidden");
    })

    toggleSection[0].querySelector("form").reset();
}

const dateCardUpdate = () => {
    let monthInput = document.querySelector("input#cb-date1");
    let output = document.querySelector(".cb_front_infos")
        .querySelector("span:last-child");
    let yearInput = document.querySelector("input#cb-date2");

    output.innerText = "00/00"

    if (monthInput.value !== "") {
        output.innerText = monthInput.value + output.innerText.slice(2, 5)
    }
    if (yearInput.value !== "") {
        output.innerText = output.innerText.slice(0, 3) + yearInput.value
    }
}

const cvcCardUpdate = () => {
    let cvcInput = document.querySelector("input#cb-cvc");
    let output = document.querySelector(".cb_back_cvc");

    output.innerText = "000";

    if (cvcInput.value !== "") {
        output.innerText = cvcInput.value;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let number = document.querySelector("input#cb-number");
    let name = document.querySelector("input#cb-name");
    let month = document.querySelector("input#cb-date1");
    let year = document.querySelector("input#cb-date2");
    let cvc = document.querySelector("input#cb-cvc")

    number.addEventListener("input", () => {
        let value = number.value.split("");

        if ([5, 10, 15].includes(value.length) && (value.at(-1) !== " ")) {
            let pop = value.pop();
            number.value = value.join("") + " " + pop;
        }
        numberCardUpdate();
    })

    month.addEventListener("input", () => {
        dateCardUpdate();
    })
    year.addEventListener("input", () => {
        dateCardUpdate();
    })

    name.addEventListener("input", () => {
        nameCardUpdate();
    })
    cvc.addEventListener("input", () => {
        cvcCardUpdate();
    })

    onlyNumbers(month);
    onlyNumbers(year);
    onlyNumbers(cvc);
});