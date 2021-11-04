async function init() {
    await initNavbar();

    const canvas = new Util.CanvasEngine(".canvas", 500, 500);

    canvas.newObject("ball", "10");
}