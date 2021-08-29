const colors = ["#ff4545", "#fff045", "#51ff45", "#45fff9", "#5b45ff", "#bb45ff", "#ff45d1", "#ff476c"];
const colors2 = ["#ffd6d6", "#faff70", "#9cffa5", "#b8ffee", "#b8c4ff", "#d3b8ff", "#e7b8ff", "#ffb8e9"];

const types = {
    blank: "",
    bomb: "<img src='images/bomb.png'>",
    flag: "<img src='images/flag.png'>",
};

let first = true;

for (let i = 1; i <= 8; i++) { types[`${i}`] = `<div style='color: ${colors[i - 1]};'>${i}</div>`; }

const settings = {};
let table, flagged, time, lives;

async function init() {

    await initSidebar();
    Util.bgColor();


    setState("start");

}

function startGame() {
    const setSetting = (s) => settings[s] = document.querySelector(`#s-${s}`).value;
    setSetting("rows");
    setSetting("cols");
    setSetting("mines");
    setSetting("lives");

    flagged = 0;
    time = 0;
    lives = settings.lives;

    if (settings.mines >= settings.rows * settings.cols) settings.mines = settings.rows * settings.cols - 1;

    createTable();
    table.each((c) => {
        c.display = "hidden";
        c.type = "blank";
        c.shown = false;
        c.onclick = (e) => click(c, e);
    });

    updateCells();
    setState("game");

    updateStat("mines", settings.mines);
    updateStat("lives", lives);
}

function updateStat(id, value) {
    const stat = document.getElementById(id);

    const split = stat.innerText.split(":")[0] + `: ${value}`;
    stat.innerText = split;
}

function click(cell, event) {
    if (cell.shown) return;

    // Left Click
    if (event.button === 0) {
        if (first) { first = false; firstClick(cell); }
        if (cell.type === 0) spreadBlank(cell);

        if (cell.flagged) {
            cell.flagged = false;
            flagged -= 1;
            updateStat("mines", settings.mines - flagged);
        }
        cell.shown = true;
    }

    // Right CLick
    else if (event.button === 2) {
        cell.flagged = cell.flagged ? false : true;
        cell.flagged ? flagged += 1 : flagged -= 1;
        updateStat("mines", settings.mines - flagged);
    }


    updateCell(cell);
}

function spreadBlank(cell) {
    let spread = [cell, ...cell.nearby()];
    spread = spread.filter((c) => !c.shown && c.type === 0 );
    spread.forEach((c) => {
        c.shown = true;

        c.nearby()
        .filter((a) => !a.shown && a.type !== 0)
        .forEach((a) => { a.shown = true; updateCell(a); });

        if (c !== cell) spreadBlank(c);
        updateCell(c);
    });
}

function firstClick(cell) {
    for (let i = 0; i < settings.mines; i++) { createBomb(cell); }
    numberCells();

    setInterval(() => {
        time += 1;
        updateStat("time", `${Math.floor(time / 60)}:${("00" + (time % 60)).slice(-2)}`);
    }, 1000);
}

function numberCells() {
    table.each((cell) => {
        if (cell.type === "bomb") return;
        const nearbyBombs = cell.nearby().filter((c) => c.type === "bomb").length;
        cell.type = nearbyBombs;
        updateCell(cell);
    });
}

function updateCells() { table.each((c) => updateCell(c)); }

function updateCell(cell) {
    // Update display
    cell.shown
    ? cell.elem.classList.add("shown")
    : cell.elem.classList.remove("shown");

    cell.showContent = cell.shown || cell.flagged ? true : false;

    // Update content
    if (cell.flagged && !cell.shown) { cell.content = types.flag; }
    else if (cell.type === "bomb") { cell.content = types.bomb; }
    else if (cell.type === 0) { cell.content = "";}
    else { cell.content = types[cell.type]; }

    cell.update();
}

function createBomb(not) {
    const cell = table.random();
    cell.type === "bomb" || cell === not || cell.nearby().includes(not)
    ? createBomb(not) : cell.type = "bomb";
}

function endGame(win) { table.delete(); win ? setState("win") : setState("loose"); }

function createTable() {
    table = new Util.Table(document.getElementById("table"), settings.rows, settings.cols);

    table.update();
}

function setState(state) {
    const states = ["start", "win", "loose", "game"];
    states.forEach((s) => {
        const screen = document.getElementById(s);
        s === state
        ? screen.classList.add("active")
        : screen.classList.remove("active");
    });
}