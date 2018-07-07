var jwt = require('jsonwebtoken');

exports.apiError = (res,error,status) => {
    console.log((error.stack)?error.stack:error);
    res.status(status || 500)
    if(process.env.NODE_ENV !== "production"){
        res.send(error);
    }else{
        // Not to show error on production
        res.send("Something went worng");
    }
}

exports.getMode = (array) => {
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}