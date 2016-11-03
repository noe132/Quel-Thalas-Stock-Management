var packinglisttemplate = $('#packinglisttemplate').html();
var packinglistrowtemplate = $('#packinglistrowtemplate').html();

$.ajax({
	method: 'POST',
	url: '/getpackinglist',
	timeout: 10000,
	success: function(data, status, jqXHR) {
		if (data.status === 0) {
			for (x of data.packinglist) {
				$('.packinglistbox').append($(renderTemplate(x)));
			}
		} else {
			alert('系统错误，请联系管理员！');
		}
	},
	error: function(jqXHR, status, err) {
		alert('网络错误，请刷新页面！');
		console.log(err)
	}
});

function renderTemplate(result) {
	var content = '';
	var totalvalue = 0;
	for (i in result.content) {
		var x = result.content[i];
		content += renderContentTemplate(x);
		totalvalue += x.cargovalue * x.amount;
	}
	var string = [
		['${packinglistid}', result.listid],
		['${packinglisttype}', result.listtype === 1 ? '出库单' : '入库单'],
		['${packinglistdate}', result.listdate],
		['${packinglistoperator}', result.listoperator],
		['${packinglistremark}', result.listremark],
		['${packinglistcontent}', content],
		['${packinglisttotalvalue}', totalvalue],
	].reduce(function(p, c, i, a) {
		return p.replace(c[0], c[1]);
	}, packinglisttemplate);
	return string;
}

function renderContentTemplate(result) {
	return [
		['${cargoid}', result.cargoid],
		['${cargoname}', result.cargoname],
		['${cargovalue}', result.cargovalue],
		['${cargoamount}', result.amount]
	].reduce(function(p, c, i, a) {
		return p.replace(c[0], c[1]);
	}, packinglistrowtemplate);
}