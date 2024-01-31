// <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
// <script src="https://www.youtube.com/iframe_api"></script>
// <script> var apiKey = AIzaSyBqk9Nl37047ffQH_FqzYS_DqWPPxzstDY

function loadYouTubeAPI() {
    if (typeof YT === 'undefined') || typeof YT.Player === 'undefined') {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = function() {
            initializeApp();
        };
    }
}

function initializeApp() {
    
}