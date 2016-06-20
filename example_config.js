module.exports = {
    server_root: process.env.HOME + '/gateway-root',
    public_html: "public_html",
    app_dir: "apps",
    app_root: "/alexa/",
    port: 8080,
    log: true,
    httpsPort: 4343,
    httpsEnabled: true,
    privateKey: 'self-signed-ssl.key',
    certificate: 'self-signed-ssl.pem'
}
