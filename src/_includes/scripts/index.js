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

document.querySelectorAll("[data-timer]").forEach(el => {
    el.innerHTML = `--:--:--`;

    const value = el.getAttribute('data-timer');
    if (!value) return;
    
    let timer = null;

    const withPadding = (input) => {
        if (input >=0 && input < 10) return `0${input}`;
        return `${input}`;
    };

    const callback = () => {
        const 
            endDate = new Date(value),
            diffInMs = endDate - new Date();
        
        if (timer && diffInMs < 0) {
            el.innerHTML = `--:--:--`;
            clearTimeout(timer);
            return;
        }
        
        const
            remainingTotalDays = Math.floor(diffInMs/(1000*60*60*24)),
            remainingTotalHours = Math.floor(diffInMs/(1000*60*60)),
            remainingTotalMinutes = Math.floor(diffInMs/(1000*60)),
            remainingTotalSeconds = Math.floor(diffInMs/(1000)),
            hoursToShow = remainingTotalHours % 24,
            minutesToShow = remainingTotalMinutes % 60,
            secondsToShow = remainingTotalSeconds % 60;

        el.innerHTML = `${remainingTotalDays > 0 ? remainingTotalDays + ' days ' : ''}${withPadding(hoursToShow)}:${withPadding(minutesToShow)}:${withPadding(secondsToShow)} sec`;
    };

    callback();
    timer = setInterval(callback, 1000);
});