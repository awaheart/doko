// Initialization function
async function init() {

    await initSidebar();
    Util.bgColor();

    const table = new Util.Table(document.getElementById("table"), 10, 10);

    table.setContent(() => (Math.floor(Math.random() * 10) / 0.7).toFixed(2));

    table.cells[0].showContent = false;

    table.cells[5].content = "<h1>Hi</h1>";

    table.update();

    setInterval(() => {
        Util.bgColor();
    }, 1000);

    toggleSidebar();
}