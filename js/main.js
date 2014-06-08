window.onload = function () {
	createUI();
}


var cellData = [];
var _get = function(id){
	var elem = document.getElementById(id);
	return elem;
}


function createUI (){

	//初始化每个单元格的值
	for(var i = 0 ; i < 4 ; i++){
		cellData[i] = [];
		for(var j = 0; j < 4; j++)
			cellData[i][j] = 0;
	}

	//创建覆盖层
	var ui = _get('main_ui_cell');


	if(){

	}
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0; j < 4; j++){
			var div = document.createElement('div');
			div.setAttribute('class', 'fr_cell');
			div.id = 'fr_cell' + i + '_' + j;
			ui.appendChild(div);
		}
			
	}
}