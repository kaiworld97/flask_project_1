let dialog = document.getElementById('dialog');

function opendia() {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    alert("The <dialog> API is not supported by this browser");
  }
}
dialog.addEventListener('cancel', function onClose() {
    window.location.reload()
});

