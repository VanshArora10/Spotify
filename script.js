document.getElementsByClassName("search-img")[0].addEventListener("click", function () {
    document.getElementsByClassName("search-bar")[0].focus();
})

async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let i = 0; i < as.length; i++) {
        let a = as[i]
        if (a.href.endsWith(".mp3")) {
            songs.push(a.href)
        }
    }
    return songs
}
async function main() {
    let songs = await getsongs()
    console.log(songs)

    let songul = document.getElementsByClassName("songul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li class="left-songss font flex text">
                       <div class=" left-song-list flex">
                        <img src="Music.png" class="music flex" alt="">
                        <div class="song-info flex">${song.replaceAll("http://127.0.0.1:3000/songs/", "")}</div>
                       </div>
                        <div class="play-now flex">
                            <span>Play Now</span>
                            <img src="play.png" class="invert flex play-img" alt="">
                        </div>
                    </li>`
    }
}
main()

