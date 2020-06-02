$(document).ready(function(){
    a = [1,2,3,4,5,6,7,8,"empty"];

    const pieces = document.getElementsByClassName("piece");

    const modal = document.getElementById("victory");

    const timeCompleted = document.getElementById("timeCompleted");

    const closeBtn = document.getElementById("closeBtn");

    const tryAgainBtn = document.getElementById("tryAgainBtn");

    const moveCounter = document.getElementById("moveCounter")

    let update = null;
    
    let moveCount = 0;

    solved = a.slice();

    const counter = document.getElementById("counter");

    let minutes = 0, seconds = 0;

    let status = "stopped";

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    function add() {
        seconds++;
        if (seconds > 59) {
            seconds = 0;
            minutes++;
        }
        counter.textContent = (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }

    function startTimer() {        
        if (status === "stopped") {
            update = setInterval(add, 1000);
            status = "started";
        } else {
            clearInterval(update)
            status = "stopped"
            minutes = 0;
            seconds = 0;
            counter.textContent = "00:00"
            update = setInterval(add, 1000);
            status = "started"
        }

    }

    function randomMove(numberOfMoves, time) {
        for (let move = 0; move < numberOfMoves; move++) {
            let movable = []
            for (let i = 0; i < pieces.length - 1; i++) {
                if (!(isLocked(pieces[i]))) {
                    movable.push(i)
                }                                
            }  
            random = movable[Math.floor(Math.random() * movable.length)]
            movePiece(pieces[random], time)          
        }
    }

    function shuffle() {
        moveCount = 0;
        if (a[8] == 9) {
            a[8] = "empty";
            $("#9").css("display", "none")
        }
        randomMove(200, 0)
        if (a[1] == "empty") {
            movePiece(pieces[a[2] - 1], 0)
        } else {
            if (a[3] == "empty") {
                movePiece(pieces[a[6] - 1], 0)
            } else {
                if (a[5] == "empty" || a[7] == "empty") {
                    movePiece(pieces[a[8] - 1], 0)
                }
            }
        }
        
        if (a[0] == "empty") {
            movePiece(pieces[a[1] - 1], 0)
            movePiece(pieces[a[4] - 1], 0)
            movePiece(pieces[a[7] - 1], 0)
            movePiece(pieces[a[8] - 1], 0)
        } else {
            if (a[2] == "empty") {
                movePiece(pieces[a[5] - 1], 0)
                movePiece(pieces[a[8] - 1], 0)
            } else {
                if (a[4] == "empty") {
                    movePiece(pieces[a[5] - 1], 0)
                    movePiece(pieces[a[8] - 1], 0)
                } else {
                    if (a[6] == "empty") {
                        movePiece(pieces[a[7] - 1], 0)
                        movePiece(pieces[a[8] - 1], 0)
                    }
                }
            }
        }
        startTimer()
    }
    
    
    function isOpenLeft(x) {
        const order = a.indexOf(Number($(x).attr('id')))
        leftPiece = a[order - 1]
        if (!(order == 3 || order == 6) && leftPiece === "empty") {
            return true;
        } else {
            return false;
        }
    }

    function isOpenRight(x) {
        const order = a.indexOf(Number($(x).attr('id')))
        rightPiece = a[order + 1]
        if (!(order == 2 || order == 5) && rightPiece === "empty") {
            return true;
        } else {
            return false;
        }
    }

    function isOpenUp(x) {
        const order = a.indexOf(Number($(x).attr('id')))
        upPiece = a[order - 3]
        if (upPiece === "empty") {
            return true;
        } else {
            return false;
        }
    }

    function isOpenDown(x) {
        const order = a.indexOf(Number($(x).attr('id')))
        downPiece = a[order + 3]
        if (downPiece === "empty") {
            return true;
        } else {
            return false;
        }
    }

    function isLocked(x) {
        if (isOpenLeft(x) || isOpenRight(x) || isOpenUp(x) || isOpenDown(x)) {
            return false;
        } else {
            return true;
        }
    }

    function moveRight(x, t) {
        if (!$(x).hasClass("moving")) {
            $(x).addClass("moving");
            $(x).animate({
                "left": "+=102"
            }, t, function () {
                $(x).removeClass("moving");
            })
            const order = a.indexOf(Number($(x).attr('id')))
            const index = a.indexOf("empty")
            a[index] = a[order]
            a[order] = "empty"
        }
    }

    function moveLeft(x, t) {
        if (!$(x).hasClass("moving")) {
            $(x).addClass("moving");
            $(x).animate({
                "left": "-=102"
            }, t, function () {
                $(x).removeClass("moving");
            })
            const order = a.indexOf(Number($(x).attr('id')))
            const index = a.indexOf("empty")
            a[index] = a[order]
            a[order] = "empty"
        }
    }

    function moveUp(x, t) {
        if (!$(x).hasClass("moving")) {
            $(x).addClass("moving");
            $(x).animate({
                "top": "-=102"
            }, t, function () {
                $(x).removeClass("moving");
            })
            const order = a.indexOf(Number($(x).attr('id')))
            const index = a.indexOf("empty")
            a[index] = a[order]
            a[order] = "empty"
        }
    }

    function moveDown(x, t) {
        if (!$(x).hasClass("moving")) {
            $(x).addClass("moving");
            $(x).animate({
                "top": "+=102"
            }, t, function () {
                $(x).removeClass("moving");
            })
            const order = a.indexOf(Number($(x).attr('id')))
            const index = a.indexOf("empty")
            a[index] = a[order]
            a[order] = "empty"
        }
    }
    
    function movePiece(x, t) {
        if (!isLocked(x)) {
            if (isOpenLeft(x)) {
                moveLeft(x, t);
                return true;
            } else {
                if (isOpenRight(x)) {
                    moveRight(x, t);
                    return true;
                } else {
                    if (isOpenUp(x)) {
                        moveUp(x, t);
                        return true;
                    } else {
                        if (isOpenDown(x)) {
                            moveDown(x, t);
                            return true;
                        }
                    }
                }
            }
        } else {
            return false;
        }
    }

    function isEqual(a1, a2) {
        for (let i = 0; i < a1.length; i++) {
            if (a1[i] != a2[i]) {
               return false
            }
        }
        return true
    }


    $("#shuffleBtn").click(shuffle);

    tryAgainBtn.addEventListener("click", () => {
        shuffle();
        modal.style.display = "none";
    })

    $(".piece").click(function () {

        if (movePiece(this, 200)) {
            moveCount++;
        }

        if (status == "started" && isEqual(a, solved)) {
            a[8] = 9;
            clearTimeout(update)
            setTimeout(() => {
                $("#9").css("display", "flex")
                setTimeout(() => {
                    timeCompleted.innerText = (minutes < 1 ? "" : (minutes > 1 ? minutes + " minutes " : minutes + " minute ")) + seconds + " seconds";
                    moveCounter.innerText = moveCount
                    modal.style.display = "block";
                }, 100);
            }, 400);
        }

    });
    

});
