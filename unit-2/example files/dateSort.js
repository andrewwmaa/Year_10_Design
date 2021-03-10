var array = [{id: 1, date:'Mar 12 2012 10:00:00 AM'}, {id: 2, date:'Mar 8 2012 08:00:00 AM'}];


array.sort(function(a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return c-d;
});