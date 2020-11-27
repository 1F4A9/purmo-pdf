const form = document.querySelector('#form');
const textInput = document.querySelector('input[type="text"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');

// <form id="form">
//   <input type="text">
//   <input type="radio" name="language" value="sv-SE">Swe
//   <input type="radio" name="language" value="en">En
// </form>

form.addEventListener('submit', handleFormSubmit);
async function handleFormSubmit(e) {
  e.preventDefault();

  // fetching data
  const data = await fetchData();

  // the selected values of user input
  const selectedLanguage = getSelectedValue(radioButtons);
  const selectedItemCode = textInput.value;

  // TODO: Validation.

  const result = filterData(data, selectedLanguage, selectedItemCode);

  console.log(result)
};

function filterData(data, language, itemCode) {
  const lang = language.toLowerCase();
  const item = itemCode.toLowerCase();

  return data
    .filter(x => x.Language.toLowerCase() === lang)
    .find(x => x.ItemCode.toLowerCase() === item);
}

async function fetchData() {
  try {
    const { data } = await axios.get('../store.json');
    return data
  } catch (error) {
    console.log(error);
  }
};

function getSelectedValue(radioButtons) {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) return radioButtons[i].value;
  };
};

// not used yet.
function validateArguments(array, string) {
  if (!array.length && array.length !== 0) throw new Error('invalid datatype.');
  else if (array.length === 0) throw new Error('array is empty.');

  if (typeof string !== 'string') throw new Error('invalid datatype.');
};



// ******************************* Daniel **************************************



const form = document.querySelector(".purmo__form__pdf");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const itemcode = formData.get("itemcode");
  const radioLanguage = formData.get("language");

  console.log(itemcode, radioLanguage);
  // "F4XA017006000300"
  axios
    .get("./store.json")
    .then((res) => {
      let result = res.data.filter(
        (pdf) => pdf.ItemCode === itemcode && pdf.Language === radioLanguage
      );
      return result;
    })
    .then((result) => {
      console.log(result);
      result.forEach((pdf) => console.log(pdf.Url));
    });
});
