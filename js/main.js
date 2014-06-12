
$(function(){

	t2048 = new T2048();
	t2048.play();

	$('#play_game').click(function(){
		t2048 = new T2048();
		t2048.play();
	});

	$('#show_game_over').hide();

	$('#close_div').click(function(){
		$('#show_game_over').hide();
		t2048 = new T2048();
		t2048.play();
	});
});


//T2048类
var T2048 = function(){
	//记录数字变化的二维数组
	var bk_table = [];
	//玩家分数
	var myScore = 0;
	//UI绘制
	var createUI = function (){
		for(var i = 0; i < 4; i++){
			bk_table[i] = [];
			for(var j = 0; j <4; j++){
				bk_table[i][j] = 0;
				var bk_cell = $('#bk_cell_'+ i + '_' + j);
				bk_cell.css('top', getTop(i, j));
				bk_cell.css('left', getLeft(i, j));
			}
		}
	}
	//产生并显示随机数
	var initNumber = function (){
		var xy1 = createPosition(bk_table);
		//能够产生随机数，则产生随机数
		if(xy1){
			var number1 = createNumber();
			//产生一个数
			bk_table[xy1.x][xy1.y] = number1;
			// var xy2 = createPosition(bk_table);
			// var number2 = createNumber();
			// bk_table[xy2.x][xy2.y] = number2;
			showNumber(bk_table);
		}
	}

	//产生随机数
	var createNumber = function (){
		return Math.random() *10 > 5 ? 4:2;
	}

	//获取下一个绘制的位置
	var createPosition = function (table){
		var x = Math.floor(Math.random() *4);
		var y = Math.floor(Math.random() *4);
		var i = 0;
		while(i < 500){
			if(table[x][y] === 0)
				return {x:x, y:y};
			x = Math.floor(Math.random() *4);
			y = Math.floor(Math.random() *4);
			i++;
		}

		for(i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(table[i][j] === 0)
					return {x:i, y:j};
			}
		}

		return false;
	}

	//将数字绘制出来
	var showNumber = function (table){
		$('.fr_cell').remove();
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				var fr_cell_str = '<div class="fr_cell" id=fr_cell_' + i + '_' + j +'>' + '</div>'; 
				$('#main_ui_cell').append(fr_cell_str);
				var fr_cell = $('#fr_cell_'+ i + '_' + j);
				if(table[i][j] == 0){
					fr_cell.css('width', '0');
					fr_cell.css('height', '0');
					fr_cell.css('top', getTop(i, j) + 50);
					fr_cell.css('left', getLeft(i, j) + 50);
				}else{

			
					fr_cell.css('backgroundColor', getBackColor(table[i][j])); //设置背景色
					fr_cell.css('color', getTextColor(table[i][j])); //设置文字颜色
					fr_cell.css('width', '100px');
					fr_cell.css('height', '100px');
					fr_cell.css('top', getTop(i, j));
					fr_cell.css('left', getLeft(i, j));
					fr_cell.text(table[i][j]);
				}
			}
		}
	}

	//获取背景色
	var getBackColor = function (number){
		switch(number){
			case 2: return '#EEE4DA'; break;
			case 4: return '#EEE4DA'; break;
			case 8: return '#F3B079'; break;
			case 16: return '#EB8E53'; break;
			case 32: return '#FB795F'; break;
			case 64: return '#EB573B'; break;
			case 128: return '#00C6E5'; break;
			case 256: return '#EDCA62'; break;
			case 512: return '#FCD209'; break;
			case 1024: return '#E12D2D'; break;
			case 2048: return '#4CB649'; break;
			default: break;
		}
	}

	//获取文本颜色
	var getTextColor = function (number){
		if(number <= 4)
			return '#665C52';
		return '#FFF';
	}	

	var getTop = function (i , j){
		return i*110 + 10;
	}

	var getLeft = function (i, j){
		return j*110 + 10;
	}

	//判断是否还可以移动（游戏是否结束）
	var notMove = function (){
		var full = (function (){
			for(var i = 0; i < 4; i++){
				for(var j = 0; j < 4; j++){
					if(bk_table[i][j] === 0)
						return false;		
				}
			}

			return true;
		})();

		var noLeftRight = (function (){
			for(var i = 0; i < 4; i++){
				for(var j = 0; j < 3; j++){
					if(bk_table[i][j] === bk_table[i][j+1])
						return false;
				}
			}
			return true;
		})();

		var noTopBottom = (function (){
			for(var j = 0; j < 4; j++){
				for(var i = 0; i < 3; i++){
					if(bk_table[i][j] === bk_table[i+1][j])
						return false;
				}
			}
			return true;
		})();

		return full & noLeftRight & noTopBottom;

	}

	//监听用户的键盘移动
	var getKeyDowm = function (e){
		var isOver = notMove();
		if(!isOver){
			switch(e.which){
				case 37:
					//left
				 	//整体向左移 并合并相同的数字，i不变
				 	for(var i = 0; i < 4; i++){
				 		for(var j = 3; j > 0; j--){
				 			if(bk_table[i][j-1] === 0 || (bk_table[i][j] === bk_table[i][j-1])){
				 				bk_table[i][j-1] = bk_table[i][j] + bk_table[i][j-1];
				 				myScore = myScore + bk_table[i][j-1];
				 				bk_table[i][j] = 0;
				 			}
				 		}
				 	}
				 	//生成新的数字和UI
				 	$('#my_score').text(myScore);
				 	initNumber(bk_table);
				 	break;
				case 38:
					//top
				 	//j = 0不移，其余都移动 j不变
				 	for(var j = 0; j < 4; j++){
				 		for(var i = 3; i > 0 ; i--){
					 		if(bk_table[i-1][j] === 0 || (bk_table[i][j] === bk_table[i-1][j])){
					 			bk_table[i-1][j] = bk_table[i][j] + bk_table[i-1][j];
					 			myScore = myScore + bk_table[i-1][j];
					 			bk_table[i][j] = 0;
					 		}
				 		}
				 	}
				 	$('#my_score').text(myScore);
				 	initNumber(bk_table);
				 	break;
				case 39: 
					//right
					//整体向右移 并合并相同的数字，i不变
				 	for(var i = 0; i < 4; i++){
				 		for(var j = 0; j < 3; j++){
				 			if(bk_table[i][j+1] === 0 || (bk_table[i][j] === bk_table[i][j+1])){
				 				bk_table[i][j+1] = bk_table[i][j] + bk_table[i][j+1];
				 				myScore = myScore + bk_table[i][j+1];
				 				bk_table[i][j] = 0;
				 			}
				 		}
				 	}
				 	//生成新的数字和UI
				 	$('#my_score').text(myScore);
				 	initNumber(bk_table);
				 	break;
				case 40: 
					//bottom
					for(var j = 0; j < 4; j++){
				 		for(var i = 0; i < 3 ; i++){
					 		if(bk_table[i+1][j] === 0 || (bk_table[i][j] === bk_table[i+1][j])){
					 			bk_table[i+1][j] = bk_table[i][j] + bk_table[i+1][j];
					 			myScore = myScore + bk_table[i+1][j];
					 			bk_table[i][j] = 0;
					 		}
				 		}
				 	}
				 	$('#my_score').text(myScore);
				 	initNumber(bk_table);
					break;
				default: 
					break;
			}
		}else{
			$('#show_game_over').show();
			document.onkeydown = null;
		}
	}

	document.onkeydown = getKeyDowm;

	//暴露paly
	return {
		play: function play(){
			myScore = 0;
			$('#my_score').text(0);
			createUI();
			initNumber(bk_table);			
		}
	};

}



