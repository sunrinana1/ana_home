const playAnimation = 0;
let clock;
let dotNumber = 1;
let x_position = 0;

var width = $(window).width(),
    height = $(window).height();

let curriTextArr = [
    "html5와 css3, Javascript를 공부하며 <br>웹의 기초를 배웁니다.",
    "Node.JS를 이용하여 웹 서버를 만드는 방법을 배우고,<br>npm을 통해 모듈들과 오픈 소스들에 대해 공부합니다.",
    "실무에서 자주 사용되는 Typescript와 <br>기존 JS의 다른점과 사용법을 배웁니다.",
    "데이터를 저장하기위한 데이터베이스를<br>mySQL를 이용해 구축하고, <br>직접 만든 서버와 연동하는 방법을 배웁니다.",
    "Linux의 명령어들과 기본 설정법, <br>그리고 서버를 배포하는 방법을 배웁니다."
]

function onSpriteClick(direction) {
    let style = getComputedStyle(document.querySelector(".sprite")).background;
    let idx_Xpx = style.indexOf("px");
    let idx_temp = style.indexOf("scroll") + 7;
    x_position = parseInt(style.slice(idx_temp, idx_Xpx));

    if (direction === "left") {
        x_position += 400;
        if (dotNumber <= 1) {
            dotNumber = 5;
        } else {
            dotNumber--;
        }
    } else {
        x_position -= 400;
        if (dotNumber >= 5) {
            dotNumber = 1;
        } else {
            dotNumber++;
        }
    }
    if(window.innerWidth <= 768) {
        document.querySelector(".sprite").style.background = `url('small_sprite.png') ${x_position}px 0`;
    } else {
        document.querySelector(".sprite").style.background = `url('sprite.png') ${x_position}px 0`;
    }
    
    document.querySelector(".sprite").style.backgroundColor = `#3b3b3b`;
    setColor();
    document.querySelector(`#dots${dotNumber}`).style.color = "white";
    changeCurriText(dotNumber);
}

function changeCurriText(number) {
    document.querySelector(".curriText").innerHTML = curriTextArr[number-1];
}

function disableClick(element) {
    element.style.pointerEvents = "none";
    setTimeout(() => {
        element.style.pointerEvents = "auto"
    }, 400);
}

function setColor() {
    for (let i = 1; i <= 5; i++) {
        document.querySelector(`#dots${i}`).style.color = "gray";
    }
}

function changeSpriteByNumber(number) {
    if (dotNumber <= number) {
        x_position -= ((number - dotNumber) * 400);
    } else {
        x_position += ((dotNumber - number) * 400);
    }
    if(window.innerWidth <= 768) {
        document.querySelector(".sprite").style.background = `url('small_sprite.png') ${x_position}px 0`;
    } else {    
        document.querySelector(".sprite").style.background = `url('sprite.png') ${x_position}px 0`;
    }
    
    document.querySelector(".sprite").style.backgroundColor = `#3b3b3b`
    dotNumber = number;
    setColor();
    document.querySelector(`#dots${dotNumber}`).style.color = "white";
    changeCurriText(dotNumber);
}

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
    if(window.innerWidth <= 768) {
        document.querySelector(".sprite").style.background = "url('small_sprite.png') 0px 0";
    }


    var getCurrentTime = moment(); //자체 제작 api를 못할 경우 기본 사용법 (사용자 컴퓨터상의 시간)
    // var getCurrentTime = moment(result.data.date + ' ' + result.data.time); //자체 제작 api를 통해 서버에서 현재 시간 가져왔을 경우
    var targetTime = moment('2022-03-01 20:00:00');
    var getCurrentTimeUnix = getCurrentTime.unix();
    var targetTimeUnix = targetTime.unix();
    var leftTime = targetTimeUnix - getCurrentTimeUnix;
    var duration = moment.duration(leftTime, 'seconds');
    var interval = 1000;

    var intv = setInterval(function () {
        if (duration.asSeconds() <= 1 || getCurrentTimeUnix >= targetTimeUnix) {
            document.querySelector(".clockContainer").innerHTML = "<btn class='reqruitForm' title='13기 모집 중' onclick='window.open(`모집링크`)'>지원하러가기!</btn>"
            clearInterval(intv);
        } else {
            duration = moment.duration(duration.asSeconds() - 1, 'seconds');
            var timer = {
                hours: (duration.hours() < 10) ? '0' + duration.hours() : duration.hours(),
                minutes: (duration.minutes() < 10) ? '0' + duration.minutes() : duration.minutes(),
                seconds: (duration.seconds() < 10) ? '0' + duration.seconds() : duration.seconds()
            }
            clock.innerText = `${timer.hours}:${timer.minutes}:${timer.seconds}`
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