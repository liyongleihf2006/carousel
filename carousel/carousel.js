/**
 * Created by Liyongleihf2006
 *一个极其简单的轮播图,只支持mouseenter和mouseleave触发切换,要改成其他切换其实很简单,改代码吧哈
 *params:{
 *         container:element 轮播的容器
 *         snaps:array 快照的数组,具体看demo就好了
 *         interval:number 轮播的切换速度,单位是毫秒,默认是1000
 *         space:number default:24 小圆点偏移的像素大小
 *         circleSize default:12 小圆点的大小,默认是12px,是在css中设置的,这里设置了可以覆盖css中的设置
 *         showNo:boolean default:true 是否显示小圆点上面的计数
 *       }
 */
function carousel(params){
    /* 轮播的容器 */
    var container  = params.container;
    /* 快照的数组 */
    var snaps = params.snaps;
    /* 多久自动变换一次,默认是1秒 */
    var interval = params.interval||1000;
    /* 小圆点偏移的单位宽度,以像素为单位,这里是24px */
    var space = params.space||24;
    /* 小圆点的大小,默认是12px,是在css中设置的,这里设置了可以覆盖css中的设置 */
    var circleSize = params.circleSize;
    /* 是否显示小圆点上面的计数 */
    var showNo = params.showNo===undefined?true:params.showNo;
    /* 暂停的标志,当鼠标悬浮该组件的时候就会暂停 */
    var suspend = false;
    /* 当前显示的快照在数组中的位置 */
    var currentIdx = 0;
    /* 生成轮播组件的元素原来的class */
    var originContainerCls = container.getAttribute("class")||"";
    /* 快照数组的长度,用来计算下方每个小原点的位置的 */
    var snapsCount = snaps.length;
    
    /* 所有小圆点的中心,用来计算下方每个小原点的位置的 */
    var middlePositionOrder = (snapsCount-1)/2;
    container.innerHTML="";
    container.setAttribute("class",function(){
        var containerCls = originContainerCls+" carousel-container";
        if(showNo){
            containerCls+=" carousel-show-no";
        }
        return containerCls;
    }());
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
        carouselHandle.setAttribute("style",function(){
            var carouselHandleStyle = "left:calc(50% + "+(idx-middlePositionOrder)*space+"px);";
            if(circleSize){
                carouselHandleStyle+="height:"+circleSize+"px;width:"+circleSize+"px";
            }
            return carouselHandleStyle;
        }());
        carouselHandle.addEventListener("mouseover",function(){
            currentIdx=idx;
            doCheck();
        });
        /*  为什么不用伪元素?
         *  因为我测试发现ie有个bug,当元素visibility: hidden时，
         *  其伪元素设置visibility: visible;是不起作用的，加上important也不行
         */
        var carouselHandleBefore=document.createElement("div");
        carouselHandle.appendChild(carouselHandleBefore);
        carouselHandleBefore.setAttribute("class","carousel-handle-before");
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