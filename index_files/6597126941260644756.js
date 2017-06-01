/* @script.js文件 */
$(document).ready(function () {
	// layout 
	if ($.browser.msie && $.browser.version === '6.0') {
		// logo
		if (IsLogo) {
			if ($('.m-cstmttl img').width() > 500) {
				$('.m-cstmttl img').width('500px');
			}
			$('.m-cstmttl').css('visibility', 'visible');
		}
	}
	
	// search
	bindSchEvents($('#j-lnksch'), $('#j-schform .txt'));
});
function bindSchEvents($lnk, $txt){
	$lnk.bind('click', function () {
		$(this).addClass('f-hidden').parent().addClass('m-schshow');
		setTimeout(function () {
			$txt.focus();
		}, 300);
		return false;
	});
	$txt.bind('blur', function () {
		//setTimeout(function () {
			$lnk.removeClass('f-hidden').parent().removeClass('m-schshow');
		//}, 300);
		return false;
	});
}