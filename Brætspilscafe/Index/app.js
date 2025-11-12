document.addEventListener("DOMContentLoaded", function () {
  const options = document.querySelectorAll(".option");
  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      options.forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      const value = opt.dataset.value;
      console.log("Selected:", value);
      // Example: you can send selection to server or update UI here
      // fetch('/api/selection', { method: 'POST', body: JSON.stringify({location: value}) })
    });
  });
});
