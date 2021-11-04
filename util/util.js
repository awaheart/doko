const Util = {};

// No variables can escape here
(() => {

    // Randrange min: inclusive, max: exlusive
    const randrange = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
    Util.randrange = randrange;


    // Random array item
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    Util.random = random;


    // Pause
    const pause = (ms) => new Promise((res) => setTimeout(res, ms));
    Util.pause = pause;


    // Canvas Game Engine
    class CanvasEngine {
        constructor(selector, width, height, options) {
            this.canvas = document.querySelector(selector);

            this.width = width;
            this.height = height;
            this.objects = [];

            Object.assign(this, options);


            this.canvas.width = this.width;
            this.canvas.height = this.height;

            this.draw();
        }

        newObject(type, obj) {
            switch (type) {
                case value:

                    break;

            }
        }

        draw() {
            const c = this.canvas;
            const ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.arc(100, 75, 50, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }


    Util.CanvasEngine = CanvasEngine;




    /* Configurable table
    class Table {
        constructor(elem, rows, cols) {
            this.elem = elem;
            this.rows = rows;
            this.cols = cols;
            this.cells = [];

            this.elem.className = "util-table";
            this.createTable();
        }

        createTable(rows = this.rows, cols = this.cols) {

            for (let rID = 1; rID <= rows; rID++) {
                const row = document.createElement("tr");

                for (let cID = 1; cID <= cols; cID++) {
                    const cell = document.createElement("td");
                    const cellContent = document.createElement("div");

                    cell.append(cellContent);
                    row.append(cell);
                    this.elem.append(row);

                    this.cells.push(new TableCell(cell, cellContent, rID, cID, this));
                }
            }
        }

        each(fn) { return this.cells.forEach(fn); }

        get(row, col) { return this.cells.find((c) => c.row === row && c.col === col); }

        getCells(fn) { return this.cells.filter(fn); }

        update() { this.cells.forEach((c) => c.update()); }

        setContent(fn) { this.cells.forEach((c) => c.content = fn()); }

        random() { return this.cells[Math.floor(Math.random() * this.cells.length)]; }

        delete() { this.elem.innerHTML = null; }
    }

    class TableCell {
        constructor(elem, celem, row, col, table) {
            this.elem = elem;
            this.celem = celem; // Content Element
            this.row = row;
            this.col = col;
            this.table = table;
            this.this = this;

            this.onclick = () => { return; };
            this.elem.onmousedown = (e) => this.onclick(e);

            this.content = "";
            this.showContent = true;

            this.update();
        }

        update() {
            this.celem.innerHTML = this.content;

            this.showContent
            ? this.celem.style.visibility = "visible"
            : this.celem.style.visibility = "hidden";
        }

        touching() {
            const touching = [[1, 0], [-1, 0], [0, 1], [0, -1]]
            .map((pos) => this.table.get(this.row + pos[0], this.col + pos[1]))
            .filter((c) => c);

            return touching;
        }

        nearby() {
            const nearby = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]
            .map((pos) => this.table.get(this.row + pos[0], this.col + pos[1]))
            .filter((c) => c);

            return nearby;
        }

        getByDirection(dir) {
            dir = dir.toUpperCase();
            const directions = {
                N: [0, 1], E: [1, 0], S: [0, -1], W: [-1, 0],
                NE: [1, 1], NW: [-1, 1], SE: [1, -1], SW: [-1, -1],
            };
            const pos = directions[dir];
            if (!pos) return;

            return this.table.get(this.row + pos[0], this.col + pos[1]);
        }
    }
    Util.Table = Table;



    // Terminal
    class Terminal {
        constructor(elem) {
            3; // why is there a 3 here?
        }
    }
    */
})();