window.onload = function () {
    var inputSquare = document.getElementById('input-squares');
    var loadMoreBtn = this.document.getElementById('load-more');

    inputSquare.onkeyup = delay(function () {
        var val = inputSquare.value * 1;

        if (val != undefined && val != NaN) {
            renderSquareBtn(val, true);
        }

        console.log(val);
    }, 500);


    loadMoreBtn.onclick = function() {
        var inputSquare = document.getElementById('input-squares');
        var wrapper = document.getElementById('square-wrapper');
        var totalSquares = wrapper.querySelectorAll('button[class=me-btn]').length;

        renderSquareBtn(10, false);
        inputSquare.value = totalSquares + 10;
    }
}
/**
 * Render button
 * 
 * @param {*} number - Amount squares will be added.
 * @param {boolean} isClean - true will call to cleanWrapper to remove all children nodes
 */
function renderSquareBtn(number, isClean) {
    var template = document.getElementById('temp-btn');
    var wrapper = document.getElementById('square-wrapper');

    if (isClean) {
        cleanWrapper(wrapper);
    }

    for (var i = 0; i < number; i++) {
        var clon = template.content.cloneNode(true);
        var btnEle = clon.querySelector('button[class=me-btn]');
        btnEle.setAttribute('data-clicked', 0);
        btnEle.innerHTML = 'Clicked 0 times';
        btnEle.onclick = countClickedTimes;
        wrapper.appendChild(clon);
    }
}

function cleanWrapper(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Delay
 * 
 * @param {Function} callback - Callback function after timeout
 * @param {number} ms - Miliseconds for setTimeout
 */
function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

/**
 * Calculate clicked times and sort Squares with new clicked times
 * 
 * @param {*} e 
 */
function countClickedTimes(e) {
    var target = e.target;
    var count = target.getAttribute('data-clicked') * 1;
    
    if (count != NaN) {
        count++;

        var rVal = (Math.random() * 255) + count;
        var gVal = (Math.random() * 255) + count;
        var bVal = (Math.random() * 255) + count;

        target.setAttribute('data-clicked', count);
        target.innerHTML = 'Clicked ' + count + ' times';
        target.style.backgroundColor = 'rgb(' + rVal + ',' + bVal + ',' + gVal + ')';

        sortSquares(target.parentNode);
    }
}

/**
 * Sort squares items
 * 
 * @param {HTMLElement} ele 
 */
function sortSquares(ele) {
    var childNodes = ele.querySelectorAll('button[class=me-btn]');
    var arrChildNodes = [];
    childNodes.forEach(function(item) {
        arrChildNodes.push(item);
    });
    // Make HTMLCollection to array and sort it.
    arrChildNodes.sort(function(a, b) {
        var clickedTimesA = a.getAttribute('data-clicked') * 1;
        var clickedTimesB = b.getAttribute('data-clicked') * 1;

        return clickedTimesA - clickedTimesB;
    });
    // Refresh list squares
    cleanWrapper(ele);
    // Bind new sorted list 
    for (var i = 0; i < arrChildNodes.length; i++) {
        ele.appendChild(arrChildNodes[i]);
    }
}