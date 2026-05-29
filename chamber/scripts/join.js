const timestampField =
document.querySelector("#timestamp");

timestampField.value =
new Date().toISOString();

const infoButtons =
document.querySelectorAll(".info-button");

const closeButtons =
document.querySelectorAll(".close-dialog");

infoButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const dialogId =
        button.dataset.dialog;

        document
            .querySelector(`#${dialogId}`)
            .showModal();

    });

});

closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        button
            .closest("dialog")
            .close();

    });

});
