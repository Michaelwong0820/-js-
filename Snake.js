/**
 * 创建蛇模块
 */

(function (window) {
    //随机产生一个十六进制的颜色的函数.
    function getColorForRandom() {
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];  //下标0-15
        var str = "#";
        //循环产生 6个 0-15的数.
        for (var i = 0; i < 6; i++) {
            var num = Math.floor(Math.random() * 16);
            //根据这个随机数,在arr数组中去取值.
            str += arr[num];
        }
        return str;   //"#985700"
    }
    //1.创建一个空数组储存蛇
    var list = [];
    //2.构造蛇模块函数
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        this.body = [
            { x: 3, y: 1, bgColor: 'red' },
            { x: 2, y: 1, bgColor: 'pink' },
            { x: 1, y: 1, bgColor: 'skyblue' }
        ]
    }

    //3.从地图上渲染蛇模型
    Snake.prototype.render = function (map) {
        //在每次渲染蛇之前把旧数据清除
        remove(map);
        for (var i = 0; i < this.body.length; i++) {
            var divs = document.createElement('div');
            divs.style.width = this.width + 'px';
            divs.style.height = this.height + 'px';
            divs.style.direction = this.direction;
            divs.style.position = 'absolute';
            divs.style.left = this.body[i].x * this.width + 'px';
            divs.style.top = this.body[i].y * this.height + 'px';
            divs.style.backgroundColor = this.body[i].bgColor;
            //生成到地图上
            map.appendChild(divs);
            //储存蛇移动的数据
            list.push(divs);
        }

    }
    //清除蛇移动后留下的数据
    function remove(map) {
        for (var i = 0; i < list.length; i++) {
            map.removeChild(list[i]);
        }
        //清除完数组的数据
        list.length = 0;
    }
    //4. 封装一个函数让蛇移动
    //从蛇尾开始移动
    Snake.prototype.move = function (food, map) {
        //身体最后一个的属性等于上一个的属性
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //蛇头移动
        switch (this.direction) {
            case 'right':
                this.body[0].x++;
                break;
            case 'left':
                this.body[0].x--;
                break;
            case 'top':
                this.body[0].y--;
                break;
            case 'bottom':
                this.body[0].y++;
                break;
        }

        //判断蛇是否吃到食物
        //生成蛇头坐标
        var snakeHeadX = this.body[0].x * this.width;
        var snakeHeadY = this.body[0].y * this.height;
        //生成食物坐标
        foodX = food.x;
        foodY = food.y;
        //获取蛇尾元素
        var snakeLastUnit = this.body[this.body.length - 1];
        if (snakeHeadX == foodX && snakeHeadY == foodY) {
            //在蛇尾后面添加新元素
            this.body.push(
                {
                    x: snakeLastUnit.x,
                    y: snakeLastUnit.y,
                    bgColor: getColorForRandom()
                }
            )
            //重新渲染食物位置
            food.render(map)
        }
    }
    //暴露到window中
    window.Snake = Snake;
}(window))