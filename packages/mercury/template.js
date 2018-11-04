module.exports = {
    htmlTemplate: function(env) {
        return  `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <title>Celestial bodies</title>
        </head>
        <body data-api-url="${env.API_LAYER_URL || 'http://localhost:3000'}" data-port="${env.PORT | '3000'}">
            <noscript>Please enable your JS.</noscript>
            <main id="main-container">
            </main>
        </body>
        $bundles
        </html>
        `
    }
}