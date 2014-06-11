
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

	//show number
	bk_table[1][2] = 8;
	bk_table[2][0] = 4;
	showNumber(bk_table);
	
}


function showNumber(bk_table){
	console.log(bk_table);
	//fr_cell init
	$('.fr_cell').remove();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var fr_cell_str = '<div class="fr_cell" id=fr_cell_' + i + '_' + j +'>' + '</div>'; 
			$('#main_ui_cell').append(fr_cell_str);
			var fr_cell = $('#fr_cell_'+ i + '_' + j);
			if(bk_table[i][j] == 0){
				fr_cell.css('width', '10px');
				fr_cell.css('height', '10px');
				fr_cell.css('top', getTop(i, j) + 50);
				fr_cell.css('left', getLeft(i, j) + 50);
			}else{
				fr_cell.css('width', '100px');
				fr_cell.css('height', '100px');
				fr_cell.css('top', getTop(i, j));
				fr_cell.css('left', getLeft(i, j));
				fr_cell.css('backgroundColor', getBackColor(bk_table[i][j])); //设置背景色
				fr_cell.css('color', getTextColor(bk_table[i][j])); //设置文字颜色
				fr_cell.text(bk_table[i][j]);
			}
		}
	}
}


function getBackColor(number){
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

function getTextColor(number){
	if(number <= 4)
		return '#665C52';

	return '#FFF';
}

function getTop(i , j){
	return i*110 + 10;
}

function getLeft(i, j){
	return j*110 + 10;
}