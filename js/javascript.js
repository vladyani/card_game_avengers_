let cards = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

let shuffleArray = function (array) {
    return $.map(array, function (element) {
        return [element, element];
    }).sort(function () {
        return 0.5 - Math.random();
    });
};

cards = shuffleArray(cards);


let cardsList = $('.card');


for (let i = 0; i < cardsList.length; i++) {
    $(cardsList[i]).on("click", function () {
        revealCard(i);
    });
}

let oneVisible = false;
let turnCounter = 0;
let visible_nr;
let lock = false;
let pairsLeft = 6;

function revealCard(nr) {

    let opacityValue = $('#c' + nr).css('opacity')

    if (opacityValue != 0 && lock == false) {

        lock = true;

        let obraz = "url(img/" + cards[nr] + ")";

        $('#c' + nr).css('background-image', obraz);
        $('#c' + nr).addClass('cardA');
        $('#c' + nr).removeClass('card');

        if (oneVisible == false) {
            oneVisible = true;
            visible_nr = nr;
            lock = false;
        } else {

            if (cards[visible_nr] == cards[nr] && visible_nr != nr) {
                setTimeout(function () {
                    hide2Cards(nr, visible_nr);
                }, 750);
            } else {
                setTimeout(function () {
                    restore2Cards(nr, visible_nr)
                }, 750);
            }

            if (visible_nr != nr) {
                turnCounter++;
            }

            $('.score').html('Turn counter:' + turnCounter);
            oneVisible = false;
        }

    }

}

function hide2Cards(nr1, nr2) {
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');

    pairsLeft--;

    if (pairsLeft == 0) {
        $('.board').html('<h1>Congratulations <br/> You Win!!!<br/> Done in ' + turnCounter +
            ' turns</h1> <br/> <button class="reset" onclick="location.reload()">Do you want to try again?</button>');
    }
	
	let button = $('<button>Do You Want To Try Again ?</button>').addClass('reset');
	$(button).on('click', function(){
		location.reload();
	});

    lock = false;
}

function restore2Cards(nr1, nr2) {
    $('#c' + nr1).css('background-image', 'url("img/karta.png")');
    $('#c' + nr1).addClass('card');
    $('#c' + nr1).removeClass('cardA');
    $('#c' + nr2).css('background-image', 'url("img/karta.png")');
    $('#c' + nr2).addClass('card');
    $('#c' + nr2).removeClass('cardA');

    lock = false;
}
