function logged(req, res) {
	if (!req.session.user) {
		res.send(`
		<script>
			alert("Você precisa fazer login para acessar essa pagina");
			window.location.href = "/";
		</script>
		`);
		return false;
	}
	return true;
}

export default logged