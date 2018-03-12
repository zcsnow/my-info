
var cfg={ 
	"foodMass": 1,
    "defaultPlayerMass": 10,
    "gameWidth": 2000,
    "gameHeight": 2000,
    "gameMass": 20000,
    "maxFood": 200,
    "slowBase": 4.5,
    "foodUniformDisposition": true,
    "newPlayerInitialPosition": "farthest",
};

var users = [];
var food = [];


var log = (function () {
    var log = Math.log;
    return function (n, base) {
        return log(n) / (base ? log(base) : 1);
    };
})();
var initMassLog = log(cfg.defaultPlayerMass, cfg.slowBase);


function massToRadius(mass) {
    return 4 + Math.sqrt(mass) * 6;
};

function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) - p1.radius - p2.radius;
};

function genPos(from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
}

// generate a random position within the field of play
function randomPosition(radius) {
    return {
        x: genPos(radius, cfg.gameWidth - radius),
        y: genPos(radius, cfg.gameHeight - radius)
    };
};

function uniformPosition(points, radius) {
    var bestCandidate, maxDistance = 0;
    var numberOfCandidates = 10;

    if (points.length === 0) {
        return randomPosition(radius);
    }

    // Generate the cadidates
    for (var ci = 0; ci < numberOfCandidates; ci++) {
        var minDistance = Infinity;
        var candidate = randomPosition(radius);
        candidate.radius = radius;

        for (var pi = 0; pi < points.length; pi++) {
            var distance = getDistance(candidate, points[pi]);
            if (distance < minDistance) {
                minDistance = distance;
            }
        }

        if (minDistance > maxDistance) {
            bestCandidate = candidate;
            maxDistance = minDistance;
        }
    }

    return bestCandidate;
};

function findIndex(arr, id) {
    var len = arr.length;

    while (len--) {
        if (arr[len].id === id) {
            return len;
        }
    }

    return -1;
};

function randomColor() {
    var color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    var r = (parseInt(c[1], 16) - 32) > 0 ? (parseInt(c[1], 16) - 32) : 0;
    var g = (parseInt(c[2], 16) - 32) > 0 ? (parseInt(c[2], 16) - 32) : 0;
    var b = (parseInt(c[3], 16) - 32) > 0 ? (parseInt(c[3], 16) - 32) : 0;

    return {
        fill: color,
        border: '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    };
};




function addFood(toAdd) {
    var radius = massToRadius(cfg.foodMass);
    while (toAdd--) {
        var position = cfg.foodUniformDisposition ? uniformPosition(food, radius) : randomPosition(radius);

        food.push({
            // make ids unique
            id: ((new Date()).getTime() + '' + food.length) >>> 0,
            x: position.x,
            y: position.y,
            radius: radius,
            mass: Math.random() + 2,
            color: randomColor()
        });
    }
}

function removeFood(toRem) {
    while (toRem--) {
        food.pop();
    }
}

function valueInRange(min, max, value) {
    return Math.min(max, Math.max(min, value));
}


function balanceMass() {
    var totalMass = food.length * cfg.foodMass +
        users
            .map(function(u) {return u.mass; })
            .reduce(function(pu,cu) { return pu+cu;}, 0);

    var massDiff = cfg.gameMass - totalMass;
    var maxFoodDiff = cfg.maxFood - food.length;
    var foodDiff = parseInt(massDiff / cfg.foodMass) - maxFoodDiff;
    var foodToAdd = Math.min(foodDiff, maxFoodDiff);
    var foodToRemove = -Math.max(foodDiff, maxFoodDiff);

    if (foodToAdd > 0) {
        
        addFood(foodToAdd);
       
    }
    else if (foodToRemove > 0) {
        
        removeFood(foodToRemove);
        
    }
}

function getRandomNumber(min, max) {
	return (min + Math.floor(Math.random() * (max - min + 1)))
}



window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
})();

window.cancelAnimFrame = (function(handle){
	return  window.cancelAnimationFrame  ||
			window.mozCancelAnimationFrame;
})();


