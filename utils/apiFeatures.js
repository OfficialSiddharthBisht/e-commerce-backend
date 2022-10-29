class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search Feature
    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex:this.queryStr.keyword,
                $options : "i", //Case insensitive M and m are same 
            }
        } : {};
        
        this.query = this.query.find({...keyword});
        return this;
    }

    // filter feature
    filter(){
        // const queryCopy = this.queryStr 
        // this will take the exact reference , changing one will change the other too, so we will use spread operator
        const queryCopy = {...this.queryStr};
        console.log("before ",queryCopy);
        // Removing some fields for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=> delete queryCopy[key]);
        console.log("after ",queryCopy);
        
        this.query = this.query.find(queryCopy);
        return this;
    }
    // categories can be case sensitive cauz user will not search for the category he/she will choose from the given ones
}

module.exports = ApiFeatures;