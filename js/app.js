/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//compare the icons to see if they are the same icons
function matchPair (){
    if($('.open').length % 2 === 0 && $('.open').length > 0){
        let icons = $('.open i');
        if(icons[0].className === icons[1].className){
            $('.open').addClass('match')
            $('.open').addClass('rubberBand')
        }else{
            $('.open').addClass('wobble')
        }
        setTimeout(function(){
            $('.card').removeClass('wobble')
            $('.open').removeClass('open show')
        }, 1000); 
        countMoves()
    }
}

//count the number of moves
function countMoves(){
    let value = parseInt($('.moves').text()) + 1;
    $(".moves").text(value);  
}

//count the number of stars according the number of moves
function countStars(){
    if(parseInt($('.moves').text()) > 10 && parseInt($('.moves').text()) < 15){
        $('.fa-star:eq(2)').addClass('fa-star-o')
        $('.fa-star:eq(2)').removeClass('fa-star')
    }else if(parseInt($('.moves').text()) >= 15){
        $('.fa-star:eq(1)').addClass('fa-star-o')
        $('.fa-star:eq(1)').removeClass('fa-star')
    }
}



$('.deck').on('click', (function(event){
    $('.modal').modal('show');
    $('.modal-body').text(`With ${$(".moves").text()} Moves and ${$(".fa-star").length} Stars.\n
                 Woooooo!`)
    setTimeout(function(){
        $('.circle-loader').toggleClass('load-complete');
        $('.checkmark').toggle();
    }, 1000); 
    if($('.open').length < 2 && !$(event.target).hasClass('open')){
        if (event.target.className.includes('card')){
            if (!event.target.className.includes('match')){         
                $(event.target).toggleClass('open show')
            }
            matchPair();
            countStars();
        }
    }
}));

//listenner for restart button
$('.restart, .btn-info').click(function(event){
    $(".moves").text(0);  
    $('.card').removeClass('open show match rubberBand');
    $('.fa-star-o').addClass('fa-star');
    $('.fa-star').removeClass('fa-star-o');
    $('.deck').html(shuffle($('.card')));
});

$(document).ready(function(event){
    $('.deck').html(shuffle($('.card')));
});



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
