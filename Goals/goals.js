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

    document.querySelectorAll('a, .buttonElement').forEach(a => {
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

    Array.from(document.querySelectorAll('.galleryContainer')).forEach(gallery => {
        let width = gallery.getAttribute('data-width'); // string
        let height = gallery.getAttribute('data-height'); // string

        let aspectRatio = gallery.getAttribute('data-aspectRatio'); // string

        let innerGallery = gallery.querySelector('.gallery');

        if(!aspectRatio){aspectRatio = '1/1'}

        if(!width){gallery.style.width = 'auto'}
        if(!height){gallery.style.aspectRatio = aspectRatio}

        gallery.style.width = width;
        if(height){gallery.style.height = height};

        const leftArrow = gallery.querySelector('.galleryArrows > .leftArrow');
        const rightArrow = gallery.querySelector('.galleryArrows > .rightArrow');

        let slideIndex = gallery.getAttribute('data-slideIndex');

        const upadteSlideIndex = (newIndex) => {
            slideIndex = newIndex.toString();
            gallery.setAttribute('data-slideIndex', newIndex.toString());
            updateArrows()
        }
        
        const updateArrows = () => {

            switch(slideIndex){
                case '1':
                    leftArrow.style.opacity = 0;
                    rightArrow.style.opacity = 1;

                    leftArrow.style.pointerEvents = 'none';
                    rightArrow.style.pointerEvents = 'all';
                    
                    innerGallery.style.transform = 'translateX(0%)';
                    break;
                case '2':
                    rightArrow.style.opacity = 0;
                    leftArrow.style.opacity = 1;

                    leftArrow.style.pointerEvents = 'all';
                    rightArrow.style.pointerEvents = 'none';
                    
                    innerGallery.style.transform = 'translateX(-50%)';
                    break;
            }
        }

        updateArrows();

        leftArrow.onclick = () => upadteSlideIndex(1);
        rightArrow.onclick = () => upadteSlideIndex(2);
    })

    Array.from(document.querySelectorAll('.galleryContainer > .gallery > .goals > span')).forEach(text => {
        let gridArea = text.getAttribute('data-gridArea');
        
        if(!gridArea){return}
        text.style.gridArea = gridArea;
    })
});