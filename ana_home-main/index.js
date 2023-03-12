const playAnimation = 1;
let clock;
let dotNumber = 1;
let x_position = 0;

var width = $(window).width(),
    height = $(window).height();

let curriTextArr = [
    " Javascript, SQL,Node.js를 공부하며 <br>서버의 기초를 배웁니다.",
    "Node.JS를 이용하여 웹 서버를 만드는 방법을 배우고,<br>npm을 통해 모듈들과 오픈 소스들에 대해 공부합니다.",
    "실무에서 자주 사용되는 SQL와 <br>기존 NOSQL의 다른점과 사용법을 배웁니다.",
    "지금까지 학교에서 배운 모든 기술을<br> 융합하여 새로운 프로젝트를 만들어갑니다.",
    "Linux의 명령어들과 기본 설정법, <br>그리고 서버를 배포하는 방법을 배웁니다."
]

function myscrollTo(element) {
    document.querySelector(`.${element}`).scrollIntoView();
}

function onSpriteClick(direction) {
    let style = getComputedStyle(document.querySelector(".sprite")).background;
    let idx_Xpx = style.indexOf("px");
    let idx_temp = style.indexOf("scroll") + 7;
    x_position = parseInt(style.slice(idx_temp, idx_Xpx));
    console.log(x_position);

    if (direction === "left") {
        if (window.innerWidth <= 768) {
            x_position += 275;
        } else {
            x_position += 400;
        }

        if (dotNumber <= 1) {
            dotNumber = 5;
        } else {
            dotNumber--;
        }
    } else {
        if (window.innerWidth <= 768) {
            x_position -= 275;
        } else {
            x_position -= 400;
        }
        if (dotNumber >= 5) {
            dotNumber = 1;
        } else {
            dotNumber++;
        }
    }
    if (window.innerWidth <= 768) {
        document.querySelector(".sprite").style.background = `url('small_sprite.png') ${x_position}px 0`;
    } else {
        document.querySelector(".sprite").style.background = `url('sprite.png') ${x_position}px 0`;
    }

    setColor();
    document.querySelector(`#dots${dotNumber}`).style.color = "white";
    changeCurriText(dotNumber);
}

function changeCurriText(number) {
    document.querySelector(".curriText").innerHTML = curriTextArr[number - 1];
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
        if (window.innerWidth <= 768) {
            x_position -= ((number - dotNumber) * 275);
        } else {
            x_position -= ((number - dotNumber) * 400);
        }

    } else {
        if (window.innerWidth <= 768) {
            x_position += ((dotNumber - number) * 275);
        } else {
            x_position += ((dotNumber - number) * 400);
        }
    }
    if (window.innerWidth <= 768) {
        document.querySelector(".sprite").style.background = `url('small_sprite.png') ${x_position}px 0`;
    } else {
        document.querySelector(".sprite").style.background = `url('sprite.png') ${x_position}px 0`;
    }
    disableClick(document.querySelector(".slideDot"));
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
    if (window.innerWidth <= 768) {
        document.querySelector(".sprite").style.background = "url('small_sprite.png') 0px 0";
    }



    var targetTime = moment('2017-03-14 00:00:00');
    var interval = 1000;

    var intv = setInterval(function() {
        var getCurrentTime = moment();
        var leftTime = Math.floor((targetTime - getCurrentTime) / 1000);
        if (leftTime <= 0 || getCurrentTime >= targetTime) {
            document.querySelector(".clockContainer").innerHTML = "<btn class='reqruitForm' title='14기 모집 중' onclick='window.open(`https://forms.gle/BX4Ckhh8s8ZjUBzQ7`)'>지원하러가기!</btn>"
            clearInterval(intv);
        } else {
            var timer = {
                hours: (Math.floor(leftTime / (60 * 60)) < 10) ? `0${Math.floor(leftTime / (60*60)) <10 }` : (Math.floor(leftTime / (60 * 60))),
                minutes: (Math.floor((leftTime % (60 * 60)) / 60) < 10) ? `0${Math.floor((leftTime % (60*60)) /60)}` : (Math.floor((leftTime % (60 * 60)) / 60)),
                seconds: (Math.floor((leftTime % (60 * 60)) % 60) < 10) ? `0${(Math.floor((leftTime % (60*60)) % 60))}` : (Math.floor((leftTime % (60 * 60)) % 60))
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
                    qaArr[0].innerHTML = "모집신청이 완료되었습니다."
                    el.classList.add("showAns");
                    break;
                case "qnaBox2":
                    qaArr[1].innerText = "서버를 배우고 싶은 사람이면 모두 환영입니다!"
                    el.classList.add("showAns");
                    break;
                case "qnaBox3":
                    qaArr[2].innerHTML = "1학년이면 <br>지원이 가능합니다!"
                    el.classList.add("showAns");
                    break;
                case "qnaBox4":
                    qaArr[3].innerHTML = "꼭 이 부장이 실력을 올려드리겠습니다<br> 약속합니다!"
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
                    qaArr[1].innerText = "서버가 처음인데 괜찮을까요?"
                    el.classList.remove("showAns");
                    break;
                case "qnaBox3":
                    qaArr[2].innerText = "누구나 지원할 수 있을가요?"
                    el.classList.remove("showAns");
                    break;
                case "qnaBox4":
                    qaArr[3].innerHTML = "실력이 오를까요? <br> 제가 따라 갈수 있을까요?"
                    el.classList.remove("showAns");
                    break;
            }
        })
    })
    let switcher = 1;
    let isChanging = true;

    let boxesArr = [MongoDB, Rust, nodeJS, linux, mySQL];

    let colorChange = setInterval(function() {
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