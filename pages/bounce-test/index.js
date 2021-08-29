// Util functions
const randRange = (min, max) => Math.floor(Math.random() * (max - min) + min);
const colorRange = (h, s, l, amt) =>  new Array(amt).fill().map((_, i) => `hsl(${h}, ${s}, ${l})`.replaceAll("i", i));


// Palletes
const palletes = [
    { id: "light", background: "#d6f8ff", colors: colorRange("i", 100, 60, 360) },
    { id: "dark", background: "#ebfcff", colors: colorRange("i", 50, 50, 360) },
    { id: "grey", background: "#edf4ff", colors: colorRange(0, 0, "i", 101) },

];


// Global variables
let layers;
const width = 1000;
const height = 1000;


async function init() {

    await initSidebar();
    sidebarTheme();

    // Setup layers
    layers = {
        ball: new Layer("ballLayer"),
        path: new Layer("pathLayer"),
        trail: new Layer("trailLayer"),
    };


    // Setup palletes


}

// Layers


class Layer {
    constructor (id) {
        this.canvas = document.getElementById(id);

        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = this.canvas.getContext("2d");
    }

    clear () {
        this.ctx.clearRect(width, height);
    }

    circle (x, y, size, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 2, Math.PI * 2, false);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    square (x, y, size, color) {
        this.ctx.beginPath();
        this.ctx.rect(x - size / 2, y - size / 2, size, size);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        console.log(x - size / 2, y - size, size * 2, size * 2);
    }
}