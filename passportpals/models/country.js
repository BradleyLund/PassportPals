var mongoose = require('mongoose')

var Schema = mongoose.Schema

var CountrySchema = new Schema(
    {
        origin_name: {type: String, required: true},
        visa_required: [{type: String}],
        no_visa_required: [{type: String}],
        eVisa:[{type:String}],
        visa_on_arrival: [{type:String}],
        other: [{type: String}]
    }
)