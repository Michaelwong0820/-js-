/**
 * 创建食物模块
 */

 //1.构造食物函数
(function (window) {
   //创建一个空数组储存食物
   var list = [];
   function Food (width,height,bgColor,x,y) {
      this.width = width || 20;
      this.height = height || 20;
      this.bgColor = bgColor || 'green';
      this.x = x || 0;
      this.y = y || 0;
   }
  
   //2.把食物的属性渲染到地图中中
   Food.prototype.render = function (map) {
      //每次渲染食物之前移出旧食物
      removeFood(map)
       //随机生成XY坐标
       this.x = Math.floor(Math.random()*map.offsetWidth/this.width)*this.width;
       this.y = Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
      var div1 = document.createElement('div');
      div1.style.width = this.width + 'px';
      div1.style.height = this.height + 'px';
      div1.style.backgroundColor = this.bgColor;
      div1.style.position = 'absolute';
      div1.style.left = this.x + 'px';
      div1.style.top = this.y + 'px';
      map.appendChild(div1);
      //储存食物的数据
      list.push(div1);
   }

   //写一个方法去除旧食物
   function removeFood (map) {
      for(var i = 0;i<list.length;i++){
         map.removeChild(list[i]);
      }
      //清除数组的数据
      list.length = 0
   }

   //3.暴露到window中
   window.Food = Food;
}(window))
