document.addEventListener('DOMContentLoaded', () => {
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
});
