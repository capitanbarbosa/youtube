//wrap everything inside of DOMContentLoaded event, and the callback function is gonna be an async
//function cause we are gonna make a request to a serverless function to get back a list of youtube links
document.addEventListener("DOMContentLoaded", async () => {
  const linksList = document.getElementById("linksList");
  const url = "https://jqq-utils.netlify.app/api/recentYTVideos";

  const copy = (e) => {
    const str = e.target.dataset.url;
    alert(str);
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.removeChild(el);
  };
  try {
    const res = await fetch(url);
    const videos = await res.json();
    const videosHTML = videos
      .map((video) => {
        const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
        return `<li class=video-link">
                    <button class="btn" data-url="${videoUrl}"> Copy URL </button>
                    <a class="btn" href="${videoUrl}" rel="noopener noreferrer"
                    target="_blank">Watch</a>
                    ${video.title}
                    </li>`;
      })
      .join("");
    linksList.innerHTML = videosHTML;
    const videoLinks = [...document.querySelectorAll(".video-link")];
    videoLinks.forEach((link) => link.addEventListener("click", copy));
  } catch (err) {
    console.error(err);
  }
});
