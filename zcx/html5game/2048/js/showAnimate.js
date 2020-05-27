function showNumAnimate(i,j,randNum)
{
	var numCell=$('#num-cell-'+i+'-'+j);
	numCell.css('background-color',getNumBgColor(randNum));
	numCell.css('color',getNumColor(randNum));
	numCell.text(getText(randNum));
	
	numCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		left:getPosLeft(i,j),
		top:getPosTop(i,j),
	},50)
}

function showMoveAnimate(fromx,fromy,tox,toy)
{
	var numCell=$('#num-cell-'+fromx+'-'+fromy);
	numCell.animate({
		left:getPosLeft(tox,toy),
		top:getPosTop(tox,toy),
	},200)
}

function updateScore(score)
{
	$('#scoreNum').text(score);
}