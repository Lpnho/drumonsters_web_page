// import PhotoSwipeLightbox from '/photoswipe/dist/photoswipe-lightbox.esm.js';

import PhotoSwipeLightbox from 'https://cdn.jsdelivr.net/npm/photoswipe@5.3.0/dist/photoswipe-lightbox.esm.js';

const galleryImages = [
    { src: 'images/gallery/gallery_1.png', width: 1080, height: 720 },
    { src: 'images/gallery/gallery_2.png', width: 1080, height: 720 },
    { src: 'images/gallery/gallery_3.png', width: 1080, height: 720 },
    { src: 'images/gallery/gallery_2.png', width: 1080, height: 720 },
    { src: 'images/gallery/gallery_2.png', width: 1080, height: 720 },
];

const lightbox = new PhotoSwipeLightbox({
    gallery: '#gallery--fade-transition',
    showHideAnimationType: 'fade',
    dataSource: galleryImages,
    pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.3.0/dist/photoswipe.esm.js')
    // pswpModule: () => import('/photoswipe/dist/photoswipe.esm.js')
});

const galleryHtml = document.getElementById('gallery-images');

galleryImages.forEach((element, i) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    div.classList.add('gallery-item');
    div.appendChild(img);
    img.classList.add('img-thumbnail', 'img-click');
    img.src = element.src;
    img.onclick = () => onImageClick(i, img);
    img.setAttribute('data-pswp-src', element.src)
    img.setAttribute('data-img-index', i)
    galleryHtml.appendChild(div);
});


const DISPLAY_NONE = 'd-none';
const BOOTSTRAP_MD_SCREEN_SIZE = 720;
var lastVideo = null

function isScreenSizeMD() {
    return window.innerWidth < BOOTSTRAP_MD_SCREEN_SIZE;
}
function removeDisplayNone(element) {
    if (element.classList.contains(DISPLAY_NONE))
        element.classList.remove(DISPLAY_NONE)
}
function addDisplayNone(element) {
    if (!element.classList.contains(DISPLAY_NONE))
        element.classList.add(DISPLAY_NONE)
}
function changeImageInFocus(index, item) {
    const div_displayElement = document.getElementById('display-image-container');
    const video_displayElement = document.getElementById('display-video-container');
    const img_displayElement = document.getElementById('display-image');

    removeDisplayNone(div_displayElement)
    addDisplayNone(video_displayElement)

    img_displayElement.src = item.src
    img_displayElement.alt = item.alt
    div_displayElement.setAttribute('data-pswp-src', item.src)
    div_displayElement.setAttribute('data-img-index', index)
}
function changeVideoInFocus(item) {
    const div_displayElement = document.getElementById('display-image-container');
    const video_displayElement = document.getElementById('display-video-container');
    const img_displayElement = document.getElementById('display-image');
    const videoSrc = item.querySelector('source').src;

    addDisplayNone(div_displayElement)
    removeDisplayNone(video_displayElement)

    video_displayElement.innerHTML = `
        <video class="img-fluid" controls>
        <source src="${videoSrc}" type="video/mp4">
        </video>`;

    const videoElement = video_displayElement.querySelector('video');
    videoElement.play();
}
function onImageClick(index, item) {
    changeImageInFocus(index, item)
    if (isScreenSizeMD()) {
        onDisplayImageClick();
    }
}
function onDisplayImageClick() {
    const div_displayElement = document.getElementById('display-image-container')
    const imageIndex = div_displayElement.getAttribute('data-img-index')
    lightbox.loadAndOpen(parseInt(imageIndex))
}
function onVideoClick(item) {
    if (isScreenSizeMD()) {
        item.setAttribute('controls', 'true')
        if (lastVideo != null) {
            lastVideo.pause()
        }

        item.play();
        lastVideo = item
        return;
    }
    changeVideoInFocus(item);
}

document.querySelectorAll('.video-click').forEach(item => {
    item.addEventListener('click', () => {
        onVideoClick(item);
    });
});
document.getElementById("display-image-container").addEventListener('click', onDisplayImageClick)

changeImageInFocus(0, galleryImages[0])
lightbox.init();

