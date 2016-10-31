$('#username').focus();
var loginTimeout;
$('#login-form').on('submit', function(event) {
	event.preventDefault();
	var username = $('#username').val();
	var password = $('#password').val();

	if (username === '' || password === '') {
		$('#info').text('用户名或密码不能为空！');
		return;
	} else {
		$('#info').text('');
	}

	loginTimeout = setTimeout(() => {
		$('#info').text('登录中...');
	}, 3000);

	$.ajax({
		method: 'POST',
		url: '/login',
		timeout: 10000,
		data: {
			username: username,
			password: password
		},
		success: function(data, status, jqXHR) {
			clearTimeout(loginTimeout);
			if (data.status === 0) {
				$('#info').text(data.message);
				window.location.href = '/';
			} else {
				$('#info').text(data.message);
			}
		},
		error: function(jqXHR, status, err) {
			clearTimeout(loginTimeout);
			$('#info').text('网络错误！');
			console.log(err)
		}
	});
});