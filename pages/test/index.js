async function init() {
    await initNavbar();
    await Util.updateDarkMode();

    const canvas = new Util.CanvasEngine(".canvas", 2500, 2500);

    const e = canvas.newObject({
      x: 10,
      y: 10,
      gravity: true,
    });
}