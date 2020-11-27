const form = document.querySelector(".purmo__form__pdf");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const itemcode = formData.get("itemcode");
  const radioLanguage = formData.get("language");

  // "F4XA017006000300"

  axios
    .get("./store.json")
    .then(({ data }) => filterData(data, radioLanguage, itemcode))
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
});

function filterData(data, language, itemCode) {
  const lang = language.toLowerCase();
  const item = itemCode.toLowerCase();

  return data
    .filter(x => x.Language.toLowerCase() === lang)
    .find(x => x.ItemCode.toLowerCase() === item);
};

function createAnchorElement() {
  // TODO: skapa en länk med target="blank" och href="pdf.url"
};

// not used yet.
function validateArguments(array, string) {
  if (!array.length && array.length !== 0) throw new Error('invalid datatype.');
  else if (array.length === 0) throw new Error('array is empty.');

  if (typeof string !== 'string') throw new Error('invalid datatype.');
};
