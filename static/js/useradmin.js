var usertemplate = $('#usertemplate').html();
$.ajax({
	method: 'POST',
	url: '/getalluser',
	timeout: 10000,
	success: function(data, status, jqXHR) {
		if (data.status === 0) {
			for (x of data.users) {
				$('.userbox').append($(renderTemplate(x)));
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
		['${uid}', result.uid],
		['${username}', result.username]
	].reduce(function(p, c, i, a) {
		return p.replace(c[0], c[1]);
	}, usertemplate);
}

$('#add-new-user').click(function() {
	$($('#usernewtemplate').html()).insertAfter($('.user-header'));
});

$('.userbox').on('click', '.useroperation-edit', function(e) {
	var user = $(e.currentTarget).parent().parent();
	var uid = user.find('.uid > span').text();
	var password = prompt('请输入密码');
	if (password !== null) {
		$.ajax({
			method: 'POST',
			url: '/resetpassword',
			timeout: 10000,
			data: {
				uid: uid,
				password: password
			},
			success: function(data, status, jqXHR) {
				alert('重置成功！')
			},
			error: function(jqXHR, status, err) {
				alert('网络错误，请刷新页面！');
				console.log(err)
			}
		});
	}
});

$('.userbox').on('click', '.useroperation-delete', function(e) {
	var user = $(e.currentTarget).parent().parent();
	var uid = user.find('.uid > span').text();
	var confirmed = confirm('确认删除用户？');
	if (confirmed) {
		$.ajax({
			method: 'POST',
			url: '/deleteuser',
			timeout: 10000,
			data: {
				uid: uid
			},
			success: function(data, status, jqXHR) {
				alert('删除成功！');
				user.remove();
			},
			error: function(jqXHR, status, err) {
				alert('网络错误，请刷新页面！');
				console.log(err)
			}
		});
	}
});
