document.addEventListener('DOMContentLoaded', () => {
    // Initialize background particles
    tsParticles.load("background-canvas", {
        particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.2, random: true },
            size: { value: 2, random: true },
            links: { enable: false },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            },
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "bubble" },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 200,
                    size: 3,
                    duration: 2,
                    opacity: 0.8,
                },
            },
        },
        retina_detect: true,
    });

    // Fetch and render content
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            renderHeader(data.personalInfo);
            renderContent(data);
            document.body.classList.add('content-loaded'); // Signal that content is loaded
        })
        .catch(error => console.error('Error loading content:', error));
});

function renderHeader(personalInfo) {
    const headerContainer = document.getElementById('header-container');
    headerContainer.innerHTML = `
        <h1>${personalInfo.name}</h1>
        <p class="job-title">${personalInfo.jobTitle}</p>
    `;
}

function renderContent(data) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        ${createContactSection(data.contact)}
        ${createServicesSection(data.services)}
        ${createBioSection(data.bio)}
        ${createSecurityToolSection(data.securityTool)}
    `;
}

function createContactSection(contact) {
    const links = contact.links.map(link => `
        <a href="${link.url}"><i class="${link.icon}"></i> ${link.text}</a>
    `).join('');

    const instructions = contact.instructions.steps.map(step => `<li>${step}</li>`).join('');

    return `
        <section id="contact">
            <h2>Contact</h2>
            <div class="contact-grid">${links}</div>
            <div class="contact-download">
                <a href="${contact.download.url}"><i class="${contact.download.icon}"></i> ${contact.download.text}</a>
            </div>
            <div class="contact-instructions">
                <p><strong>${contact.instructions.title}</strong></p>
                <ol>${instructions}</ol>
            </div>
        </section>
    `;
}

function createServicesSection(services) {
    const items = services.items.map(item => `
        <div class="service">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');

    return `
        <section id="services">
            <h2>${services.title}</h2>
            <div class="services-grid">${items}</div>
        </section>
    `;
}

function createBioSection(bio) {
    const paragraphs = bio.paragraphs.map(p => `<p>${p}</p>`).join('');
    const expertiseItems = bio.expertise.items.map(item => `<li>${item}</li>`).join('');

    return `
        <section id="bio">
            <h2>${bio.title}</h2>
            ${paragraphs}
            <h3>${bio.expertise.title}</h3>
            <ul>${expertiseItems}</ul>
        </section>
    `;
}

function createSecurityToolSection(securityTool) {
    return `
        <section id="security-tool">
            <h2>${securityTool.title}</h2>
            <a href="${securityTool.link.url}"><i class="${securityTool.link.icon}"></i> ${securityTool.link.text}</a>
        </section>
    `;
}
