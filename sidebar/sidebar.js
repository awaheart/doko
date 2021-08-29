async function initSidebar() {

    // Load sidebar pages
    const pages = await (await fetch("/sidebar/pages.json")).json();



    // Create the sidebar
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    // Create a list inside the sidebar
    const list = document.createElement("list");
    list.classList.add("sidebar-list");
    sidebar.appendChild(list);



    // Add pages to the list
    pages.forEach((ctg) => {

        // Add category title to list first
        const title = document.createElement("li");
        title.classList.add("sidebar-title");
        title.innerText = ctg.title;

        const line = document.createElement("div");
        line.classList.add("sidebar-line");

        list.appendChild(title);
        list.appendChild(line);

        // Then add all the pages in the category to list
        ctg.pages.forEach((p) => {
            const link = document.createElement("a");
            const page = document.createElement("p");
            const pusher = document.createElement("div");

            page.innerText = p.title;
            link.title = p.desc;
            link.href = `/pages/${p.id}`;
            link.classList.add("sidebar-page");
            link.appendChild(page);
            link.appendChild(pusher);

            list.appendChild(link);
        });
    });



    // Load sidebar stylesheet
    const style = document.createElement("link");
    style.href = "/sidebar/sidebar.css";
    style.rel = "stylesheet";
    document.head.appendChild(style);
    document.head.innerHTML += "<link href='https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap' rel='stylesheet'>";



    // Create sidebar button
    const button = document.createElement("div");
    button.id = "sidebar-button";

    const createBar = (i) => {
        const bar = document.createElement("div");
        bar.classList.add("sidebar-button-bar");
        bar.id = `sidebar-bar${i}`;
        bar.onclick = "toggleSidebar();";
        return bar;
    };

    (createBar(1));

    // Create 4 sidebar bars
    for (let i = 1; i <= 4; i++) {
        const bar = document.createElement("div");
        bar.classList.add("sidebar-button-bar");
        bar.id = `sidebar-bar${i}`;
        bar.onclick = "toggleSidebar();";
        button.appendChild(bar);
    }



    // Add sidebar to page
    const pageContent = document.createElement("div");
    pageContent.id = "page-content";
    pageContent.appendChild(document.body.cloneNode(["deep"]));

    document.body.innerHTML = `${button.outerHTML}${sidebar.outerHTML}${pageContent.outerHTML}`;

    // Add button onclick function
    document.getElementById("sidebar-button").onclick = toggleSidebar;

    sidebarListener();
}


// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const pageContent = document.getElementById("page-content");
    const button = document.getElementById("sidebar-button");

    sidebar.classList.toggle("sidebar-active");
    pageContent.classList.toggle("sidebar-active");
    button.classList.toggle("sidebar-active");
}


// Click listening
function sidebarListener() {
    const sb = document.getElementById("sidebar");
    const bt = document.getElementById("sidebar-button");
    document.addEventListener("click", (e) => {
        if (!sb.classList.contains("sidebar-active")) return;
        const t = e.target;
        if (t !== sb && !sb.contains(t) && t !== bt && !bt.contains(t)) {
            toggleSidebar();
        }
    });
}


// Dark theme
function sidebarTheme() {
    const sbt = document.getElementById("sidebar-button");
    sbt.classList.toggle("dark");
}