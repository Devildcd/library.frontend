// Selector de video
var videoSelector = document.getElementById('videos').querySelectorAll('video');

// Ventana central de video
var videoCentral = document.createElement('video');
videoCentral.width = 560;
videoCentral.height = 315;
videoCentral.controls = true;
var sourceElement = document.createElement('source');
sourceElement.type = 'video/mp4';
videoCentral.appendChild(sourceElement);
document.body.appendChild(videoCentral);

// Lista de selección de videos
var videoLinks = document.getElementById('seleccion').querySelectorAll('a');
for (var i = 0; i < videoLinks.length; i++) {
    var videoLink = videoLinks[i];
    videoLink.addEventListener('click', function(event) {
        event.preventDefault();
        var videoID = this.getAttribute('data-video-id');
        var videoURL = "https://www.youtube.com/watch?v=" + videoID;
        var apiURL = "https://www.googleapis.com/youtube/v3/videos?id=" + videoID + "&key=API_KEY&part=snippet";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', apiURL, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.items.length > 0) {
                    var item = response.items[0];
                    if (item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.high && item.snippet.thumbnails.high.url) {
                        var videoSrc = "https://www.youtube.com/watch?v=" + videoID;
                        var sourceElement = videoCentral.querySelector('source');
                        sourceElement.src = videoSrc;
                        videoCentral.load();
                        videoCentral.style.display = 'block';
                        for (var j = 0; j < videoSelector.length; j++) {
                            var selectorSourceElement = videoSelector[j].querySelector('source');
                            if (selectorSourceElement.src === videoURL) {
                                videoSelector[j].style.display = 'none';
                                break;
                            }
                        }
                    }
                }
            } else {
                console.log('Error al obtener la información del video');
            }
        };
        xhr.send();
    });
}