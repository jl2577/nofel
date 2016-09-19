    /**
     * 获得base64
     * @param {Object} o
     * @param {Number} [o.width] 图片需要压缩的宽度
     * @param {Number} [o.height] 图片需要压缩的高度，为空则会跟随宽度调整
     * @param {Number} [o.quality=0.8] 压缩质量，不压缩为1
     * @param {Number} [o.mixsize] 上传图片大小限制
     * @param {Number} [o.type] 上传图片格式限制
     * @param {Function} [o.before(blob)] 处理前函数,this指向的是input:file
     * @param {Function} o.success(obj) 处理后函数
     * @param {Function} o.error(obj) 处理后函数
     * @example
     *
     * $('#test').UploadImg({
            clickFlag:true,//如果为true，表示选择完图片后马上上传（url参数有效，error，success，有效）。如果为false （url参数无效，error，success，无效）
            url : '/upload.php',
            width : '320',
            //height : '200',
            quality : '0.8', //压缩率，默认值为0.8
            // 如果quality是1 宽和高都未设定 则上传原图
            mixsize : '1',
            //type : 'image/png,image/jpg,image/jpeg,image/pjpeg,image/gif,image/bmp,image/x-png',
            before : function(blob){
                //上传前返回图片blob
                $('#img').attr('src',blob);
            },
            error : function(res){
                //上传出错处理
                $('#img').attr('src','');
                $('#error').html(res);
            },
            success : function(res){
                //上传成功处理
                $('#imgurl').val(res);
            }
        });
     */


    $.fn.UploadImg = function(o){
    	
    	var obj = this;
        this.change(function(){
            var file = this.files['0'];
            console.log(file);
            if(file.size && file.size > o.mixsize){
                o.error('照片大小超过限制！');
                this.value='';
            }else if(o.type && o.type.indexOf(file.type) < 0){
                o.error('照片类型不支持！');
                this.value='';
            }else{
                var URL = URL || webkitURL;
                var blob = URL.createObjectURL(file);               
                _compress(blob,file,obj);
                this.value='';
            }
        });


        function _compress(blob,file,obj){
            var img = new Image();
            img.src = blob;
            img.onload = function(){
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                if(!o.width && !o.height && o.quality == 1){
                    var w = this.width;
                    var h = this.height;
                }else{
                    var w = o.width || this.width;
                    var h = o.height || w/this.width*this.height;
                }
                $(canvas).attr({width : w, height : h});
                ctx.drawImage(this, 0, 0, w, h);
                var base64 = canvas.toDataURL(file.type, (o.quality || 0.8)*1 );
                if( navigator.userAgent.match(/iphone/i) ) {
                    //var mpImg = new MegaPixImage(img);
                   // mpImg.render(canvas, { maxWidth: w, maxHeight: h, quality: o.quality || 0.8, orientation: 6 });
                    base64 = canvas.toDataURL(file.type, o.quality || 0.8 );
                }

                // 修复android
                if( navigator.userAgent.match(/Android/i) ) {
                    var encoder = new JPEGEncoder();
                    base64 = encoder.encode(ctx.getImageData(0,0,w,h), o.quality * 100 || 80 );
                }
                o.before(blob,base64,obj);
                if(o.clickFlag){  
                  _ajaximg(base64,file.type,obj);
                }
                else{
                	return base64;
                	
                }
            };
        }

        function _ajaximg(base64,type,file,obj){
        	
            $.ajax({
            	type:'post',
            	url:o.url,
            	data:{
            		imgSrcValue:base64,
            		imgSrcValueLength:base64.length
            	},
            	success:function(res){
            		//$.showLoading(false,false);
                var res = eval('(' + res + ')');
                if(res.mesgCode != '0000'){
                	//$.showLoading(false,false);
                    o.error(base64,obj);
                }else{
                	
                    o.success(base64,res,obj,blob);
                }
                console.log(res);
            },
            error:function(){
            	//$.showLoading(false,false);
            }
            });
          }
    };

