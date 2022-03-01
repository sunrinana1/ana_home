const playAnimation = 0;
let clock;

var width = $(window).width(),
    height = $(window).height();

window.addEventListener("scroll", () => {
    let scroll = this.scrollY;
    let logoYellow = document.querySelectorAll(".logoYellow");
    let desc = document.querySelector('.desc');
    let height = window.innerHeight * 1 / 5;

    let headerLogoRatio = (scroll >= height) ? 0 : Math.abs(Math.round(scroll / height * 1000) / 1000 - 1);
    let contentRatio = (scroll >= height * 10 * 12 / 5) ? 0 : Math.abs(Math.round(scroll / height * 10 * 6 / 5 * 1000) / 100000 - 1);
    if (window.innerWidth <= 768) {
        contentRatio = (scroll >= height * 10 * 12 / 5) ? 0 : Math.abs(Math.round(scroll / height * 10 * 5 / 5 * 1000) / 100000 - 1);
    }
    if (window.innerWidth > 768) {
        if (headerLogoRatio === Infinity || headerLogoRatio >= 1 || contentRatio === Infinity || contentRatio >= 1) {
            headerLogoRatio = 1;
        }
        if (scroll === 0) {
            headerLogoRatio = 1;
            contentRatio = 1;
        }

        if (headerLogoRatio < 1 || scroll === 0) {
            logoYellow.forEach(el => {
                el.offset.baseVal = headerLogoRatio;
            })
        }


    }
    if (contentRatio <= 0.9) {
        let temp = contentRatio - 0.6;
        if (temp <= 0) {
            temp = 0;
        }
        desc.style.marginLeft = `${-100 *(temp)}%`
    }
    if (headerLogoRatio == 0) {
        if (!document.querySelector(".header").classList.contains("centered")) {
            document.querySelector(".dummy").classList.add("centered");
            document.querySelector(".header_text").classList.add("none");
        }
    } else {
        document.querySelector(".dummy").classList.remove("centered");
        document.querySelector(".header_text").classList.remove("none");
    }

    if (scroll >= height * 5) {
        if (!document.querySelector(".nav").classList.contains("attached")) {
            document.querySelector(".nav").classList.add("attached");
            document.querySelector(".content1").classList.add("afterAttach")
        }
    } else {
        document.querySelector(".nav").classList.remove("attached");
        document.querySelector(".content1").classList.remove("afterAttach")
    }
})

window.addEventListener("resize", () => {
    if ($(window).width() != width || $(window).height() != height) {
        location.reload();
    }
})

window.addEventListener("load", () => {
    clock = document.querySelector(".clock");

    

    var getCurrentTime = moment(); //자체 제작 api를 못할 경우 기본 사용법 (사용자 컴퓨터상의 시간)
    // var getCurrentTime = moment(result.data.date + ' ' + result.data.time); //자체 제작 api를 통해 서버에서 현재 시간 가져왔을 경우
    var targetTime = moment('2022-03-01 20:00:00');
    var getCurrentTimeUnix = getCurrentTime.unix();
    var targetTimeUnix = targetTime.unix();
    var leftTime = targetTimeUnix - getCurrentTimeUnix;
    var duration = moment.duration(leftTime, 'seconds');
    var interval = 1000;

    var intv = setInterval(function(){
        if (duration.asSeconds() <= 1 || getCurrentTimeUnix >= targetTimeUnix ) {
            document.querySelector(".clockContainer").innerHTML = "<btn class='reqruitForm' title='13기 모집 중' onclick='window.open(`모집링크`)'>지원하러가기!</btn>"
          clearInterval(intv);
        }else{
          duration = moment.duration(duration.asSeconds() - 1, 'seconds');
          var timer = {
            hours : (duration.hours() < 10) ? '0' + duration.hours() : duration.hours(),
            minutes : (duration.minutes() < 10) ? '0' + duration.minutes() : duration.minutes(),
            seconds : (duration.seconds() < 10) ? '0' + duration.seconds() : duration.seconds()
          }
          clock.innerText =`${timer.hours}:${timer.minutes}:${timer.seconds}`
        }
      }, interval);

    TypeHangul.type('.type', {
        intervalType: 50,
        humanize: 0.3,
    });

    let logoYellow = document.querySelectorAll(".logoYellow");
    if (window.innerWidth <= 768) {
        logoYellow.forEach(el => {
            el.offset.baseVal = 0;
        })
    }

    let typeTarget = document.querySelector(".type");
    typeTarget.addEventListener("th.endType", () => {
        typeTarget.classList.add("typeDone");
        if (playAnimation) {
            setTimeout(() => {
                document.querySelector(".main").style.display = "inline";
            }, 1000);
        }
    });
    typeTarget.addEventListener("th.beforeType", () => {
        if (playAnimation) {
            document.querySelector(".main").style.display = "none";
        }

    });
    let qaArr = document.querySelectorAll(".qaText");
    let qaBoxArr = document.querySelectorAll(".qnaBox");
    qaBoxArr.forEach(el => {
        el.addEventListener("mouseover", () => {
            switch (el.classList[1]) {
                case "qnaBox1":
                    qaArr[0].innerHTML = "현재 .9, .5기 <br>계획은 없습니다."
                    el.classList.add("showAns");
                    break;
                case "qnaBox2":
                    qaArr[1].innerText = "웹을 배우고 싶은 사람이면 모두 환영입니다!"
                    el.classList.add("showAns");
                    break;
                case "qnaBox3":
                    qaArr[2].innerHTML = "선린 1 학년이면 <br>지원이 가능합니다!"
                    el.classList.add("showAns");
                    break;
            }
        })
        el.addEventListener("mouseout", () => {
            switch (el.classList[1]) {
                case "qnaBox1":
                    qaArr[0].innerText = ".9, .5기 계획이 있나요?"
                    el.classList.remove("showAns");
                    break;
                case "qnaBox2":
                    qaArr[1].innerText = "웹이 처음인데 괜찮을까요?"
                    el.classList.remove("showAns");
                    break;
                case "qnaBox3":
                    qaArr[2].innerText = "누구나 지원할 수 있을가요?"
                    el.classList.remove("showAns");
                    break;
            }
        })
    })
    let switcher = 1;
    let isChanging = true;

    let boxesArr = [htmlJs, ts, nodeJS, linux, mySQL];

    let colorChange = setInterval(function () {
        boxesArr.forEach(el => {
            switcher = Math.round(Math.random())
            if (switcher == 1) {
                el.render.fillStyle = "darkgray"
            } else {
                el.render.fillStyle = "rgb(135, 206, 235)"
            }
        })
        if (isChanging === false) {
            clearInterval(colorChange)
        }
    }, 1000);


})