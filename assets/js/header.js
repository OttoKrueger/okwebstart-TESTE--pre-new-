class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- =======================================
            FLOATING HEADER
            ============================================ -->
            <header id="siteHeader" role="banner">
            <div class="header-inner">
                <a
                href="/index.html"
                class="logo"
                aria-label="OK WebStart - return to homepage"
                >
                <img src="/assets/imgs/LOGO-HEADER.png" alt="OK WebStart" />
                </a>
                <div class="header-right">
                <a href="/pages/contact.html" class="btn btn-outline btn-sm"
                    >Get in Touch</a
                >
                <button
                    class="btn btn-accent btn-sm"
                    id="hamburgerBtn"
                    aria-label="Open navigation menu"
                    aria-expanded="false"
                    aria-controls="mobileDrawer"
                >
                    Menu
                </button>
                </div>
            </div>
            </header>

            <!-- ===========================================
            MOBILE NAV DRAWER
            ============================================== -->
            <div class="nav-backdrop" id="navBackdrop" aria-hidden="true"></div>
            <nav
            id="mobileDrawer"
            class="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            >
            <ul class="drawer-nav" role="list">
                <li><a href="/index.html" class="drawer-link">Home</a></li>
                <li><a href="/pages/services.html" class="drawer-link">Services</a></li>
                <li><a href="/#portfolio" class="drawer-link">Work</a></li>
                <li><a href="/pages/about.html" class="drawer-link">About</a></li>
                <li><a href="/pages/contact.html" class="drawer-link">Contact</a></li>
            </ul>
            <a href="pages/contact.html" class="btn btn-accent btn-lg drawer-cta"
                >Start a Project</a
            >
            </nav>`;
    }
}

customElements.define('main-header', Header);