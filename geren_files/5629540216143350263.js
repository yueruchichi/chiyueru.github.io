$(document).ready(function () {
	var isOldIE = function() {return $.browser.msie && $.browser.version.substr(0, 1) < 7;}();
	if(isOldIE){
		$(".m-list .bg").each(function(){
			$(this).css("height",$(this).parent().height());
		});
	}
	
	$(".m-list .article .bg").each(function(){
		$(this).bind("click",function(){
			location.href = $(this).attr("src");
		  });
	});
	
	$(".content .time").each(function(){
		if($(this).parent().height()>=54){
			$(this).parent().prev().children().css('visibility','visible');
		}
	})
	
	$(".m-nav a").bind({
		mouseover:function(){
			$(this).stop();
			$(this).animate({opacity:"1"},"400");
		},
		mouseout:function(){
			$(this).stop();
			$(this).animate({opacity:"0.4"},"400");
		}
	});	
	
	$(".m-link a").bind({
		mouseover:function(){
			$(this).stop();
			$(this).animate({opacity:"0.4"},"400");
		},
		mouseout:function(){
			$(this).stop();
			$(this).animate({opacity:"1"},"400");
		}
	});		
	
	$(".imgGradient").bind({
		mouseover:function(){
			$(this).stop();
			$(this).animate({opacity:"1"},"400");
		},
		mouseout:function(){
			$(this).stop();
			$(this).animate({opacity:"0.2"},"400");
		}
	});	
	
	$(".deco-2").bind({
		mouseover:function(){
			$(this).stop();
			$(this).animate({opacity:"0.5"},"400");
		},
		mouseout:function(){
			$(this).stop();
			$(this).animate({opacity:"1"},"400");
		}
	});	
	
	$(".search").click(function(){
		$(this).parent().parent().addClass("show");
		$(this).next("input").focus();
	});	
	
	$("#sch input").blur(function(){
		$(this).parent().parent().removeClass("show");
	});
	
	$(".m-user .ctrolname").each(function(){
		$(this).bind({
			click:function(){
				if($(this).hasClass('iconI')){
					var parent = $(this).parent().parent().parent();
				}else{
					var parent = $(this).parent().parent().parent().parent();
				}
				if(parent.hasClass("hid")){
					parent.removeClass("hid");
				}else{
					parent.addClass("hid");
				}
			}
		});
	});		 
	
	$(".imgcover").bind({
		mouseover:function(){
			$(this).stop();
			$(this).animate({opacity:"0.4"},"400");
		},
		mouseout:function(){
			$(this).stop();
			$(this).animate({opacity:"0"},"400");
		}
	})
	
	$('.m-link a').each(function(){
        if ($(this).attr('href') == decodeURI(location.href)) {
            $(this).addClass('bg');
            return false;
        }
    });
	
	$('.details .text img').each(function(){
		$(this).css('width','100%');
	});
	
	if ($('.m-post .photo .img').length>=0){
		$('.m-post .photo .img:last').css('margin-bottom','0');
	}
	
	if(window.isindex){
		$(".details").bind({
			mouseover:function(){
				$(this).find(".bg").fadeIn();
			}
		});
		
		$(".m-list .bg").bind({
			mouseout:function(){
				$(this).fadeOut();
			}
		});
	}
	
	$(window).scroll(function() {
		if($(window).scrollTop() >= $(window).height()) {
	        $('.back').fadeIn('slow');
	    } else {
	        $('.back').fadeOut('slow');
	    }
    });
	
	$('.m-link a span').each(function(){
		$(this).parent().css('width',$(this).width());
	});
});