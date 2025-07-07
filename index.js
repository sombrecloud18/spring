import { projects, navigationPoints } from "./constants.js";

function createNavigationMenu(navigationPoints) {
  const navMenu = document.querySelector(".header__menu");
  navMenu.innerHTML = "";
  navigationPoints.forEach((point) => {
    const li = document.createElement("li");
    if (point.dropdown) {
      li.className = "menu-item has-dropdown";
      li.innerHTML = `
                    ${point.title}
                    <div class="dropdown-content">
                        ${point.dropdown
                          .map(
                            (link) => `<a href="${link.url}">${link.title}</a>`
                          )
                          .join("")}
                    </div>
                `;
    } else {
      li.className = "menu-item";
      li.innerHTML = `<a href="${point.url || "#"}">${point.title}</a>`;
    }
    navMenu.appendChild(li);
  });
}

function mobileView() {
  const burgerMenu = document.querySelector(".burger-menu");
  const headerNav = document.querySelector(".header__nav");
  const closeBtn = document.querySelector(".close-btn");
  const overlay = document.querySelector(".overlay");
  burgerMenu.addEventListener("click", () => {
    headerNav.classList.add("open");
    burgerMenu.style.display = "none";
  });

  function closeMenu() {
    headerNav.classList.remove("open");
    burgerMenu.style.display = "";
  }

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}

function renderProjects(projectsArray) {
  const container = document.querySelector(".cards__container");
  container.innerHTML = "";

  if (projectsArray.length === 0) {
    container.innerHTML = `
            <div class="no-results">
                <h3>No projects found</h3>
                <p>Try adjusting your search or filter</p>
            </div>
        `;
    return;
  }

  projectsArray.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<div class="card_heading">
                <img src="${project.image}">
                <h3 class="card__title">${project.title}</h3>
                </div>
                <p class="card__description">${project.description}</p>
                <div class="versions">
                <span class="current_ver">${project.currentVersion}</span>
                <span class="all_ver">+ ${project.versionsCount} versions</span>
                </div>`;
    container.append(card);
  });
}

function search(projects) {
  let searchTimeout;
  const searchInput = document.querySelector(".search-box");
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const term = searchInput.value.toLowerCase().trim();
      if (!term) {
        renderProjects(projects);
        return;
      }
      const filtered = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term)
      );

      renderProjects(filtered);
    }, 300);
  });
}

function initApp() {
  createNavigationMenu(navigationPoints);
  renderProjects(projects);
  mobileView();
  search(projects);
}

document.addEventListener("DOMContentLoaded", initApp);
