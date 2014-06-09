
$(function(){
	play();
});

var bk_table = [];
function play(){
	//初始化UI
	createUI();
	//初始化随机number
	//移动随机数
	//合并碰撞
	//检测add
	//终止条件
}


function createUI(){
	//bk_cell init
	for(var i = 0; i < 4; i++){
		bk_table[i] = [];
		for(var j = 0; j <4; j++){
			bk_table[i][j] = 0;
			var bk_cell = $('#bk_cell_'+ i + '_' + j);
			bk_cell.css('top', getTop(i, j));
			bk_cell.css('left', getLeft(i, j));
		}
	}

	//fr_cell init
	$('.fr_cell').remove();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var fr_cell_str = '<div class="fr_cell" id=fr_cell_' + i + '_' + j +'>' + '</div>'; 
			$('#main_ui_cell').append(fr_cell_str);
			var fr_cell = $('#fr_cell'+ i + '_' + j);
			if(bk_table[i][j] == 0){
				fr_cell.css('width', '10px');
				fr_cell.css('height', '10px');
				fr_cell.css('top', getTop(i, j) + 50);
				fr_cell.css('left', getLeft(i, j) + 50);
				fr_cell.css('backgroundColor', 'red');
			}else{
				fr_cell.css('width', '100px');
				fr_cell.css('height', '100px');
				fr_cell.css('top', getTop(i, j));
				fr_cell.css('left', getLeft(i, j));
			}
		}
	}
}





function getTop(i , j){
	return i*110 + 10;
}

function getLeft(i, j){
	return j*110 + 10;
}