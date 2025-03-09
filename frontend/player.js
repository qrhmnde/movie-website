document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieUrl = urlParams.get("url"); // Telegram Direct Link
    
    if (movieUrl) {
        const videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.src = movieUrl;
        videoPlayer.play();
    } else {
        alert("Movie URL not found!");
    }
});
