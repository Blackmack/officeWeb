(function(){
    var thisPage={
        init:function(){
            this.addEvent();
        },
        addEvent:function(){
            var _this=this;
            document.getElementById('btn-send').addEventListener('click',function(){
                var param={
                    fName:document.getElementById('fName').value.trim(),
                    fTelephone:document.getElementById('fTelephone').value.trim(),
                    fEmail:document.getElementById('fEmail').value.trim(),
                    fDesc:document.getElementById('fDesc').value.trim()
                }
                if(!param.fName){
                    _this.showTip('请填写您的姓名');
                    return;
                }
                if(!param.fTelephone){
                    _this.showTip('请填写您的联系电话');
                    return;
                }
                if(!param.fEmail){
                    _this.showTip('请填写您的电子邮箱');
                    return;
                }
                if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(param.fTelephone)){
                    _this.showTip('请填写正确的联系电话');
                    return;
                }
                if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(param.fEmail)){
                    _this.showTip('请填写正确的电子邮箱');
                    return;
                }
                _this.httpPost({
                    url:'https://www.laoyouba.cn/api/user/addUser',
                    method:'post'
                },param)
                 
            },true)
        },
        httpPost:function(config,param){
            var _this=this;
            var xhr=new XMLHttpRequest();
            xhr.open(config.method,config.url);
            xhr.setRequestHeader("Content-type",'application/json');
            console.log(param)
            xhr.send(JSON.stringify(param));
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4&&xhr.status==200){
                    _this.showTip('提交成功，我们会尽快联系您！')
                }
                else{
                    _this.showTip('服务开小差了，请稍后重试！')
                }
            }
        },
        showTip:function(msg){
            var _this=this;
            var el=document.getElementById('dialog');
            el.innerHTML=msg;
            el.className='dialog showTip';
            setTimeout(function(){
                _this.hideTip();
            },1800)
        },
        hideTip:function(){
            var el=document.getElementById('dialog');
            el.className='dialog hideTip';
        }
    }
    thisPage.init();
})()