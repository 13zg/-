window.addEventListener('load',function(){
    var box1=document.querySelector('.preview_img')
    var smallbox=document.querySelector('.mask')
    var bigbox=document.querySelector('.big')
    //第一步鼠标在box1中，显示smallbox和大图
    box1.addEventListener('mouseover',function(){
        smallbox.style.display='block'
        bigbox.style.display='block'
    })
    box1.addEventListener('mouseout',function(){
        smallbox.style.display='none'
        bigbox.style.display='none'
    })
    box1.addEventListener('mousemove',function(e1){
        //第二步smallbox跟着鼠标移动
        var smallboxX=e1.pageX-this.offsetLeft-smallbox.offsetWidth/2
        var smallboxY=e1.pageY-this.offsetTop-smallbox.offsetHeight/2
        if(smallboxX<0){
            smallboxX=0
        }else if(smallboxX>=this.offsetWidth-smallbox.offsetWidth){
            smallboxX=this.offsetWidth-smallbox.offsetWidth
        }
        if(smallboxY<0){
            smallboxY=0
        }else if(smallboxY>this.offsetHeight-smallbox.offsetHeight)
        {
            smallboxY=this.offsetHeight-smallbox.offsetHeight
        }
        smallbox.style.top=smallboxY+'px'
        smallbox.style.left=smallboxX+'px'
        // 第三步让大图跟着移动
        //因为都是正方形，所以最大距离相等
        var bigImg=document.querySelector('.bigImg')
        var Max1=box1.offsetWidth-smallbox.offsetHeight
        var Max2=bigImg.offsetWidth-bigbox.offsetWidth
        var bigX=(Max2*smallboxX)/Max1
        var bigY=(Max2*smallboxY)/Max1
        bigImg.style.left=-bigX+'px'
        bigImg.style.top=-bigY+'px'

    })
})