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

    // image hover effect

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

    document.querySelectorAll('.buttonElement').forEach(a => {
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

    // image galleries

    Array.from(document.querySelectorAll('.imageGallery')).forEach(container => {
        let width = container.getAttribute('data-width'); // string
        let height = container.getAttribute('data-height'); // string
        
        let columns = container.getAttribute('data-columns'); // string
        let rows = container.getAttribute('data-rows'); // string

        let aspectRatio = container.getAttribute('data-aspectRatio'); // string

        if(!aspectRatio){aspectRatio = '1/1'}

        if(!width){container.style.width = '100%'}
        if(!height){container.style.aspectRatio = aspectRatio}
        if(!columns){container.style.gridTemplateColumns = '1fr'}
        if(!rows){container.style.gridTemplateRows = '1fr'}

        container.style.width = width;
        if(height){container.style.height = height};

        container.style.gridTemplateColumns = columns;
        container.style.gridTemplateRows = rows;
    })

    Array.from(document.querySelectorAll('.projectContainer')).forEach(projectContainer => {
        let gridArea = projectContainer.getAttribute('data-gridArea');
        let style = projectContainer.getAttribute('data-style');
        let imgUrl = projectContainer.getAttribute('data-imgUrl');
        let desc = projectContainer.getAttribute('data-projectDescription');
        let title = projectContainer.getAttribute('data-projectTitle');
        let titleLink = projectContainer.getAttribute('data-titleLink');
        if(!gridArea){gridArea = 1/1/-1/-1}
        if(!style){return}
        if(!imgUrl){imgUrl = ''}
        if(!title){title = ''}
        if(!desc){desc = ''}
        projectContainer.style.gridArea = gridArea;


        // project styles

        if(style == '1'){
            const bodyContainer = document.createElement('div');
            const image = document.createElement('div');
            const descriptionContainer = document.createElement('div');
            const projectTitle = document.createElement('div');
            const description = document.createElement('div');

            bodyContainer.classList.add('bodyContainer');
            image.classList.add('image');
            descriptionContainer.classList.add('projectDescriptionContainer');
            projectTitle.classList.add('projectTitle');
            description.classList.add('desc');

            image.style.backgroundImage = `url(${imgUrl})`;
            projectTitle.innerText = title;
            description.innerHTML = desc;

            projectContainer.append(bodyContainer);
            bodyContainer.append(image, descriptionContainer);
            descriptionContainer.append(projectTitle, description);
        }

        if(style == '2'){
            const bodyContainer = document.createElement('div');
            const subheading = document.createElement('a');
            const image = document.createElement('div');

            bodyContainer.classList.add('bodyContainer');
            subheading.classList.add('subheading');
            image.classList.add('image');

            subheading.innerHTML = title;
            subheading.href = titleLink;
            image.style.backgroundImage = `url(${imgUrl})`;

            projectContainer.append(bodyContainer);
            bodyContainer.append(image, subheading);
        }
    })
});