async function initNavbar(params) {

    let pages = await (await fetch("/navbar/pages.json")).json();

    // Construct the pages
    pages = pages.map((page) => {
        return page.link
        ? `<a ${page.desc ? `data-title="${page.desc}"` : ""} href="/pages/${page.link}" class="sidebar-page"><p>${page.name}</p><div></div></a>`
        : `<p ${page.desc ? `data-title="${page.desc}"` : ""} class="sidebar-title">${page.name}</p>`;
    });

    // Construct the navbar
    const nav = `
    <!-- Navbar Inseted Via Javascript Code -->
    <link rel="stylesheet" href="/navbar/index.css">

    <nav class="nav-container">
        <div class="navbar">
            <button onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
            <a href="/"><i class="fas fa-home"></i></a>
        </div>

        <div class="sidebar">
            ${pages.join("")}
        </div>
    </nav>
    `.replace(/\n/g, "");

    document.body.innerHTML += nav;
}

function toggleSidebar() {
    const nav = document.querySelector(".nav-container");
    nav.classList.toggle("active");
}

/*
const html = `
<!-- Navbar Inseted Via Javascript Code -->
<link rel="stylesheet" href="/navbar/index.css">

<div class="nav-container">
<div class="navbar">
    <button onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
    <a href="/"><i class="fas fa-home"></i></a>
</div>

<div class="sidebar">
    <p class="sidebar-title">Testing</p>
    <a href="/pages/test" class="sidebar-page">Test Page 1<div></div></a>

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
    if (!nav.classList.contains("active")) return;

    const target = event.target;
    if (target !== nav && !nav.contains(target)) toggleSidebar();
});
}
*/