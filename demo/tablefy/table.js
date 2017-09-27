(function($){
    var data = {
        activeCell: null,
        selects: {},
        selectCols: [],
        isSelector: false,
        defalutInput: null
    };
    $.fn.table = function(options){
        var defalutOptions = {};
        options = $.extend(defalutOptions, options);
        var wrapper = this.wrap('<div id="table-editable"></div>').parent();
        wrapper.append('<input \
                    type="text" \
                    style="box-sizing: border-box;display:none;position:absolute; \
                    ">');
        var selectCols = data.selectCols = Object.keys(options.select);//由显示选择框的列号构成的数组
        if(selectCols.length  > 0){
            for(var i = 0, len = selectCols.length; i < len; i++){
                var colNum = selectCols[i];
                var selectOptions = options.select[colNum];
                var select = data.selects[colNum] = createSelect(selectOptions);
                wrapper.append(select);
            }
        }
        var input = wrapper.find('input');
        data.defalutInput = input[0];
        input.css(options.inputCss);
        //监听单元格点击事件
        wrapper.on('click', 'td', function(event){
            var cell = event.target;
            var index = getIndexOf(cell);
            if(data.activeCell){//在移动input之前更新cell的值为input的值
                var inputValue = input.val();
                data.activeCell.innerHTML = inputValue;
            }
            data.activeCell = cell;
            var position = cell.getBoundingClientRect();
            var left = cell.offsetLeft;
            var top = cell.offsetTop;
            var value = cell.innerHTML;
            if(data.selectCols.indexOf(String(index)) !== -1){
                if(!data.isSelector){
                    input.hide();
                    input = $(data.selects[index]);
                    data.isSelector = true;
                    input.show();
                }
            }else{
                if(data.isSelector){
                    input.hide();
                    input = $(data.defalutInput);
                    data.isSelector = false;
                    input.show();
                }
            }
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
        //监听键盘事件
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
        $(window).on('resize', function(){
            if(!data.activeCell){
                return;
            }
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
    //找出当前单元格的下一个单元格
    function findCell(cell, direction){
        var line = cell.parentElement,
            index = [].indexOf.call(line.children, cell);
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
    //创建选择框
    function createSelect(options){
        if (Object.prototype.toString.call(options) !== '[object Array]'){
            throw new Error('选项应该是数组');
        }
        var htmlStr = '<select style="display:none;position:absolute">';
        for(var i = 0,len = options.length; i < len; i++){
            htmlStr += '<option>' + options[i] + '</option>';
        }
        htmlStr += '</select>';
        return $(htmlStr)[0];
    }
    //获取单元格的index;
    function getIndexOf(cell){
        return [].indexOf.call(cell.parentElement.children, cell);
    }
})(jQuery);