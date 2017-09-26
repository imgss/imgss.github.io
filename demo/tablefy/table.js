(function($){
    var data = {
        activeCell:null
    };
    function findCell(cell, direction){
        var indexof = [].indexOf, 
            line = $(cell).parent()[0],
            index = indexof.call(line.children, cell);
        switch (direction){
        case 'DOWN':
            var nextLine = line.nextElementSibling;
            if(nextLine){
                return $(nextLine).children()[index];
            }else{
                return null;
            }
        case 'UP':
            var prevLine = line.previousElementSibling;
            if(prevLine){
                return $(prevLine).children()[index];
            }else{
                return null;
            }
        case 'LEFT':
            return cell.previousElementSibling;
        case 'RIGHT':
            return cell.nextElementSibling;
        }

    }
    $.fn.table = function(){
        var wrapper = this.wrap('<div id="table-editable"></div>').parent();
        wrapper.append('<input type="text" style="display:none;position:absolute">');
        var input = wrapper.find('input');
        wrapper.on('click', 'td', function(event){
            var cell = event.target;
            if(data.activeCell){//在移动input之前更新cell的值为input的值
                var inputValue = input.val();
                data.activeCell.innerHTML = inputValue;
            }
            data.activeCell = cell;
            var position = cell.getBoundingClientRect();
            var left = cell.offsetLeft;
            var top = cell.offsetTop;
            var value = cell.innerHTML;
            if(value){//将值填写到input中
                
                input.val(value);
            }
            input.css({
                display:'inline-block',
                top:top+'px',
                left:left+'px',
                width:position.width+'px',
                height:position.height+'px'
            })[0].focus();
        });
        $(document).on('keydown', function(event){
            var toActiveCell;
            switch (event.keyCode){
            case 38:
                toActiveCell = findCell(data.activeCell, 'UP');
                break;
            case 37:
                toActiveCell = findCell(data.activeCell, 'LEFT');
                break;
            case 40:
                toActiveCell = findCell(data.activeCell, 'DOWN');
                break;
            case 39:
                toActiveCell = findCell(data.activeCell, 'RIGHT');
                break;
            }
            if(toActiveCell){
                $(toActiveCell).trigger('click');
            }
        });
        $(window).on('resize',function(){
            var cell = data.activeCell,
                position = cell.getBoundingClientRect(),
                left = cell.offsetLeft,
                top = cell.offsetTop;
            input.css({
                display:'inline-block',
                top:top+'px',
                left:left+'px',
                width:position.width+'px',
                height:position.height+'px'
            })[0].focus();

        });
    };
})(jQuery);