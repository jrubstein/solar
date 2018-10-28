const { FuseBox, QuantumPlugin, WebIndexPlugin } = require("fuse-box/es6");
const { src, task, context } = require("fuse-box/sparky");

const htmlTemplate = () => `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Celestial bodies</title>
</head>
<body>
    <noscript>Please enable your JS.</noscript>
    <main id="main-container">
    </main>
</body>
$bundles
</html>
`

context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/assets/$name.js",
            target : "browser@es5",
            hash: this.isProduction,
            sourceMaps: !this.isProduction,
            useTypescriptCompiler : true,
            plugins: [
                WebIndexPlugin({path: ".", templateString: htmlTemplate(), resolve: output => `/${output.lastPrimaryOutput.filename}`,}),
                this.isProduction && QuantumPlugin({
                    uglify: true,
                    treeshake: true,
                    extendServerImport: true,
                })
            ]
        })
    }
    createVendor(fuse) {
        const vendor = fuse.bundle("vendor")
        if (!this.isProduction) {
            vendor.watch()
            vendor.hmr()
        }
        vendor.instructions("~ application/Bootstrap.tsx")
        return vendor
    }
    createBundle(fuse) {
        const app = fuse.bundle("app");
        if (!this.isProduction) {
            app.watch()
            app.hmr()
        }
        app.instructions("!> [application/Bootstrap.tsx]");
        return app;
    }
});

task("clean", () => src("dist/assets").clean("dist/assets").exec() )

task("default", ["clean"], async context => {
    const fuse = context.getConfig();
    fuse.dev();
    context.createVendor(fuse);
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["clean"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    context.createVendor(fuse);
    context.createBundle(fuse);
    await fuse.run();
});

