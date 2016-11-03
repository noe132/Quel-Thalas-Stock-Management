var selectrowtemplate = $('#select-row-template').html();
var rowtemplate = $('#row-template').html();

var cargo;
var seq = new Promise(function(rs, rj) {
	$.ajax({
		method: 'POST',
		url: '/getcargo',
		timeout: 10000,
		success: function(data, status, jqXHR) {
			if (data.status === 0) {
				// cargo = data.cargo;
				for (x in data.cargo) {
					$('.cargo-select-box-select').append($(rendercargoselectrow(data.cargo[x])));
				}
				rs();
			} else {
				rj('系统错误，请联系管理员！');
			}
		},
		error: function(jqXHR, status, err) {
			console.log(err);
			rj('网络错误，请刷新页面！');
		}
	});
}).then(function(message) {
	return new Promise(function(rs, rj) {
		// bind event
		var currentSelectRow;

		// select box display
		$('.packinglistbox').on('click', '.cargo-select', function(e) {
			if ($(e.currentTarget).parent().is(currentSelectRow)) {
				$('.cargo-select-box').toggle();
			} else {
				$('.cargo-select-box').show();
				$('.cargo-select-box-search > input').val('');
				$('.cargo-select-box-row').show();
			}
			currentSelectRow = $(e.currentTarget).parent();
			e.stopPropagation();
		});

		// cancel select box
		$(document.body).on('click', function(e) {
			var element = $(e.target);
			var flag = true;
			while (element.length) {
				if (element.is($('.cargo-select-box')) || element.is($('.cargo-select'))) {
					flag = false;
					break;
				}
				element = element.parent();
			}
			if (flag) {
				$('.cargo-select-box').hide();
			}
		});

		// select cargo
		$('.cargo-select-box').on('click', '.cargo-select-box-row', function(e) {
			var id = $(e.currentTarget).find('.cargo-select-box-row-id').text();
			var name = $(e.currentTarget).find('.cargo-select-box-row-name').text();
			var value = $(e.currentTarget).find('.cargo-select-box-row-value').text().slice(1);
			if (currentSelectRow) {
				currentSelectRow.find('.cargoid > span').text(id);
				currentSelectRow.find('.cargoname > span').text(name);
				currentSelectRow.find('.cargovalue > .cargovalue-value').text(value);
				currentSelectRow.find('.cargoamount > span').text(1);
			}
			$('.cargo-select-box').hide();
			recaculateTotalValue();
		});

		// delete row
		$('.packinglistbox').on('click', '.cargo-delete', function(e) {
			$(e.currentTarget).parent().parent().remove();
			recaculateTotalValue();
		});

		// new row
		$('.packinglistbox').on('click', '.packinglist-row-new', function() {
			$(rowtemplate).insertBefore($('.packinglist-row-new'));
		});

		// filter
		$('.cargo-select-box-search > input').on('change keydown keyup', function(e) {
			var string = e.currentTarget.value;
			$('.cargo-select-box-row').each(function(i, e) {
				if ($(e).find('.cargo-select-box-row-id').text().indexOf(string) !== -1 ||
					$(e).find('.cargo-select-box-row-name').text().indexOf(string) !== -1) {
					$(e).show();
				} else {
					$(e).hide();
				}
			});
		});

		// update amount
		$('.packinglistbox').on('keydown keyup', '.cargoamount > span', function() {
			// $(rowtemplate).insertBefore($('.packinglist-row-new'));
			recaculateTotalValue();
		});

		$('#submit').click(function(e) {
			var data = {
				listtype: 0,
				listremark: $('.packinglist-remark > span').text().trim(),
				data: []
			};
			if (!recaculateTotalValue()) {
				return;
			}
			$('.packinglist-row:not(.packinglist-row-header)').each(function(i, e) {
				data.data.push({
					id: $(e).find('.cargoid > span').text(),
					amount: $(e).find('.cargoamount > span').text()
				});
			});

			$.ajax({
				method: 'POST',
				url: '/addpackinglist',
				timeout: 10000,
				data: encodeURIComponent(JSON.stringify(data)),
				success: function(data, status, jqXHR) {
					if (data.status === 0) {
						window.location.href = '/packinglist';
					}
				},
				error: function(jqXHR, status, err) {
					alert('网络错误，请刷新页面！');
				}
			});
		});
	});
}).catch(function(message) {
	alert(message);
});


function rendercargoselectrow(result) {
	return [
		['${cargoid}', result.cargoid],
		['${cargoname}', result.cargoname],
		['${cargovalue}', result.cargovalue]
	].reduce(function(p, c, i, a) {
		return p.replace(c[0], c[1]);
	}, selectrowtemplate);
}

function recaculateTotalValue() {
	var v = 0;
	var invalid = false;
	$('.packinglist-row:not(.packinglist-row-header)').each(function(i, e) {
		if ($(e).find('.cargoid > span').text() === '0') {
			return;
		}

		var value = Number($(e).find('.cargovalue > .cargovalue-value').text());
		var amount = Number($(e).find('.cargoamount > span').text());

		if (!(isNaN(amount)) && amount === Number(amount.toFixed(0)) && amount >= 1) {
			$(e).find('.cargoamount > span').removeClass('invalid');
		} else {
			$(e).find('.cargoamount > span').addClass('invalid');
			invalid = true;
		}
		v += value * amount;
	});
	if (invalid) {
		$('.packinglist-totalvalue > .cargovalue-value').text('请检查错误！');
	} else {
		$('.packinglist-totalvalue > .cargovalue-value').text(v);
	}
	return !invalid;
}