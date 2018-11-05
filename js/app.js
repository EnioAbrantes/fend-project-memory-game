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

function matchPair (){
    console.log($('.open').length)
    if($('.open').length % 2 === 0){
        var icon = null;
        $('.open i').each(function( index, value ) {
            console.log(value.className)
            if(icon === value.className){
                $('.open').addClass('match')
                $('.open').removeClass('open show')
                countMoves()
            }else if (icon != null){
                $('.open').removeClass('open show')
                countMoves()
            }
            icon = value.className
            //$('.open').removeClass('open show')


          });
    }
}

function countMoves(){
    let value = parseInt($('.moves').text()) + 1;
    $(".moves").text(value);  
}

//count the number of moves listenner
$('.card').click(function(event){
    //how to add the match class in the card
    if (!event.target.className.includes('match')){
        $(event.target).toggleClass('open show')
    }
    matchPair();
});

$('.restart').click(function(event){
    $(".moves").text(0);  
    $('.card').removeClass('open show match')
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
