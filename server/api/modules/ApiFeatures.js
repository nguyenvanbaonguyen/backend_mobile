class APIFeatures {
    constructor(query, queryReq, elasticFields) {
        this.query = query;
        this.queryReq = queryReq;
        this.elasticFields = elasticFields;
    }

    filter() {
        const queryObj = { ...this.queryReq };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/(\b(gte|gt|lte|lt)\b)/g, (match) => `$${match}`);
        queryStr = JSON.parse(queryStr);
        if (this.elasticFields && Array.isArray(this.elasticFields)) {
            Object.entries(queryStr).forEach(([key, value]) => {
                if (typeof value === "string" && this.elasticFields.include(key)) queryStr[key] = new RegExp(value);
            });
        }
        this.query = this.query.find(queryStr);
        return this;
    }

    sort() {
        if (this.queryReq?.sort) {
            const sortBy = this.queryReq?.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }

    limitFields() {
        // if (this.queryReq?.fields) {
        //   const fields = this.queryReq.fields.split(",").join(" ");
        //   this.query = this.query.select(fields);
        // }
        return this;
    }

    paginate() {
        const page = this.queryReq?.page * 1 || 1;
        const limit = this.queryReq?.limit * 1 || this.limit || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    all() {
        return this.paginate().filter().sort().limitFields();
    }

    setLimit(limit) {
        this.limit = limit;
        return this;
    }
}

module.exports = APIFeatures;
