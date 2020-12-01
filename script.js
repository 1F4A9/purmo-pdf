const form = document.querySelector(".purmo__pdf--form");
const downloadBtn = document.getElementById("download-pdf-btn");
const errorText = document.getElementById("validation-text");
const input = document.getElementsByClassName("purmo__pdf--input-field")[0];
const select = document.querySelector('select[name="item-code"');

// item codes: F4XA017006000300, FCT2206006010000

// ******************* Event handler ******************* //

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const chosenItemcode = formData.get("itemcode");
  const chosenLanguage = formData.get("language");

  axios
    .get("./store.json")
    .then(({ data }) => filterData(data, chosenLanguage, chosenItemcode))
    .then((result) => {
      if (!result) return handleInputError();

      const { Url } = result;

      handleInputSuccess(Url);
    })
    .catch((err) => console.log(err));
});

// ******************* Main functions ******************* //

function handleInputSuccess(url) {
  addClass(errorText, 'd-none'); // hide validation text
  removeClass(downloadBtn, 'd-none'); // display download button
  setHrefAttribute(downloadBtn, url); // set href to pdf-url on button
};

function handleInputError() {
  removeClass(errorText, 'd-none'); // display validation text
  addClass(downloadBtn, 'd-none'); // hide download button
};

function filterData(data, language, itemCode) {
  const lang = language.toLowerCase();
  const item = itemCode.toLowerCase();

  return data
    .filter(x => x.Language.toLowerCase() === lang)
    .find(x => x.ItemCode.toLowerCase() === item);
};

// ******************* Helper functions ******************* //

function setHrefAttribute(element, url) {
  element.setAttribute("href", url);
};

function addClass(element, className) {
  element.classList.add(className);
};

function removeClass(element, className) {
  element.classList.remove(className);
};
