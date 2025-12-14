const displayButton = document.getElementById("displayButton");
const displayButtonImage = document.getElementById("displayButtonImage");
const vsTitle = document.getElementById("vs-title");
const vsInfo = document.getElementById("vs-info");
const html = document.getElementById("html");

let darkMode = false;

displayButton.onclick = () => {
    darkMode = !darkMode;
    if (darkMode) {
        vsTitle.classList.add("dark-mode-title");

        displayButtonImage.src = "https://img.icons8.com/?size=100&id=25031&format=png&color=FFFFFF";
        displayButton.classList.add("dark-mode-text");
        displayButton.classList.add("dark-mode-background");

        vsTitle.classList.add("dark-mode-text");

        vsInfo.classList.add("dark-mode-text");
        vsInfo.classList.add("dark-mode-background");

        html.classList.add("dark-mode-text");
        html.classList.add("dark-mode-background");
    } else {
        vsTitle.classList.remove("dark-mode-title");

        displayButtonImage.src = "https://img.icons8.com/?size=100&id=648&format=png&color=000000";
        displayButton.classList.remove("dark-mode-text");
        displayButton.classList.remove("dark-mode-background");

        vsTitle.classList.remove("dark-mode-text");

        vsInfo.classList.remove("dark-mode-text");
        vsInfo.classList.remove("dark-mode-background");

        html.classList.remove("dark-mode-text");
        html.classList.remove("dark-mode-background");
    }
}