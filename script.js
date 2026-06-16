document.addEventListener('DOMContentLoaded', () => {
    
    const blobs = document.querySelectorAll('.blob');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

        blobs.forEach(blob => {
            const speed = blob.getAttribute('data-speed') || 2;
            
            const x = mouseX * speed * 40;
            const y = mouseY * speed * 40;

            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    const triggers = document.querySelectorAll('.game-trigger');
    const tooltip = document.getElementById('floating-tooltip');

    const moveTooltip = (e) => {
        const offsetX = 30; 
        const offsetY = 30;
        
        let left = e.clientX + offsetX;
        let top = e.clientY + offsetY;
        
        const tooltipWidth = tooltip.offsetWidth;
        if (left + tooltipWidth > window.innerWidth) {
             left = e.clientX - tooltipWidth - offsetX; 
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', (e) => {
            const title = trigger.getAttribute('data-title');
            const desc = trigger.getAttribute('data-desc');
            const img1 = trigger.getAttribute('data-screenshot1');
            const img2 = trigger.getAttribute('data-screenshot2');
            const img3 = trigger.getAttribute('data-screenshot3');
            const colorTheme = trigger.getAttribute('data-color') === 'purple' ? 'text-purple-400' : 'text-yellow-400';

            tooltip.innerHTML = `
                <h4 class="font-orbitron text-2xl font-black ${colorTheme} mb-3 tracking-wide">${title}</h4>
                <p class="text-lg text-gray-300 mb-5 leading-relaxed">${desc}</p>
                <div class="grid grid-cols-3 gap-4">
                    <img src="${img1}" class="h-40 w-full object-cover rounded-xl border-2 border-white/10 shadow-md" onerror="this.src='https://placehold.co/300x300/333/aaa?text=Shot+1'">
                    <img src="${img2}" class="h-40 w-full object-cover rounded-xl border-2 border-white/10 shadow-md" onerror="this.src='https://placehold.co/300x300/333/aaa?text=Shot+2'">
                    <img src="${img3}" class="h-40 w-full object-cover rounded-xl border-2 border-white/10 shadow-md" onerror="this.src='https://placehold.co/300x300/333/aaa?text=Shot+3'">
                </div>
            `;

            moveTooltip(e);
            tooltip.classList.add('active');
        });

        trigger.addEventListener('mousemove', moveTooltip);

        trigger.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
});