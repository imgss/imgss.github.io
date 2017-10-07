(function($){
    var activeCell;
    $.fn.table =  function(options){
        var store = {
            activeCell: null,
            row: 0,
            col: 0,
            selects: {},
            selectCols: [],
            isSelector: false,
            defalutInput: null
        };
        var defalutOptions = {
            cellType:'td'
        };
        options = $.extend(defalutOptions, options);
        var wrapper = this.wrap('<div></div>').parent();
        wrapper.append('<input \
                    type="text" \
                    style="box-sizing: border-box;display:none;position:absolute; \
                    ">');
        var selectCols = store.selectCols = Object.keys(options.select);//由显示选择框的列号构成的数组
        if(selectCols.length  > 0){
            for(var i = 0, len = selectCols.length; i < len; i++){
                var colNum = selectCols[i];
                var selectOptions = options.select[colNum];
                var select = store.selects[colNum] = createSelect(selectOptions);
                wrapper.append(select);
            }
        }
        var input = wrapper.find('input');
        store.defalutInput = input[0];
        input.css(options.inputCss);
        //监听单元格点击事件
        var self = this;
        wrapper.on('click', options.cellType, function(event){
            var cell = event.target;
            var index = getColOf(cell);
            event.stopPropagation();
            if(store.activeCell){//在移动input之前更新cell的值为input的值
                var inputValue = input.val();
                store.activeCell.innerHTML = inputValue;
                //触发一个activeChange事件
                self.trigger('activeChange',{
                    row: store.row,
                    col: store.col,
                    value: inputValue
                });
            }
            activeCell = store.activeCell = cell;
            store.col = getColOf(cell);
            store.row = getRowOf(cell, self[0]);
            var position = cell.getBoundingClientRect();
            var left = cell.offsetLeft;
            var top = cell.offsetTop;
            var value = cell.innerHTML;
            if(store.selectCols.indexOf(String(index)) !== -1){
                if(!store.isSelector){
                    input.hide();
                    input = $(store.selects[index]);
                    store.isSelector = true;
                    input.show();
                }
            }else{
                if(store.isSelector){
                    input.hide();
                    input = $(store.defalutInput);
                    store.isSelector = false;
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
        $(window).on('resize', function(){
            if(!activeCell){
                return;
            }
            var cell = activeCell,
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
        return this;
    };
    //监听键盘事件
    $(document).on('keydown', function(event){
        var toActiveCell;
        switch (event.keyCode){
        case 38:
            toActiveCell = findCell(activeCell, 'UP');
            break;
        case 37:
            toActiveCell = findCell(activeCell, 'LEFT');
            break;
        case 40:
            toActiveCell = findCell(activeCell, 'DOWN');
            break;
        case 39:
            toActiveCell = findCell(activeCell, 'RIGHT');
            break;
        }
        if(toActiveCell){
            $(toActiveCell).trigger('click');
        }
    });
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
    //获取单元格的列号
    function getColOf(cell){
        return [].indexOf.call(cell.parentElement.children, cell);
    }
    //获取单元格的行号
    function getRowOf(cell, tableEl){ 
        return [].indexOf.call(tableEl.children, cell.parentElement);
    }
})(jQuery);