
    const squaresAcross = 15
    const squaresTotal = Math.pow(squaresAcross, 2)
    const sizeModifier = 2

    const symmetry = true;


    var square = document.createElement('div')

    square.style.width=squaresAcross * sizeModifier + 'px'
    square.style.height=squaresAcross * sizeModifier + 'px'
    square.classList.add('square')




    let board = document.getElementById('board')

    let squareNumber = document.createElement('span')
    squareNumber.classList.add('supersmall')


    function createBoard() {
        let dimensions = Math.pow(squaresAcross, 2) * sizeModifier
        board.style.width=`${dimensions + 1}px`
        board.style.height=`${dimensions +1}px`
        board.style.display="flex"
        for (let i = 0; i < squaresTotal; i++) {
            board.appendChild(square.cloneNode(true))
        }
        
    }

    createBoard();  
    let squares = Array.from(document.getElementsByClassName('square'))
    numberSquares();




    squares.forEach((s, i) => {
        s.addEventListener('click', blackOut)
        s.setAttribute('data-number', i)
    })

    function blackOut(e) {
        const square = e.target
        const squareNumber = square.dataset.number
        const radialMatch = squaresTotal - squareNumber - 1
        square.classList.toggle('blackOut')
        if (symmetry) {
            squares[radialMatch].classList.toggle('blackOut')
        }
        numberSquares();
    }
    

    function numberSquares() {
        let counter = 1;
        squares.forEach((s, i) => {
            // s.innerHTML = "";

            let squareLeft = squares[i - 1]
            let squareAbove = squares[i - squaresAcross]
            
            let isSquareFilled = s.classList.contains(blackOut) 
            let isSquareLeftFilled = squareLeft == undefined || squareLeft.classList.contains(blackOut) || i % squaresAcross == 0;
            let isSquareAboveFilled = (squareAbove == undefined || squareAbove.classList.contains(blackOut))

            let needsNumber = !isSquareFilled && (isSquareLeftFilled || isSquareAboveFilled)
            if (needsNumber) {
                s.appendChild(squareNumber.cloneNode(true)).innerHTML = counter
                counter++
            }
        })
    }
