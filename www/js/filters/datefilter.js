app.filter('dateFilter', function () {
    return function (input) {
        var d = moment.duration(input, 'seconds');
        var res = moment.utc(d.asMilliseconds()).format("HH:mm:ss");
        return res;
    };
});
