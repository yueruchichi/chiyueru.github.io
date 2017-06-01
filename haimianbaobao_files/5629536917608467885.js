$(document).ready(function () {
    var isOldIE = function(){return $.browser.msie && $.browser.version.substr(0,1)<8;}();

    var isLoading = false;
    var nextPageUrl = $('.nextpagelink').attr('href');

    var checkLoadMore = function() {
        if (nextPageUrl == null) {
            $('#load_more_wrapper').css('display', 'none');
        };
    };
    checkLoadMore();

    var loadMore = function(_callback) {
        if (!!isLoading) {
            return;
        }
        if (nextPageUrl != null) {
            isLoading = true;
            $.get(encodeURI(nextPageUrl), function(data) {
                var contents = $(data).find('.home');
                if (contents.length <= 0) {
                    nextPageUrl = null;
                    isLoading = false;
                    $('#load_more_wrapper').css('display', 'none');
                    return;
                }
                $('#load_more_wrapper').remove();
                $('.g-mn').append(contents);

                nextPageUrl = $(data).find('.nextpagelink').attr('href');
                checkLoadMore();

                isLoading = false;
                if (!!_callback) {
                    _callback();
                }
            });
        }
    };

    var doBind = function(ele) {
        var link = $(ele).find('.indexlink');
        if ($(link).attr('id') == 'load_more') {
            $(link).click(function(event){
                 event.stopPropagation();
                 loadMore(show);
                 return false;
            });
        } else {
            if (!!window.layer) {
                $(link).click(loadPost);
            }
        }
    };

    var show = function(ele) {
        if (!ele) {
            ele = $('.home:first');
        }
        while($(ele).css('display') != 'none') {
            ele = $(ele).next();
        }
        if ($(ele).attr('id') == 'load_more_wrapper') {
            if (nextPageUrl != null) {
                doBind($(ele));
                $(ele).fadeIn(50);
            }
            $('#cpcnt').css('visibility', 'visible');
            return;
        }
        $(ele).fadeIn(50, function(){
            doBind($(ele));
            show($(ele).next());
        });
    };

    var initIndex = function() {
        show();
    };

    var initPermalink = function() {
        $('#cpcnt').css('visibility', 'visible');
        $('.popupbox').css('left','-8px');
        if(isOldIE){$('.popupbox').css('left','-90px');}
    };

    Function.prototype._$bind = function() {
        var _args = arguments,
            _object = arguments[0],
            _function = this;
        return function(){
            // not use slice for chrome 10 and Array.apply for android
            var _argc = [].slice.call(_args,1);
            [].push.apply(_argc,arguments);
            return _function.apply(_object||window,_argc);
        };
    };

    var showPost = function(_url) {
        var _options = {
            'class' : '',
            'html' : '',
            'isNeedAnimation' : true,
            'opacity' : 90,
            'bgcolor' : '#000',
            'cbAfterSetHtmlContent' : function() {
                $('.pager').click(loadPost);
                P('loft.w.g').initPagePhotoShow(document.body, {});
            }._$bind(this)
        };
        var pageLayer = netease.lofter.widget.pageLayer._$getInstance(document.body, _options);

        $.get(_url, function(data) {
            var content = $(data).find('.popupbox')[0].outerHTML;
            pageLayer.setHtmlContent(content);
        });
    };

    var loadPost = function(event) {
        event.stopPropagation();
        var _url = $(this).attr('href');
        if (_url != '#') {
            showPost(_url);    
        }
        return false;
    };

    var initCommon = function() {
        var showm_link = function(){
            $(".m-link .link-btn").css('background-position','0 -211px');
            $(".m-link ul").slideDown(200);
        };
        var hidden_link = function(){
            if (isOldIE) {
                $(".m-link ul").css('display', 'none');
            }
            $(".m-link .link-btn").css('background-position','0 -181px');
            $(".m-link ul").slideUp(200);
            $('#cur_cslink').text('');
        };
        var showabout = function(){
			$(".m-about .hovbg").height($(".m-about").height() + $(".m-about .txt").height());
			if (isOldIE) {
                $(".m-about .txt, .m-about .hovbg").css('display','block');
            }else{$(".m-about .txt, .m-about .hovbg").slideDown(400);}   
        };
        var hideabout = function(){
			if (isOldIE) {
                $(".m-about .txt, .m-about .hovbg").css('display','none');
            }else{$(".m-about .txt, .m-about .hovbg").slideUp(400);} 
        };

        $(".m-link .link-btn").click(function(event){
            event.stopPropagation();
            if ($(".m-link ul").css('display') == 'none'){
                showm_link();
            }else{
                hidden_link();
            }
            return false;
        });

        var hoverd1 = false;
        var hoverd2 = false;

        $(".m-link").hover(function(event){
            hoverd1 = true;
        }, function(){
            hoverd1 = false;;
        });
        $(".m-link ul").hover(function(event){
            hoverd2 = true;
        }, function(){
            hoverd2 = false;
        });

        $(".m-link, .m-link ul").hoverIntent({
            sensitivity: 10,
            interval: 50,
            over: function(){
            },
            timeout: 1000,
            out: function(){
                if (!hoverd1 && !hoverd2) {
                    hidden_link();
                    hoverd1 = false;
                    hoverd2 = false;
                }

            }
        });

        $('.customlink').each(function(){
            if ($(this).attr('href') == decodeURI(location.href)) {
                $('#cur_cslink').text($(this).text());
                return false;
            }
        });

        $(".sch .f-icon").click(function(event){
            event.stopPropagation();
            if ($(".m-link .sch-box").css('display') == 'none'){
                $(".m-link .sch-box").css('display','block');
                $(this).addClass("f-icon-sel");
            }else{
                $(".m-link .sch-box").css('display','none');
                $(this).removeClass("f-icon-sel");
            }
            return false;
        });
        $(document).click(function(){
            $(".m-link .sch-box").css('display','none');
            $('.sch .f-icon').removeClass("f-icon-sel");
        });
        $('input').click(function(event){
            event.stopPropagation();
            return false;
        });
        $("input").focus(function(){
            if($(this).val()=="搜索" )
                $(this).val("");});
        $("input").blur(function(){
            if($(this).val()=="") {
                $(this).val("搜索");
            }
            $(".m-link .sch-box").css('display', 'none');
            $('.sch .f-icon').removeClass("f-icon-sel");
        });

        $(".tt-iconhov").click(function(event){
            event.stopPropagation();
            if ($(".m-about .txt").css('display') == 'none'){
                $('.m-about').removeAttr('style');
                showabout();
            }else{
                hideabout();
            }
            return false;
        });
        if(isOldIE){
            $('.g-mn').delegate('.home', 'hover', function(event) {
                if( event.type === 'mouseenter' )
                    $(this).addClass('j-home');
                else
                    $(this).removeClass('j-home');
            });
        }
        $(".m-about").hover(function(){showabout();},function(){hideabout();})
        $(document).click(function(event) {
            hidden_link();
            hideabout();
            $(".home").animate({"opacity": '1',"filter":'alpha(opacity=100)'},300);
        });
    };

    if (!window.permalink) {
        initIndex();
    } else {
        initPermalink();
    }
    initCommon();
});
// function for 'more' in hot part
(function(){
	window.load_more_notes = function(_e, postId, offset) {
		_e = _e || window.event;
		!!_e.stopPropagation ? _e.stopPropagation() : _e.cancelBubble = true;
		!!_e.preventDefault ? _e.preventDefault(): _e.returnValue = false;
		var more = document.getElementById('more_notes_' + offset);
		var loading = document.getElementById('notes_loading_' + offset);
		more.style.display = 'none';
		loading.style.display = 'block';
		if(window.ActiveXObject) {
			var req = new ActiveXObject('Microsoft.XMLHTTP');
		} else if (window.XMLHttpRequest) {
			var req = new XMLHttpRequest();
		} else {
			return;
		}
		req.onreadystatechange=function(){
			if (req.readyState==4) {
				var loading = document.getElementById('notes_loading_' + offset);
				var notes_html=req.responseText;
				if (!!window.more_notes_loaded) {
					more_notes_loaded(notes_html);
				}
				var more_notes_link=document.getElementById('more_notes_' + offset);
				var notes=more_notes_link.parentNode;
				notes.removeChild(more_notes_link);
				notes.removeChild(loading);
				notes.innerHTML = notes.innerHTML + notes_html;
			}
		};
		req.open('GET', 'http://' + location.host + '/morenotes?postid='+postId+'&offset='+offset,true);
		req.send();
	};
})();