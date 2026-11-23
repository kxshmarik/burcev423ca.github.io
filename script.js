function initTimeline(data) {
    const headersTrack = document.getElementById('headersTrack');
    const slider = document.getElementById('timelineSlider');
    const contentArea = document.getElementById('contentArea');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function renderHeaders() {
        headersTrack.innerHTML = '';
        slider.max = data.length - 1;
        data.forEach((period, index) => {
            const header = document.createElement('div');
            header.className = 'period-header';
            header.textContent = period.title;
            header.addEventListener('click', () => updateTimeline(index));
            headersTrack.appendChild(header);
        });
        updateTimeline(0);
    }

    function updateTimeline(index) {
        if (index < 0) index = 0;
        if (index >= data.length) index = data.length - 1;
        currentIndex = index;
        slider.value = index;

        document.querySelectorAll('.period-header').forEach((h, i) => {
            h.classList.toggle('active', i === index);
            if (i === index) h.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });

        contentArea.style.animation = 'none';
        contentArea.offsetHeight;
        contentArea.style.animation = null;
        contentArea.innerHTML = data[index].content;

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === data.length - 1;
    }

    slider.addEventListener('input', (e) => updateTimeline(parseInt(e.target.value)));
    prevBtn.addEventListener('click', () => updateTimeline(currentIndex - 1));
    nextBtn.addEventListener('click', () => updateTimeline(currentIndex + 1));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') updateTimeline(currentIndex - 1);
        if (e.key === 'ArrowRight') updateTimeline(currentIndex + 1);
    });

    renderHeaders();
}