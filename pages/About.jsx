import '../styles/About.css';

export default function About() {
    return (
        <main className="about-page">

            {/* Hero */}
            <section className="about-hero">
                <h1>Lorem Ipsum</h1>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer vitae justo nec lorem tincidunt.
                </p>
            </section>

            {/* About */}
            <section className="about-section">

                <h2>Lorem Ipsum Dolor</h2>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident.
                </p>

            </section>

            {/* Features */}
            <section className="about-section">

                <h2>Lorem Ipsum Features</h2>

                <div className="about-features">

                    <div className="feature-card">
                        <h3>Lorem Ipsum</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus feugiat tincidunt.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Dolor Sit Amet</h3>
                        <p>
                            Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Consectetur</h3>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore.
                        </p>
                    </div>

                </div>

            </section>

            {/* Disclaimer */}
            <section className="about-section about-disclaimer">

                <h2>Lorem Ipsum</h2>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla facilisi. Praesent commodo cursus magna, vel
                    scelerisque nisl consectetur et.
                </p>

                <p>
                    Integer posuere erat a ante venenatis dapibus posuere
                    velit aliquet. Cras mattis consectetur purus sit amet
                    fermentum.
                </p>

            </section>

        </main>
    );
}