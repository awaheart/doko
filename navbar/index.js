function initNavbar(params) {

const html = `
<!-- Navbar Inseted Via Javascript Code -->
<div class="nav-container">
<div class="navbar">
    <p onclick="toggleSidebar()"><i class="fas fa-bars"></i></p>
    <a href="/"><i class="fas fa-home"></i></a>
</div>

<div class="sidebar"> 
    <p class="sidebar-title">AAAAAAA</p>
    <a href="/pages/example" class="sidebar-page">Exampl a we 2</a>
    <a href="/pages/example" class="sidebar-page">Ex214ample</a>
    <a href="/pages/example" class="sidebar-page">Example</a>
    <a href="/pages/example" class="sidebar-page">Exa142mple</a>

    <li class="sidebar-title">the 2</li>
    <a href="/pages/example" class="sidebar-page">Exeaample</a>
    <a href="/pages/example" class="sidebar-page">Example</a>
    <a href="/pages/example" class="sidebar-page">Exagdsasmple</a>
    <a href="/pages/example" class="sidebar-page">Example</a>
    <a href="/pages/example" class="sidebar-page">Example</a>
    <a href="/pages/example" class="sidebar-page">Efegxample</a>

    <p class="sidebar-title">AAAAAAA</p>
    <a href="/pages/example" class="sidebar-page">Exampl a we 2</a>
    <a href="/pages/example" class="sidebar-page">Ex214ample</a>
    <a href="/pages/example" class="sidebar-page">Example</a>
    <a href="/pages/example" class="sidebar-page">Exa142mple</a>

    <li class="sidebar-title">the 2</li>
    <a href="/pages/example" class="sidebar-page">Exeaample</a>
    <a href="/pages/example" class="sidebar-page">Example</a>
    <a href="/pages/example" class="sidebar-page">Exagdsasmple</a>
    <a href="/pages/example" class="sidebar-page">Example</a>
    <a href="/pages/example" class="sidebar-page">Example</a>
    <a href="/pages/example" class="sidebar-page">Efegxample</a>
</div>
</div>
`;

document.body.innerHTML += html;


const nav = document.querySelector(".nav-container");

document.addEventListener("click", (event) => {
    console.log(event.target);
    if (!nav.classList.contains("active")) return;

    const target = event.target;
    if (target !== nav && !nav.contains(target)) {
        toggleSidebar();
    }
});
}

function toggleSidebar() {
    const nav = document.querySelector(".nav-container");
    nav.classList.toggle("active");
}