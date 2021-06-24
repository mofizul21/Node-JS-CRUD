const axios = require('axios');

exports.homeRoutes = (req, res) => {

    axios.get(`${process.env.SITE_URI}/employee`)
        .then(function(employeesData){
            res.render('index', {
                employess: employeesData.data,
            });
        })
        .catch(err => {
            res.send(err)
        })

    // res.render('index', {
    //     name: 'Some'
    // });
}

exports.edit_employee = (req, res) => {
    axios.get(`${process.env.SITE_URI}/employee`, {
        params: {
            id: req.query.id
        }
    })
    .then(function(employeeData){
        res.render('edit_employee', {
            employee: employeeData.data,
        });
    })
    .catch(err => {
        res.send(err)
    })
};

