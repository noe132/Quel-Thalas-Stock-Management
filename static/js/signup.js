$('#username').focus();
var signupTimeout;
$('#signup-form').on('submit', function(event) {
	event.preventDefault();
	var username = $('#username').val();
	var password = $('#password').val();
	var password_confirm = $('#password_confirm').val();

	var isValid = false;
	if (username === '' || password === '') {
		$('#info').text('用户名或密码不能为空！');
	} else if (password_confirm === '') {
		$('#info').text('请输入确认密码！');
	} else if (password_confirm !== password) {
		$('#info').text('两次输入的密码不一致！');
	} else if (!username.match(/[a-zA-Z][a-zA-Z0-9_]{2,31}/)) {
		$('#info').text('用户名不合法！（只能以字母开头，包含字母数字下划线，3-32位）');
	} else if (!password.match(/[a-zA-Z][a-zA-Z0-9_]{2,31}/)) {
		$('#info').text('密码不合法！（只能以字母开头，包含字母数字下划线，3-32位）');
	} else {
		$('#info').text('');
		isValid = true;
	}
	if (!isValid) {
		return;
	}
	
	signupTimeout = setTimeout(() => {
		$('#info').text('注册中...');
	}, 3000);

	$.ajax({
		method: 'POST',
		url: '/signup',
		timeout: 10000,
		data: {
			username: username,
			password: password
		},
		success: function(data, status, jqXHR) {
			clearTimeout(signupTimeout);
			if (data.status === 0) {
				$('#info').text(data.message);
			} else {
				$('#info').text(data.message);
			}
		},
		error: function(jqXHR, status, err) {
			clearTimeout(signupTimeout);
			$('#info').text('网络错误！');
			console.log(err)
		}
	})
});