import { videoIds } from './constants.js'

window.showGalleryVideo = showGalleryVideo;

async function showGalleryVideo(idArrPosition) {
    const algorithm = idArrPosition[0];
    const learningMethod = idArrPosition[1];
    document.getElementById('gallery-video-frame').setAttribute("src",
        `https://www.youtube.com/embed/${videoIds[algorithm][learningMethod]}`
    );
}