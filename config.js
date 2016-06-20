module.exports = {
    server_root: process.env.HOME + '/gateway-root',
    public_html: "public_html",
    app_dir: "apps",
    app_root: "/alexa/",
    port: 43894,
    log: true,
    httpsPort: 43893,
    httpsEnabled: true,
    privateKey: 'self-signed-ssl.key',
    certificate: 'self-signed-ssl.pem'
}
