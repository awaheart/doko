
async function init() {

    await initSidebar();
    Util.bgColor();

    // Markers
    const mcanvas = document.getElementById("markers");
    const mctx = mcanvas.getContext("2d");
    const radius = mcanvas.width / 2;

    mctx.translate(radius, radius);
    mctx.lineCap = "round";
    mctx.strokeStyle = "#22212e";

    for (let i = 1; i <= 60; i++) {
        mctx.beginPath();
        ang = i * Math.PI / 30;
        mctx.rotate(ang);

        const styles = [
            { i: 15, width: 8, length: 30, color: "#22212e" },
            { i: 5, width: 4, length: 20, color: "#22212e" },
            { i: 1, width: 1, length: 2, color: "#22212e" },
        ];

        const style = styles.find((obj) => Number.isInteger(i / obj.i));
        mctx.strokeStyle = style.color;
        mctx.lineWidth = style.width;
        length = style.length;

        mctx.moveTo(0, -radius*0.9);
        mctx.lineTo(0, -radius*0.9 + length);
        mctx.stroke();
        mctx.rotate(-ang);
    }


    // Hands
    const hcanvas = document.getElementById("hands");
    const hctx = hcanvas.getContext("2d");

    hctx.lineCap = "round";
    hctx.translate(radius, radius);


    const hands = [
        {
            sec: 1, pos: 1000, width: 4, length: 100, color: "#ffd438",
        },
        {
            sec: 1000, pos: 60, width: 2, length: 240, color: "#ff3849",
        },
        {
            sec: 60000, pos: 60, width: 5, length: 200, color: "#60ff38",
        },
        {
            sec: 3600000, pos: 12, width: 8, length: 150, color: "#384fff",
        },
    ];

    setTime(hcanvas, hctx, hands, radius);
    setInterval(setTime, 1, hcanvas, hctx, hands, radius);
}

function setTime(canvas, ctx, hands, radius) {
    const now = new Date();

    ctx.translate(-radius, -radius);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);


    hands.forEach((hand, i) => {

        const miliseconds = now.getMilliseconds();
        const seconds = now.getSeconds() * 1000 + miliseconds;
        const minutes = now.getMinutes() * 60000 + seconds;
        const hours = now.getHours() * 3600000 + minutes;

        const time = [
            miliseconds,
            seconds,
            minutes,
            hours > 216000 ? hours - 216000 : hours,
        ][i];

        const ang = time * Math.PI / (hand.pos * hand.sec) * 2;

        ctx.beginPath();
        ctx.strokeStyle = hand.color;
        ctx.lineWidth = hand.width;

        ctx.rotate(ang);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -hand.length);
        ctx.stroke();
        ctx.rotate(-ang);
    });

    ctx.beginPath();
    ctx.fillStyle = "#22212e";
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
}