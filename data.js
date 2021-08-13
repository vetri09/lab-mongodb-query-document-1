// Lab Query document 1
// 1 - get company named Babelgum
db.companies.find({name:"Babelgum"}).pretty()
// get first company
db.companies.find().limit(1).pretty()
// 2
// display only company names
db.companies.find({},{name:1})
// name and no. of employees
db.companies.find({},{name:1,number_of_employees:1})
// limit to 10
db.companies.find({},{name:1,number_of_employees:1}).limit(10)
// ascending order 
db.companies.find({number_of_employees:{$gt:5000}},{name:1, number_of_employees:1}).sort({number_of_employees:1}).limit(5).pretty()
// 3
// founded at 2000 and above
db.companies.find({founded_year:{$gte:2000}},{name:1, founded_year:1}).sort({founded_year:1}).limit(5).pretty()
// founded at 2500 and below
db.companies.find({founded_year:{$lte:2500}},{name:1, founded_year:1}).sort({founded_year:1}).limit(5).pretty()
// founded between 2000 and 2500 using gte and lte
db.companies.find({founded_year:{$gte:2000, $lte:2500}},{name:1, founded_year:1}).sort({founded_year:1}).pretty()
// using $and operator
// db.companies.find({$and:[{founded_year:2000}, {founded_year:2500}]},{name:1, founded_year:1}).sort({founded_year:1}).pretty()
db.companies.find({$and:[{founded_year:{$gte:2000}},{founded_year:{$lte:2005}}]},{name:1,founded_year:1}).sort({founded_year:-1}).pretty()
// 4
db.companies.find(
    {'ipo.valuation_amount':{$gte: 100000000},
    founded_year:{$lt:2010}},
    {name:1, ipo:1}
)
// 5 
// All the companies that have less than 1000 employees and have been founded before 2005. 
// Order them by the number of employees and limit the search to 10 companies.
db.companies.find(
    {
        number_of_employees:{$lt:1000},
        founded_year:{$lt:2005}
    },
    {
        name:1,
        number_of_employees:1,
        founded_year:1
    }
).sort({number_of_employees:1}).limit(10)
// 6 - All the companies that don't include the partners field.
db.companies.find(
    {},
    {
        partners:null,
        name:1
    }
)
// 7 - All the companies that have a null type of value on the category_code field.
db.companies.find(
    {},
    {
        category_code :null,
        name:1
    }
)
// 8 - All the companies that have at least 100 employees but less than 1000. 
// Retrieve only the name and number of employees fields.
db.companies.find({$and:[{number_of_employees:{$gte:100}}, {number_of_employees:{$lt:1000}}]},{name:1,number_of_employees:1})
// 9 - Order all the companies by their IPO price in descending order.
db.companies.find({'ipo.valuation_amount':{$gte:0}},{'ipo.valuation_amount':1}).sort({'ipo.valuation_amount':-1})
// 10 - Retrieve the ten companies with most employees, order by the number of employees
db.companies.find({},{name:1,number_of_employees:1}).sort({number_of_employees:-1}).limit(10)
// 11 - All the companies founded in the second semester of the year. Limit your search to 1000 companies.
// idk
// 12 - All the companies founded before 2000 that have an acquisition amount of more than 10.000.000
db.companies.find({founded_year:{$lt:2000},'acquisition.price_amount':{$gt:10000000}},{name:1,'acquisition.price_amount':1})
// 13 - All the companies that have been acquired after 2010, order by the acquisition amount, 
// and retrieve only their name and acquisition field.
db.companies.find({'acquisition.acquired_year':{$gt:2010}},{name:1,'acquisition.acquiring_company.name':1})
// 14 - Order the companies by their founded year, retrieving only their name and founded year.
db.companies.find({},{name:1,founded_year:1}).sort({founded_year:1})
// 15 - All the companies that have been founded on the first seven days of the month, including the seventh.
// Sort them by their acquisition price in descending order. Limit the search to 10 documents.
db.companies.find({founded_day:{$lte:7}},{name:1,founded_day:1}).sort({'acquisition.price_amount':-1}).limit(10)
// 16 - All the companies on the 'web' category that have more than 4000 employees.
// Sort them by the number of employees in ascending order.
db.companies.find({category_code:"web", number_of_employees:{$gt:4000}},{name:1,number_of_employees:1,category_code:1}).sort({number_of_employees:1})
// 17 - All the companies whose acquisition amount is more than 10.000.000 and the currency is 'EUR'.
db.companies.find(
    {'acquisition.price_amount':{$gt:10000000},'acquisition.price_currency_code':'EUR'},
    {name:1,'acquisition.price_amount':1,'acquisition.price_currency_code':1}
)
// 18 - All the companies that have been acquired in the first trimester of the year. Limit the search to 10 companies,
// and retrieve only their name and acquisition fields.
// idk
// 19 - All the companies that have been founded between 2000 and 2010, but have not been acquired before 2011
db.companies.find(
    {
        $and:[{founded_year:{$gte:2000}},{founded_year:{$lte:2010}}],
        'acquisition.acquired_year':{$gt:2011}
    },
    {name:1,founded_year:1,'acquisition.acquired_year':1}
)
// 11 and 18 IDK 
// in document - 2.... 6 IDK

// Lab Query document - 2
// db.companies.find(query, projection)
// 1 - Find all the companies that include 'Facebook' on the name field.
db.companies.find({name:'Facebook'},{name:1})
// 2 - Find all the companies which category_code is 'web'. Retrive only their name field
//   _id:0 in projection, removes the object from all displaying documents
db.companies.find({category_code: 'web'},{name: 1, _id: 0})
// 3 - Find all the companies named "Twitter", and retrieve only their name, category_code and founded_year fields
db.companies.find({name: 'Twitter'},{name: 1, _id: 0,category_code:1,founded_year:1})
// 4 - Find all the companies who have web as their category_code, but limit the search to 50 companies
db.companies.find({category_code: 'web'},{name: 1, _id: 0}).limit(50)
// 5 - Find all the companies which category_code is 'enterprise' and have been founded in 2005. 
// Retrieve only the name, category_code and founded_year fields.
db.companies.find({category_code:'enterprise',founded_year:2005},{name:1,_id:0,category_code:1,founded_year:1})
// 6 - Find all the companies that have been founded on the 2000 or have 20 employees.
// Sort them descendingly by their number_of_employees.
// idk its correct
db.companies.find({$or:[{founded_year:2000},{number_of_employees:20}]},{name:1,_id:0,founded_year:1,number_of_employees:1}).sort({number_of_employees:-1})
// 7 - Find all the companies that do not include web nor social on their category_code. 
// Limit the search to 20 documents and retrieve only their name and category_code.
db.companies.find({$and:[{category_code:{$ne:'web'}},{category_code:{$ne:'social'}}]},{name:1,category_code:1,_id:0}).limit(20)
// 8 - Find all the companies that were not founded on 'June'. Skip the first 50 results
// retrieve only the founded_month and name fields.
db.companies.find({founded_month:{$ne:"June"}},{name:1,_id:0,founded_month:1}).skip(50)
// 9 - Find all the companies that have 50 employees, but do not correspond to the 'web' category_code.
db.companies.find({number_of_employees:50,category_code:{$ne:'web'}},{name:1,_id:0,category_code:1,number_of_employees:1})
// 10 - Find all the companies that have been founded on the 1st of the month,
// but does not have either 50 employees nor 'web' as their category_code.
// Retrieve only the founded_day and name and limit the search to 5 documents.
db.companies.find(
    {founded_day:1,number_of_employees:{$ne:50},category_code:{$ne:'web'}},
    {name:1,_id:0,founded_day:1,number_of_employees:1,category_code:1}).limit(5)
// 11 - Find all the companies which the price_amount of the acquisition was 40.000.000. Sort them by name.
db.companies.find({'acquisition.price_amount':40000000},{name:1,_id:0,'acquisition.price_amount':1})
// 12 - Find all the companies that have been acquired on January of 2014. Retrieve only the acquisition and name fields.
db.companies.find({'acquisition.acquired_year':2014,'acquisition.acquired_month':1},{name:1,_id:0,'acquisition':1})