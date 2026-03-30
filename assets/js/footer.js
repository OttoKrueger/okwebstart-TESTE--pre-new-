class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- ============================================================
            FOOTER
            ========================================================= -->
            <footer class="site-footer" role="contentinfo">
            <div class="container">
                <div class="footer-grid">
                <!-- Brand column -->
                <div class="footer-brand">
                    <a
                    href="index.html"
                    class="logo"
                    aria-label="OK WebStart - return to homepage"
                    >
                    <img src="/assets/imgs/LOGO-HEADER.png" alt="OK WebStart" />
                    </a>
                    <p class="footer-tagline">
                    Future-forward web development for ambitious brands.
                    </p>
                    <address class="footer-contact" aria-label="Contact information">
                    <a href="mailto:hello@okwebstart.com">okwebstart@gmail.com</a>
                    <a href="tel:+447594555815">+44 (0) 7594 555815</a>
                    </address>
                    <div class="social-links" aria-label="Social media profiles">
                    <a
                        href="https://www.linkedin.com/in/otto-krueger-b6aa62347/"
                        class="social-btn"
                        aria-label="OK WebStart on LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        width="18"
                        height="18"
                        >
                        <path
                            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                        />
                        </svg>
                    </a>
                    <a
                        href="https://instagram.com/okwebstart"
                        class="social-btn"
                        aria-label="OK WebStart on Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        width="18"
                        height="18"
                        >
                        <path
                            d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                        />
                        </svg>
                    </a>
                    </div>
                </div>

                <!-- Nav wrap — 2-col grid inside -->
                <nav class="footer-nav-wrap" aria-label="Footer navigation">
                    <div class="footer-nav-col">
                    <h4>Services</h4>
                    <ul role="list">
                        <li><a href="pages/services.html">Web Development</a></li>
                        <li><a href="pages/services.html">UX / UI Design</a></li>
                        <li><a href="pages/services.html">SEO &amp; Growth</a></li>
                        <li><a href="pages/services.html">E-Commerce</a></li>
                        <li><a href="pages/services.html">Brand Strategy</a></li>
                    </ul>
                    </div>
                    <div class="footer-nav-col">
                    <h4>Company</h4>
                    <ul role="list">
                        <li><a href="pages/about.html">About Us</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="#process">Process</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="pages/contact.html">Contact</a></li>
                    </ul>
                    </div>
                </nav>
                </div>

                <div class="footer-bottom">
                <p>
                    &copy; <span id="footerYear"></span> OK WebStart Ltd. All rights
                    reserved.
                </p>
                </div>
            </div>
            </footer>`;
        const yearEl = this.querySelector('#footerYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
}

customElements.define('main-footer', Footer);