/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const numberOfCards = 16;
const oneMinuteInSeconds = 59;

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
    if(isTwoCardsOpened()){
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
    //Condition to check if the game finished
    if($('.match').length === numberOfCards){
        endOfGame();
    }
}

//Show the modal with the results.
function endOfGame(){
    let stars = $(".fa-star").length === 1? "Star" : "Stars"
    $('.modal').modal('show');
    $('.winner-details').html(`With ${$(".moves").text()} Moves and ${$(".fa-star").length} ${stars}.<br/>
        Time: ${minutes}:${seconds}   Woooooo!`)
    setTimeout(function(){
        $('.circle-loader').addClass('load-complete');
        $('.checkmark').toggle();
    }, 500); 
}

//count the number of moves
function countMoves(){
    let value = parseInt($('.moves').text()) + 1;
    $(".moves").text(value);  
}

//count the number of stars according the number of moves
function countStars(){
    if(isTwoStars()){
        $('.fa-star:eq(2)').addClass('fa-star-o')
        $('.fa-star:eq(2)').removeClass('fa-star')
    }else if(isOneStar()){
        $('.fa-star:eq(1)').addClass('fa-star-o')
        $('.fa-star:eq(1)').removeClass('fa-star')
    }
}



$('.deck').on('click', (function(event){
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
    $('.circle-loader').removeClass('load-complete');
    $('.checkmark').toggle();
    $('.deck').html(shuffle($('.card')));
});

$(document).ready(function(event){
    $('.deck').html(shuffle($('.card')));
    userTimer();
});

function userTimer() {
    let timerId = setInterval(function() {
        increaseSecond();
    }, 1000);
  }
  
function increaseSecond(){
    let timer = $('.timer').text().split(":");
    var minutes = parseInt(timer[0]);
    var seconds = parseInt(timer[1]);
    // oneMinuteInSeconds has to be 59 to turn over 1 minute
    if (seconds === oneMinuteInSeconds){
        $(".timer").text(`${formatTimer(++minutes)}:00`);  
    }else{
        $(".timer").text(`${formatTimer(minutes)}:${formatTimer(++seconds)}`);
    }
}

function formatTimer(value){
    return ('0' + (value)).slice(-2)
}

function isTwoCardsOpened(){
    return ($('.open').length % 2 === 0 && $('.open').length > 0);
}

function isTwoStars(){
    return (parseInt($('.moves').text()) > 10 && parseInt($('.moves').text()) < 15);
}

function isOneStar(){
    return (parseInt($('.moves').text()) >= 15);
}
