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
}

module.exports = ApiFeatures;