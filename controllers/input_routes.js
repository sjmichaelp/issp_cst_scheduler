const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
    parse
} = require("querystring");
const db_functions = require('../db_functions.js');

router.post("/addSite", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});



router.post("/addNewLearner", (request, response) => {
    db_functions.insertGeneralData(request.body, 'learner').then((result) => {
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });

    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })
});

router.post("/add_learner_to_courses", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });

    var tablename = 'classroomcourserecord';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })
});

router.post('/insertClassroom', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'classroom';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});


router.post('/insertClassroom', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'classroom';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {});
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })
});


router.post('/insertInstructor', (request, response) => {

    console.log("Request.body :", request.body);
    if (request.body.courses) {
        db_functions.insertInstructor(request.body).then(() => {

            db_functions.insertInstructorCourses(request.body).then((result) => {
                console.log("verify_status", result);
                response.render('ba_admin.hbs', {
                    databaseConfirmation: true
                });
            }).catch((error) => {
                console.log(error);
                response.render('ba_admin.hbs', {
                    databaseError: true
                });
            })
        })
            .catch((error) => {
                console.log(error);
                response.render('ba_admin.hbs', {
                    databaseError: true
                });
            })

    } else {

        db_functions.insertInstructor(request.body).then((result) => {
            console.log("verify_status", result);
            response.render('ba_admin.hbs', {
                databaseError: true
            });
        }).catch((error) => {
            console.log(error);
            response.render('ba_admin.hbs', {
                databaseError: true
            });
        })
    }

});

router.post('/insertInstructorVacations', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'InstructorVacations';

    db_functions.insertInstructorDays(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {});
    }).catch(error => console.log('add instructor vacations error ', error))

});

router.post('/insertInstructorLeaves', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'Instructorleaves';

    db_functions.insertInstructorDays(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {});
    }).catch(error => console.log('add instructor vacations error ', error))

});

router.post('/insertInstructorOfficeDays', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'Instructorofficedays';

    db_functions.insertInstructorDays(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {});
    }).catch(error => console.log('add instructor vacations error ', error))

});

router.post('/showInstructorsOnDay', (request, response) => {

    console.log("Request.body :", request.body);

    db_functions.get_all_instructors_teaching_day(request.body.searchInstructorsOnDay).then((result) => {
        console.log("verify_status", result);

        response.render('./inputs/show_instructors_on_day.hbs', {
            instructorlist: result,
            loggedIn: request.session.loggedIn,
            user: 'temp'
        });
    }).catch(error => console.log('add instructor vacations error ', error))

});

router.post('/addCourseType', (request, response) => {
    var tablename = 'coursetype';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/addKLR', (request, response) => {
    var tablename = 'KLR';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/editKLR', (request, response) => {
    var tablename = 'KLR';

    db_functions.updateGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/deleteKLR', (request, response) => {
    var tablename = 'KLR';

    db_functions.deleteGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/addKLR_with_CategoryName', (request, response) => {
    var tablename = 'courseTypesAvailableKLRs';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});


router.post('/addKLR_with_instructors', (request, response) => {
    var tablename = 'instructorcourses';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/assignInstructor', (request, response) => {
    db_functions.assign_instructor_session(request.body).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/assignLearner', (request, response) => {
    db_functions.assign_learner_session(request.body).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/edit_learner', (request, response) => {
    db_functions.getEditLearner(request.body).then((result) => {
    response.render('./inputs/edit_learner.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp',
        learner_list: result
        });
    });
});

router.post("/editLearnerInfo", (request, response) => {
    db_functions.updateGeneralData(request.body, 'learner').then((result) => {
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });

    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })
});

module.exports = router;
