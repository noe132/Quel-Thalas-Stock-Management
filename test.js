Promise.all((() => {
	var arr = [];
	[1, 2, 3].forEach(function(v, i, a) {
		arr.push(new Promise(function(rs_all, rj_all) {
			rs_all(v);
		}));
	});
	return arr;
})()).then((m) => {
	console.log(m);
}, (e) => {
	console.log(e);
});