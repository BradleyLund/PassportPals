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


//virtual for the individual country url to display each countries data individually
CountrySchema
.virtual('url')
.get(function() {
    return '/individualCountry/'+this.origin_name //hopefully this works, might be issue with spaces in names
})

//export the model
module.exports = mongoose.model('Country',CountrySchema)