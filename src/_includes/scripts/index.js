const observer1 = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if(entry.intersectionRatio >= 0.5) entry.target.style.opacity = 1;
            else if(entry.intersectionRatio > 0) entry.target.style.opacity = 0.5;
        } else entry.target.style.opacity = 0;
    })
}, {
    root: null,
    rootMargin: '100% 0px',
    threshold: [0, 0.5]
});

document.querySelectorAll("[data-scroll-item]").forEach(item => observer1.observe(item));
