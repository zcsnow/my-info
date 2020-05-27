
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var isSpecial = 2;
// window size
var viewWidth = view.viewSize.width ;
var viewHeight = view.viewSize.height = viewWidth ;
var windowWidth = viewWidth;
var windowHeight = viewHeight;
var windowMin = Math.min(windowWidth, windowHeight);
var windowMax = windowHeight;

// component sizes
var slideStrokeWidth = windowHeight / 200;
var maxCircleRadius = windowMin * 0.36;
var pinRadius = windowMin / 180;


// div 2 sizes
var windowWidth2 = windowWidth / 2;
var windowHeight2 = windowHeight / 2;
var viewWidth2 = viewWidth / 2;
var viewHeight2 = viewHeight / 2;

// size instances
var windowSize = new Size(windowWidth - 1, windowHeight - 1);
// points
var centerPoint = new Point(viewWidth2, viewHeight2);
var rotateFactor = 200;

// init status
var nameSubmitted = false;
var percentage = '0%';
var status = 0;
var loadedAd = false;
//var circleRadius = (Math.random() + 2) / 3 * maxCircleRadius;
var circleRadius = 120;
console.log(circleRadius);
var hintLineRotated = 0;
var perfection = 1;
var positionList = Array();
var drawed = null;
var simplified = null;
var saved = false;
var intersections = [];

// log info
// components instances
try {
    var back_rect = new Path.Rectangle(new Point(1, 1), windowSize);
} catch(err) {

}
// circle related
var center = new Shape.Circle(centerPoint, pinRadius);
center.fillColor = 'grey';
var hintCircle = new Path.Circle(centerPoint, circleRadius);
/*hintCircle.strokeColor = '#fff';
hintCircle.dashArray = isSpecial ? [5, 2] : [10, 4];
*/
var hintRadiusLine = new Path.Line(centerPoint, new Point(viewWidth2 - circleRadius, viewHeight2));
//hintRadiusLine.strokeColor = '#f00';
hintRadiusLine.rotate(-160, centerPoint);
var hintLongLine = new Path.Line(centerPoint, new Point(viewWidth2 - windowMax, viewHeight2));
hintLongLine.rotate(-160, centerPoint);
hintCircle.visible = false;
// hint part
function init() {
	ctx.shadowBlur = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    perfection = 1;
    //circleRadius = (Math.random() + 2) / 3 * maxCircleRadius;
	//console.log(circleRadius);
    percentage = '0%';
    status = 1;
    hintLineRotated = 0;
    drawed = null;
    intersections.forEach(function(x) {
        x.remove();
    })
    intersections = [];
	hintCircle.visible = false;
    //hintCircle.remove();
    //hintCircle = new Path.Circle(centerPoint, circleRadius);
	//hintCircle.strokeColor = '#fff';
	//hintCircle.dashArray = isSpecial ? [5, 2] : [10, 4];
    //hintCircle.strokeColor = '#fff';
    //hintRadiusLine.remove();
    //hintRadiusLine = new Path.Line(centerPoint, new Point(viewWidth2 - circleRadius, viewHeight2));
    //hintRadiusLine.strokeColor = '#fff';
    //hintRadiusLine.rotate(120, centerPoint);
    hintLongLine.remove();
    hintLongLine = new Path.Line(centerPoint, new Point(viewWidth2 - windowMax, viewHeight2));
    hintLongLine.rotate(-160, centerPoint);
    simplified.remove();
    simplified = null;
}


function encourage(perfection) {
    if (perfection <= 0.5) {
        return '亲，你确定你画的是圆？不到' + (perfection * 100).toFixed(2) + '%的圆度，跟80年代国内企业和消费者对品牌理解的一知半解有一拼。';
    } else if (perfection < 0.7 && perfection>0.5) {
        return '亲，你的几何是体育老师教的么？你画的圆月圆度才' + (perfection * 100).toFixed(2) + '%，有点像90年代的中国企业较以前发展壮大了，但品牌还不成气候。';
    } else if (perfection < 0.9 && perfection>=0.7) {
        return '不用说，你的几何肯定是数学老师教的咯。你画的圆月圆度达到' + (perfection * 100).toFixed(2) + '%，是2000年后的中国品牌在国内外开始产生一定的影响力';
    } else if (perfection >= 0.9) {
        return '行走的圆规！你画的圆月圆度达到' + (perfection * 100).toFixed(2) + '%，就像2016年吉利品牌成立30年，高质感中级车吉利帝豪GL即将以自胜者脚步迈向世界舞台，中国的月亮才更圆。';
    }

}

function fillRankText() {
	setTimeout(function(){
		$('.canvas-box').hide();
		$('.js-result-text').text(encourage(perfection));
		$("#baifenbi").val((perfection * 100).toFixed(2));
		$('.result-box').show();
	},500);
}

function onFrame(event) {
    if (event.delta > 0.2) {
        event.delta = 0.2;
    }
    if (status === 0) {
        if (loading) {
            loading = false;
        }
    } else if (status === 1) {
        if (hintCircle.visible) {
            opacity = hintCircle.opacity - 2 * event.delta;
            if (opacity < 0) {
                opacity = 0;
                hintCircle.visible = false;
            }
            hintCircle.opacity = opacity;
        }
    } else if (status === 2) {
        if (!hintCircle.visible) {
            hintCircle.visible = true;
        }
		
        if (hintCircle.opacity < 1) {
            opacity = hintCircle.opacity + 2 * event.delta;
            if (opacity > 1) {
                opacity = 1;
            }
            hintCircle.opacity = opacity;
			
        } else {
            if (hintLineRotated < 359.9) {
                rotation = event.delta * rotateFactor;
                hintLineRotated += rotation;
                if (hintLineRotated > 360) {
                    rotation = 360 - hintLineRotated + rotation;
                    hintLineRotated = 360;
                }
                hintRadiusLine.rotate(rotation, new Point(viewWidth2, viewHeight2));
                hintLongLine.rotate(rotation, new Point(viewWidth2, viewHeight2));

                var intersectionsDraw = hintLongLine.getIntersections(drawed);
                var intersectionsCircle = hintLongLine.getIntersections(hintCircle);
                var inter1 = centerPoint;
                if (intersectionsDraw.length) {
                    inter1 = intersectionsDraw[0].point;
                }
                var inter2 = inter1;
                if (intersectionsCircle.length) {
                    inter2 = intersectionsCircle[0].point;
                }
                if (!simplified) {
                    simplified = new Path();
                    simplified.visible = false;
                }
                simplified.add(inter1);
                var intersectionLine = new Path.Line(inter1, inter2);
                intersections.push(intersectionLine);
                intersectionLine.strokeWidth = 2;
                intersectionLine.strokeColor = '#fff';
                var distance = inter1.getDistance(inter2);
                perfection -= distance / circleRadius * rotation / 360;
                if (perfection < 0) {
                    perfection = 0;
                }
            } else {
                if (!simplified.visible) {
                    simplified.closed = true;
                    simplified.smooth();
                    simplified.strokeColor = '#fff';
                    simplified.strokeWidth = 2;
                    simplified.opacity = 0;
                    simplified.visible = true;
                } else if (simplified.opacity < 0.8) {
                    opacity = simplified.opacity + event.delta;
                    if (opacity > 1) {
                        opacity = 1;
                    }
                    simplified.opacity = opacity;
                    drawed.opacity = 1 - opacity;
                } else {
                   
                    fillRankText();

					 status = 4;
                }
            }
        }
    } else if (status === 4) {
        if (!loadedAd) {
            if (typeof(startLoadingGoogle) !== 'undefined') {
                startLoadingGoogle();
            }
            loadedAd = true;
        }
        
    }
}

function onMouseDown(event) {
    if (status === 1) {
        if (!drawed) {
            drawed = new Path({
                segments: [event.point],
                strokeColor: '#fff',
            });
        }
    } else if (status === 3) {
        status = 4;
    }
}

function onMouseDrag(event) {
    if (status === 1) {
        drawed.add(event.point);	
		hintCircle.visible = false;
    }
}

function onMouseUp(event) {
    if (status === 1) {
        if (drawed) {
            status = 2;
			hintCircle.visible = false;
			//setTimeout(function(){
				ctx.fillStyle = "#fff";
				ctx.shadowColor = "rgba(255,255,255,1)";
				ctx.shadowBlur = 50;
				ctx.fill();
				var url = canvas.toDataURL('image/png');
				var img = new Image();
					img.src = url;
				$('#imgDiv').html("");
				$('#imgDiv').append(img);
			//},1000);
			
        }
    }
}



$('.js-again-btn').on('click',function(e){;
	drawed.remove();
	init();
	$('.result-box').hide();
	$('.canvas-box').fadeIn(1000);
});

$('.canvas-box').on('click',function(e){
	$('.tip-box').hide();
	//hintCircle.visible = true;
	status = 1;
	
});
