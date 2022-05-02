import hljs from "../node_modules/highlight.js/";
import "../node_modules/highlight.js/scss/github-dark.scss";

// add links on heach H2 element inside the content blocks. This is useful
// for the navigation bar links to point on it.
function addHeadingLinks() {
  const headings = document.querySelectorAll("main > div > h2");
  headings.forEach((heading) => {
    const parentDivId = heading.parentElement.id;
    const link = document.createElement("a");
    link.href = "#" + parentDivId;
    link.innerHTML = "&para;";
    heading.appendChild(link);
  });
}

// This is only a function to make navbar links "active" when we click on them. Or, when
// the page is loaded with a fragment that points on a specific section.
function makeNavlinkInteractive() {
  const navLinks = document.querySelectorAll("nav a");
  const allLinks = document.querySelectorAll("a");
  allLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((element) => {
        element.classList.remove("active");
      });
      setTimeout(() => setStartingLinkActive(), 100);
    });
  });
}

// Make the current section link active.
function setStartingLinkActive() {
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((navLink) => {
    navLink.classList.remove("active");
    if (navLink.href === window.location.href) {
      navLink.classList.add("active");
    }
  });
}

// Highlight the code blocks.
function highlight() {
  document.querySelectorAll("pre code").forEach((el) => {
    hljs.highlightElement(el);
  });
}

function imageFullable() {
  const images = document.querySelectorAll("img.fullable");
  // create an overlay div
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.classList.add("hidden");
  document.body.appendChild(overlay);
  images.forEach((image) => {
    image.addEventListener("click", (evt) => {
      image.classList.toggle("full");
      overlay.classList.toggle("hidden");
      evt.stopPropagation();
    });
  });
  // if "excape" is clicked, remove the full class for all
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      images.forEach((image) => {
        image.classList.remove("full");
        overlay.classList.add("hidden");
      });
    }
  });
  // and any click on the document will remove the full class for all
  document.addEventListener("click", () => {
    images.forEach((image) => {
      image.classList.remove("full");
      overlay.classList.add("hidden");
    });
  });
}

// all theses functions are called when the page is loaded.
[
  addHeadingLinks,
  makeNavlinkInteractive,
  setStartingLinkActive,
  imageFullable,
  highlight,
].forEach((fn) => {
  document.addEventListener("DOMContentLoaded", fn);
});
