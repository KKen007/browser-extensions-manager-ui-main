let grid = document.querySelector(".grid");
let extension = document.querySelector(".extension");
let all = document.querySelector(".all-button");
let active = document.querySelector(".active-button");
let inactive = document.querySelector(".inactive-button");
let theme = document.querySelector(".theme");
let stylesheet = document.querySelector(".stylesheet");
let logo = document.querySelector(".logo");

fetch("https://kken007.github.io/browser-extensions-manager-ui-main/data.json")
.then(response => response.json())
.then(data => {

    for (let i = 0; i < data.length; i++) {
        let ext = extension.cloneNode(true);
        ext.querySelector(".ext-logo").src = data[i].logo;
        ext.querySelector("h2").textContent = data[i].name;
        ext.querySelector("p").textContent = data[i].description;
        ext.setAttribute("data-active", "false");
        ext.style.display = "grid";

        setTimeout(() => { 
            ext.setAttribute("data-active", data[i].isActive)
        }, 1000);

        grid.appendChild(ext);

        let remove = ext.querySelector(".remove");
        remove.addEventListener("click", () => {
            grid.removeChild(ext);
        });

        let on_off = ext.querySelector(".on-off");
        on_off.addEventListener("click", () => {
            if (ext.getAttribute("data-active") === "true") {
                ext.setAttribute("data-active", "false");
            }
            else {
                ext.setAttribute("data-active", "true");
            }
        });
    }
});

extension.style.display = "none";

theme.addEventListener("click", () => {
    let img = theme.querySelector("img");
    if (stylesheet.getAttribute("href") === "style.css") {
        stylesheet.setAttribute("href", "dark.css");
        img.setAttribute("src", "assets/images/icon-sun.svg");
        logo.setAttribute("src", "assets/images/logo-dark.svg");
    }
    else {
        stylesheet.setAttribute("href", "style.css");
        img.setAttribute("src", "assets/images/icon-moon.svg");
        logo.setAttribute("src", "assets/images/logo.svg");

    }
});

function load_active() {
    let extensions = document.querySelectorAll(".extension");
    for ( let i = 1; i < extensions.length; i++) {
        if (extensions[i].getAttribute("data-active") === "false") {
            extensions[i].style.display = "none";
        }
        else {
            extensions[i].style.display = "grid";
        }
    }
}

function load_inactive() {
    let extensions = document.querySelectorAll(".extension");
    for ( let i = 1; i < extensions.length; i++) {
        if (extensions[i].getAttribute("data-active") === "true") {
            extensions[i].style.display = "none";
        }
        else {
            extensions[i].style.display = "grid";
        }
    }
}

all.addEventListener("click", () => {
    active.setAttribute("data-on", false);
    all.setAttribute("data-on", true);
    inactive.setAttribute("data-on", false);

    let extensions = document.querySelectorAll(".extension");
    for ( let i = 1; i < extensions.length; i++) {
        extensions[i].style.display = "grid"
    }
});

active.addEventListener("click", () => {
    active.setAttribute("data-on", true);
    all.setAttribute("data-on", false);
    inactive.setAttribute("data-on", false);

    load_active();
});

inactive.addEventListener("click", () => {
    active.setAttribute("data-on", false);
    all.setAttribute("data-on", false);
    inactive.setAttribute("data-on", true);

    load_inactive();
});


