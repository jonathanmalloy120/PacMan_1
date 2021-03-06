
    var pos = 0;

    const pacArray = [
        ['./Images/PacMan1.png', './Images/PacMan2.png'],
        ['./Images/PacMan3.png', './Images/PacMan4.png']
    ];
    var direction = 0;
    const pacMen = []; // This array holds all the pacmen

    function setToRandom(scale, min) {
        return {
            x: Math.random() * scale,
            y: Math.max(Math.random() * scale,min) //making sure they start lower than the buttons
        }
    }
    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(15,0); // {x:?, y:?}
        let position = setToRandom(500,30);
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.orientation = 0;
        newimg.focus = 0;
        newimg.style.position = 'absolute';
        newimg.src = './Images/PacMan1.png';
        newimg.width = 100;
        // set position
        newimg.style.left = position.x;
        newimg.style.top = position.y;
        //

        // add new Child image to game
        game.appendChild(newimg);
        // return details in an object
        return {
            position,
            velocity,
            newimg
        }
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            //check colisions, change velocity  and orientaiton if necessary
            checkCollisions(item)
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;
            //new stuff below here
            //console.log(item.newimg.src);
            item.newimg.focus = (item.newimg.focus + 1) % 2;
            //console.log('orientation =' + orientation, "focus = " + focus);
            item.newimg.src = pacArray[item.newimg.orientation][item.newimg.focus];

        })
        setTimeout(update, 60);
    }

    function checkCollisions(item) {
        if (
        item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
        item.position.x + item.velocity.x < 0
        ) {
            item.velocity.x = -item.velocity.x;
            item.newimg.orientation = !item.newimg.orientation *1;
        }
         if (
        item.position.y + item.velocity.y + item.newimg.height >
        window.innerHeight ||
        item.position.y + item.velocity.y < 0
        )
            item.velocity.y = -item.velocity.y;
    }
    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
    }
