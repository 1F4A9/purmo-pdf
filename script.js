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
