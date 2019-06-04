/**
 * 创建游戏控制器
 */
(function (window) {
    //声明一个空变量
    var that = null;
    //1.构造游戏控制器函数
    function Game(map) {
        this.snake = new Snake();
        this.food = new Food();
        this.map = map;

        // 使that指向游戏控制器
        that = this;
    }
    //2.渲染游戏控制器
    Game.prototype.start = function () {
        this.snake.render(this.map);
        this.food.render(this.map);

        // //调用函数使蛇移动
        // this.snake.move();
        // //重新渲染蛇模型
        // this.snake.render(this.map);


        //调用蛇自动移动的方法
        snakeAutoMove(this.food,this.map);
        //调用蛇根据键盘移动
        keyMove();
    }

    //3.写一个方法使蛇不停的移动
    //调用计时器让蛇不停的移动
    function snakeAutoMove(food,map) {
        var timeID = setInterval(function () {
            //调用函数使蛇移动
            this.snake.move(food,map);
            //声明一个蛇头的XY坐标
            var snakeHeadX = this.snake.body[0].x * this.snake.width;
            var snakeHeadY = this.snake.body[0].y * this.snake.height;
            if (snakeHeadX < 0 || snakeHeadX >= this.map.offsetWidth || snakeHeadY < 0 || snakeHeadY >= this.map.offsetHeight) {
                alert('Game Over!');
                clearInterval(timeID);
                return;
            }
            //重新渲染蛇模型
            this.snake.render(this.map);
        }.bind(that), 500)
    }

    //4.写一个方法让蛇跟着键盘移动
    //注册键盘按下事件
    function keyMove() {
        document.onkeydown = function (e) {
            e = e || window.event;
            // console.log(e.keyCode);
            switch (e.keyCode) {
                case 37:
                    if (this.snake.direction != 'right') {
                        this.snake.direction = 'left';
                    }
                    break;
                case 38:
                    if (this.snake.direction != 'bottom') {
                        this.snake.direction = 'top';
                    }
                    break;
                case 39:
                    if (this.snake.direction != 'left') {
                        this.snake.direction = 'right';
                    }
                    break;
                case 40:
                    if (this.snake.direction != 'top') {
                        this.snake.direction = 'bottom';
                    }
                    break;
            }
        }.bind(that)
    }

    //暴露到window
    window.Game = Game;
}(window))