document.addEventListener("DOMContentLoaded", () => {
    // scroll animation
    const AnimationElements = document.querySelectorAll(".defaultState");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("defaultAnimation");
            }
        });
    }, { threshold: 1 });

    AnimationElements.forEach(element => {
        observer.observe(element);
    });

    // custom mouse cursor

    const cursorIndicator = document.createElement('div');
    cursorIndicator.classList.add('cursorIndicator');

    const mainCursor = document.createElement('div');
    mainCursor.classList.add('mainCursor');

    document.body.append(cursorIndicator);
    document.body.append(mainCursor);

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.onmousemove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        mainCursor.style.top = `${e.clientY}px`;
        mainCursor.style.left = `${e.clientX}px`;
    };

    function cursorIndicatorLoop() {
        currentX += (mouseX - currentX) * 0.3;
        currentY += (mouseY - currentY) * 0.3;
        
        cursorIndicator.style.left = `${currentX}px`;
        cursorIndicator.style.top = `${currentY}px`;

        requestAnimationFrame(cursorIndicatorLoop);
    }

    cursorIndicatorLoop()

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            cursorIndicator.style.width = '50px';
            cursorIndicator.style.height = '50px';
            cursorIndicator.style.backgroundColor = 'rgb(255, 214, 156)';
        });

        img.addEventListener('mouseleave', () => {
            cursorIndicator.style.width = '25px';
            cursorIndicator.style.height = '25px';
            cursorIndicator.style.backgroundColor = 'white';
        });
    });

    document.querySelectorAll('a').forEach(a => {
        a.addEventListener('mouseenter', () => {
            cursorIndicator.style.width = '50px';
            cursorIndicator.style.height = '50px';
            cursorIndicator.style.backgroundColor = 'rgb(156, 201, 255)';
        });

        a.addEventListener('mouseleave', () => {
            cursorIndicator.style.width = '25px';
            cursorIndicator.style.height = '25px';
            cursorIndicator.style.backgroundColor = 'white';
        });
    });

    Array.from(document.querySelectorAll('.imgContainer')).forEach(container => {
        let width = container.getAttribute('data-width'); // string
        let height = container.getAttribute('data-height'); // string
        
        let columns = container.getAttribute('data-columns'); // string
        let rows = container.getAttribute('data-rows'); // string

        let aspectRatio = container.getAttribute('data-aspectRatio'); // string

        if(!aspectRatio){aspectRatio = '1/1'}

        if(!width){container.style.width = 'auto'}
        if(!height){container.style.aspectRatio = aspectRatio}
        if(!columns){container.style.gridTemplateColumns = '1fr'}
        if(!rows){container.style.gridTemplateRows = '1fr'}

        container.style.width = width;
        if(height){container.style.height = height};

        container.style.gridTemplateColumns = columns;
        container.style.gridTemplateRows = rows;
    }) 
});