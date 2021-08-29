const settings = {
    width: 10,
    height: 10,
    difficulty: 100,
};
const directions = ["N", "E", "S", "W"];
let table;

async function init() {

    await initSidebar();
    Util.bgColor();

    generate();
}

function generate() {

    // Create a blank grid
    table = new Util.Table(document.querySelector("#maze"), settings.height, settings.width);

    // Give every cell every wall
    table.each((c) => {
        c.walls = { N: true, E: true, S: true, W: true };
        c.visited = false;
    });

    // Create list of cells starting with 1 random
    const cells = [table.random()];
    cells[0].start = true;
    cells[0].number = 1;

    let distance = 0;
    let number = 1;
    let runs = 0;

    // Move from start
    move();


    // Function to run after maze has been fully generated
    function done() {
        // Mark the ending tile
        table.cells.sort((a, b) => b.distance - a.distance)[0].end = true;

        // Go through each cell and draw the wall and end and start
        table.cells.forEach((cell) => {
            if (cell.start) cell.elem.classList.add("start");
            if (cell.end) cell.elem.classList.add("end");

            directions.forEach((wall) => {
                cell.walls[wall] === true
                ? cell.elem.classList.add(wall)
                : cell.elem.classList.remove(wall);
            });

            // cell.content = cell.distance || "";
        });
        table.update();
        setTimeout(() => {
                    table.delete();
                    generate();
        }, 500);

    }

    async function move() {
        runs += 1;
        if (cells.length === 0) { return done(); }

        // Decide the cell to move from
        const cell = Math.random() < settings.difficulty / 100
        ? cells.sort((a, b) => number - a.number)[0]
        : Util.random(cells);
        // console.log(cells.sort((a, b) => number - a.number));

        // Get possible places to move to
        const nextCells = cell.touching().filter((c) => !c.visited);


        // If no unvisited cells nearby move back
        if (nextCells.length === 0) {
            distance -= 1;
            cells.splice(cells.findIndex((c) => c === cell), 1);
            cell.elem.classList.add("done");
        }


        // If there are unvisted cells randomly move forward to one
        else {
            distance += 1;

            const nextCell = Util.random(nextCells);
            number += 1;
            nextCell.number = number;

            // The direction of the next cell relative to this one
            const direction
            = nextCell.row < cell.row ? "N"
            : nextCell.col > cell.col ? "E"
            : nextCell.row > cell.row ? "S"
            : "W";

            // The closest wall on the next cell
            const nextWall
            = direction === "N" ? "S"
            : direction === "E" ? "W"
            : direction === "S" ? "N"
            : "E";

            // Remove the walls between this and next cell
            cell.walls[direction] = false;
            nextCell.walls[nextWall] = false;

            cells.push(nextCell);
            cell.distance = distance;
            // cell.elem.classList.remove("on");
            // nextCell.elem.classList.add("on");
        }
        // cell.elem.classList.add("visited");
        // cell.elem.classList.remove("on");

        // await Util.pause(0);
        cell.distance = distance;
        cell.visited = true;

        move();
    }
}

