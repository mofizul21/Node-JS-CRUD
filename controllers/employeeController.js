const Employeedb = require('../models/employee');

// create new user
exports.create = (req, res) => {
    // Prevent empty value
    if (!req.body) {
        res.status(500).send({
            message: 'Empty data to save!',
        });
    }

    const employee = new Employeedb({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    });

    //employee.save(employee); // it's enough to save data into the database

    employee
        .save(employee)
        .then(data => {
            // This success message isn't displaying the frontend
            res.render('index', {
                successMessage: 'Data inserted successfully!',
            });

            res.redirect(process.env.SITE_URI); // for browser
            //res.send(data) / it's for API test            
        })
        .catch(err => {
            res.status(500).send({ 
                message: err.message || 'Error occured to save data!',
            });
        })
}

// get datas
exports.find = (req, res) => {
    const id = req.query.id;
    // get single data
    if (id) {
        Employeedb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Not found with this id ${id}`,
                    });
                } else {
                    res.send(data)
                }
            })
    } else {
        //  get multiple data
        Employeedb.find()
            .then(employees => {
                res.send(employees);
            })
            .catch(err => {
                res.status(500).send({ 
                    message: err.message || 'Error occured to save data!',
                });
            });
    }
};

// update user
exports.update = (req, res) => {
    // Prevent empty value
    if (!req.body) {
        res.status(500).send({
            message: 'Empty data to update!',
        });
    }

    // update data
    const id = req.params.id;
    Employeedb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Employee not found with this ${id}`,
                });
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ 
                message: err.message || 'Error occured to update data!',
            });
        })
};

// delete user
exports.delete = (req, res) => {
    const id = req.params.id;
    Employeedb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Employee not found with this ${id}`,
                });
            } else {
                res.send({
                    message: 'Employee deleted successfully',
                })
            }
        })
        .catch(err => {
            res.status(500).send({ 
                message: err.message || 'Error occured to update data!',
            });
        })
};