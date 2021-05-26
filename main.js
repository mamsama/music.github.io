// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Gió cuốn em đi",
      singer: "Quốc Thiên",
      path: "./playlist/GioCuonEmDi-QuocThien-2997079.mp3",
      image: "./img/1568168042239.jpeg"
    },
    {
        name: "Xuân nay con không về",
        singer: "MR.Siro",
        path: "./playlist/XuanNayConKhongVe.mp3",
        image: "data:image/jpeg;base64,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"
      },
      {
        name: "So far away",
        singer: "Martin Garrix",
        path: "./playlist/So Far Away - Martin Garrix_ David Guett.mp3",
        image: "data:image/jpeg;base64,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"
      }
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
