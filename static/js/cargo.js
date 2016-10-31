var cargotemplate = $('#cargotemplate').html();
$.ajax({
	method: 'POST',
	url: '/getcargo',
	timeout: 10000,
	success: function(data, status, jqXHR) {
		if (data.status === 0) {
			for (x of data.cargo) {
				$('.cargobox').append($(renderTemplate(x)));
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
	return [
		['${cargoid}', result.cargoid],
		['${cargoname}', result.cargoname],
		['${cargovalue}', result.cargovalue]
	].reduce(function(p, c, i, a) {
		return p.replace(c[0], c[1]);
	}, cargotemplate);
}

$('#add-new-cargo').click(function() {
	$($('#cargonewtemplate').html()).insertAfter($('.cargo-header'));
});

$('.cargobox').on('click', '.cargooperation-edit', function(e) {
	var cargo = $(e.currentTarget).parent().parent();
	cargo.addClass('editing');
	$(e.currentTarget).text('保存');
	$(e.currentTarget).addClass('cargooperation-save').removeClass('cargooperation-edit');
	cargo.find('.editable').attr('contenteditable', 'true');
});

$('.cargobox').on('click', '.cargooperation-save', function(e) {
	var cargo = $(e.currentTarget).parent().parent();

	$.ajax({
		method: 'POST',
		url: '/editcargo',
		timeout: 10000,
		data: {
			cargoid: cargo.find('.cargoid > span').text(),
			cargoname: cargo.find('.cargoname > span').text(),
			cargovalue: cargo.find('.cargovalue-value').text()
		}, 
		success: function(data, status, jqXHR) {
			cargo.removeClass('editing');
			$(e.currentTarget).text('编辑');
			$(e.currentTarget).addClass('cargooperation-edit').removeClass('cargooperation-save');
			cargo.find('.editable').removeAttr('contenteditable');
		},
		error: function(jqXHR, status, err) {
			alert('网络错误，请刷新页面！');
			console.log(err)
		}
	});
});

$('.cargobox').on('click', '.cargooperation-delete', function(e) {
	var cargo = $(e.currentTarget).parent().parent();
	var id = cargo.find('.cargoid > span').text();
	$.ajax({
		method: 'POST',
		url: '/removecargo',
		timeout: 10000,
		data: {
			cargoid: cargo.find('.cargoid > span').text()
		}, 
		success: function(data, status, jqXHR) {
			cargo.remove
		},
		error: function(jqXHR, status, err) {
			alert('网络错误，请刷新页面！');
			console.log(err)
		}
	});
});


$('.cargobox').on('click', '.cargooperation-save-new', function(e) {
	var cargo = $(e.currentTarget).parent().parent();
	cargo.addClass('editing');
	$(e.currentTarget).text('保存');
	$(e.currentTarget).addClass('cargooperation-save').removeClass('cargooperation-edit');
	cargo.find('.editable').attr('contenteditable', 'true');
});

$('.cargobox').on('click', '.cargooperation-delete-new', function(e) {
	var cargo = $(e.currentTarget).parent().parent();
	cargo.remove();
});