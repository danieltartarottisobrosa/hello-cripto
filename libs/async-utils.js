
function run(fn) {
    fn().then(ret => process.exit(ret))
}

module.exports = {
    run
}