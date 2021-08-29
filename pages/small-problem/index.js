async function init() {

    await initSidebar();

}

function grow(p) {
    document.body.classList.toggle("grow");
    p.classList.toggle("grow");
}