({
    appDir: "../",
    baseUrl: "scripts",
    dir: "../../webapp-build",
    paths: {
        "jquery": "require-jquery"
    },
    modules: [
        {
            name: "main",
            exclude: ["jquery"]
        }
    ]
})

