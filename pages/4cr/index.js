async function init() {

    await initSidebar();

    const cells = document.getElementsByClassName("cell");

    const pattern = [];

    setInterval(() => {
        const cell = Array.from(cells)[Math.floor(Math.random() * 4)];

        cell.classList.add("lit");
        setTimeout(() => cell.classList.remove("lit"), 1000);
     }, 1200);
}

function showPattern(params) {
e;
}