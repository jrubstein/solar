const { FuseBox, QuantumPlugin, WebIndexPlugin } = require("fuse-box/es6");
const { src, task, context } = require("fuse-box/sparky");
const { htmlTemplate } = require("./template")

context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "..",
            output: "dist/assets/$name.js",
            target : "browser@es6",
            hash: this.isProduction,
            log: !this.isProduction,
            sourceMaps: !this.isProduction,
            useTypescriptCompiler : true,
            plugins: [
                WebIndexPlugin({path: ".", templateString: htmlTemplate(process.env), resolve: output => `/${output.lastPrimaryOutput.filename}`,}),
                this.isProduction && QuantumPlugin({
                    uglify: true,
                    treeshake: true,
                    extendServerImport: true,
                })
            ],
            alias: {
                'celestial/comet': "~/comet",
            }
        })
    }
    createVendor(fuse) {
        const vendor = fuse.bundle("vendor")
        vendor.instructions("~ mercury/src/application/Bootstrap.tsx")
        return vendor
    }
    createBundle(fuse) {
        const app = fuse.bundle("app");
        if (!this.isProduction) {
            // app.hmr().watch()
        }
        app.instructions("!> [mercury/src/application/Bootstrap.tsx]");
        return app;
    }
});

task("clean", () => src("mercury/dist/assets").clean("mercury/dist/assets").exec() )

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

