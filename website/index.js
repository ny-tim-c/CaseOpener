// gets param
const params = new URLSearchParams(window.location.search);
const m = params.get("m");
if (m !== null) {
  // Save value
  localStorage.setItem("saved_m", m);

  // Remove ?m= from URL without reloading
  const cleanUrl = window.location.pathname + window.location.hash;
  window.history.replaceState({}, document.title, cleanUrl);
}

// Retrieve saved value anytime
const savedM = localStorage.getItem("saved_m");
console.log("Current saved m:", savedM);
document.getElementById("wallet").textContent = `Wallet: ${savedM} Emeralds`;
function goToOpener(caseName_Opener) {
  const where = `/website/opener/opener.html?c=${caseName_Opener}&m=${savedM}`;
  window.location.href = where;
}
