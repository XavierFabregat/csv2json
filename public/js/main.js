window.addEventListener("DOMContentLoaded", async () => {
  const results = JSON.parse(localStorage.getItem("results"));

  if (results) {
    const resultBox = document.getElementById("result-json");
    resultBox.textContent = JSON.stringify(results, null, 2);
  }

  const form = document.getElementById("csv-form");
  const resultBox = document.getElementById("result-json");
  const copyBtn = document.getElementById("copy-btn");
  const clearBtn = document.getElementById("clear-btn");

  const getToken = async () => {
    const { token } = await fetch("/auth/token").then((res) => res.json());
    return token;
  };
  const token = await getToken();

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const file = form.querySelector("input[type=file]").files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/csv/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    });

    const jsonRes = await response.json();
    localStorage.setItem("results", JSON.stringify(jsonRes));
    resultBox.textContent = JSON.stringify(jsonRes, null, 2);
  }

  function handleCopy() {
    if (!resultBox.textContent) {
      Toastify({
        text: "Nothing to copy! 🤷‍♂️",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      return;
    }
    navigator.clipboard.writeText(resultBox.textContent);
    Toastify({
      text: "Content copied! 🎉",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        // can you make the gradient green COPILOT? 🥺
        background: "linear-gradient(to right, #00FF00, #00FF7F)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }

  function handleClear() {
    if (!resultBox.textContent) {
      Toastify({
        text: "Nothing to clear! 🤷‍♂️",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      return;
    }
    localStorage.removeItem("results");
    resultBox.textContent = "";
    Toastify({
      text: "Content cleared! 🗑️",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        // can you make the gradient green COPILOT? 🥺
        background: "linear-gradient(to right, #00FF00, #00FF7F)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    return;
  }

  form.addEventListener("submit", onSubmit);
  copyBtn.addEventListener("click", handleCopy);
  clearBtn.addEventListener("click", handleClear);
});
