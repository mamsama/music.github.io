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
