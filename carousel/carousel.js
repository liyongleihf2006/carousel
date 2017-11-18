/**
 * Created by Liyongleihf2006
 *一个极其简单的轮播图,只支持mouseenter和mouseleave触发切换,要改成其他切换其实很简单,改代码吧哈
 *params:
 *       container 轮播的容器
 *       snaps 快照的数组,具体看demo就好了
 *       interval 轮播的切换速度,单位是毫秒,默认是1000
 */
function carousel(container,snaps,interval){
    /* 暂停的标志,当鼠标悬浮该组件的时候就会暂停 */
    var suspend = false;
    /* 多久自动变换一次,默认是1秒 */
    var interval = interval||1000;
    /* 当前显示的快照在数组中的位置 */
    var currentIdx = 0;
    /* 生成轮播组件的元素原来的class */
    var originContainerCls = container.getAttribute("class")||"";
    /* 快照数组的长度,用来计算下方每个小原点的位置的 */
    var snapsCount = snaps.length;
    /* 小圆点偏移的单位宽度,以像素为单位,这里是24px */
    var space = 24;
    /* 所有小圆点的中心,用来计算下方每个小原点的位置的 */
    var middlePositionOrder = (snapsCount-1)/2;
    container.innerHTML="";
    container.setAttribute("class",originContainerCls+" carousel-container");
    container.addEventListener("mouseenter",function(){
        suspend=true;
    });
    container.addEventListener("mouseleave",function(){
        suspend=false;
    });
    snaps.forEach(function(snap,idx){
        var carouselItem=document.createElement("div");
        container.appendChild(carouselItem);
        if(!idx){
            carouselItem.setAttribute("class","carousel-item active");
        }else{
            carouselItem.setAttribute("class","carousel-item");
        }
        var carouselContent=document.createElement("div");
        carouselItem.appendChild(carouselContent);
        carouselContent.setAttribute("class","carousel-content");
        var isNode = Boolean(typeof(snap) === 'object' && snap !== null && snap.nodeType > 0);
        carouselContent.appendChild(isNode ? snap : document.createTextNode(String(snap)));

        var carouselHandle=document.createElement("div");
        carouselItem.appendChild(carouselHandle);
        carouselHandle.setAttribute("class","carousel-handle");
        carouselHandle.setAttribute("style","left:calc(50% + "+(idx-middlePositionOrder)*space+"px)");
        carouselHandle.addEventListener("mouseover",function(){
            currentIdx=idx;
            doCheck();
        });
    });
    setInterval(function(){
        if(suspend){return};
        autoTransformation();
    },interval);
    function autoTransformation(){
        /* 当前要显示的快照的索引大于等于快照数组的长度的时候当前快照为索引为0的快照 */
        if(++currentIdx>=snapsCount){
            currentIdx=0;
        }
        doCheck();
    }
    function doCheck(){
        [].forEach.call(container.querySelectorAll(".carousel-item"),function(item,idx){
            item.setAttribute("class",idx==currentIdx?"carousel-item active":"carousel-item");
        }) 
    }
}