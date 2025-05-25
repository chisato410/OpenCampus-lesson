document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    // target="_blank" がすでにある場合は無視
    if (!link.hasAttribute("target")) {
      link.setAttribute("target", "_blank");
    }
  });
});