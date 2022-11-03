import express from "express"
import Task from "../models/tasks.js"
import User from "../models/users.js"
import Boq from "../models/boqs.js"

const router = express.Router()

//ADD a new Task
router.post("/addTask", isLoggedIn, async (req, res) => {
    //console.log(req)
    //console.log(req.body)
    await Task.create(req.body.taskObject).then((newTask) => {

        req.body.taskHistory.performedDate = new Date()
        req.body.taskHistory.performedBy = req.user._id

        newTask.taskHistory.push(req.body.taskHistory)

        newTask.save().then(() => {
            console.log("New task added successfully")
            //console.log(newTask)

            console.log(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))
            res.json({ msg: 'New task added successfully', variant: 'success' })
        }).catch((err) => {
            console.log("error occured during saving new task" + err)
            res.json({ msg: 'Error occured during saving new task', variant: 'danger' })
        });
    }).catch((err) => {
        console.log("Error occured during creating new task" + err)
        res.json({ msg: 'Error occured during creating new task', variant: 'danger' })
    })
})

//Read, Get all Tasks
router.get("/", isLoggedIn, async (req, res) => {

    await Task.find().then((tasks) => {
        console.log(tasks)
        res.json(tasks)
    }).catch((err) => {
        console.log("error occured during read all tasks" + err)
    })
})

//Update, Update data in a task
router.put("/update/:taskId", isLoggedIn, async (req, res) => {

    await Task.findByIdAndUpdate(req.params.taskId, req.body.taskObject).then(async (task) => {


        req.body.taskHistory.performedDate = new Date()
        req.body.taskHistory.performedBy = req.user._id

        task.taskHistory.push(req.body.taskHistory)

        if ((req.body.taskObject.taskStatus === 'BOQ submitted') || (req.body.taskObject.taskStatus === 'BOQ Verified_1') || (req.body.taskObject.taskStatus === 'BOQ Verified_2') || (req.body.taskObject.taskStatus === 'BOQ Approved') || (req.body.taskObject.taskStatus === 'BOQ Rejected')) {
            console.log(req.body)
            await Boq.create(req.body).then((newBoq) => {
                newBoq.taskRef = req.params.taskId
                newBoq.sumbittedDate = new Date()
                newBoq.sumbittedBy = req.user._id
                newBoq.totalCost = req.body.totalCost

                task.boqs.push(newBoq._id)

                //console.log(newBoq)
                newBoq.save().then(() => {
                    console.log("BOQ Saved successfully")

                }).catch((err) => {
                    console.log("error occured during BOQ saving" + err)
                    //res.json("error occured during BOQ saving")
                })
            }).catch((err) => {
                console.log("error occured during BOQ creation" + err)
                //res.json("error occured during BOQ creation")
            })
        }


        task.save().then(() => {

            console.log("Task updated successfully during Task Acceptance")

            res.json('Task updated successfully during Task Acceptance')
        }).catch((err) => {
            console.log("error occured during Task Acceptance" + err)
            res.json("error occured during Task Acceptance")
        });

    }).catch((err) => {
        console.log("error occured during updating a task" + err)
    })
})

//DELETE, Delete a task
router.delete("/delete/:taskId", checkAdminRights, async (req, res) => {

    await Task.findByIdAndDelete(req.params.taskId).then(() => {
        console.log("Task deleted successfully");
        res.json("Task deleted successfully")
    }).catch((err) => {
        console.log("error occured during deleting a task" + err)
    })

})

//Get tasks based on Company,Div,User of a task
router.get("/gettasks", isLoggedIn, async (req, res) => {
    let chartData
    switch (req.user.visbilityBasedOn) {
        case 'mobitel':
            await Task.find({}).populate(["assignedSubcon", "assignedMobitelOfficer", "boqs", "approvalPath"]).then((tasks) => {
                //console.log(tasks)
                chartData = getChartData(tasks)
                res.send({ 'tasks': tasks, 'chartData': chartData })
            }).catch((err) => {
                console.log("error occured during read mobitel company tasks" + err)
            })
            break
        case 'company':
            await Task.find({ assignedSubcon: req.user.company }).populate(["assignedSubcon", "assignedMobitelOfficer", "boqs", "approvalPath"]).then((tasks) => {
                chartData = getChartData(tasks)
                res.send({ 'tasks': tasks, 'chartData': chartData })
            }).catch((err) => {
                console.log("error occured during read subcon company tasks" + err)
            })
            break
        case 'div':
            await Task.find({ taskAssignedDiv: req.user.userDiv }).populate(["assignedSubcon", "assignedMobitelOfficer", "boqs", "approvalPath"]).then((tasks) => {
                chartData = getChartData(tasks)
                res.send({ 'tasks': tasks, 'chartData': chartData })
            }).catch((err) => {
                console.log("error occured during read specific div tasks" + err)
            })
            break
        case 'user':
            await Task.find({ assignedMobitelOfficer: req.user._id }).populate(["assignedSubcon", "assignedMobitelOfficer", "boqs", "approvalPath"]).then((tasks) => {
                chartData = getChartData(tasks)
                res.send({ 'tasks': tasks, 'chartData': chartData })
            }).catch((err) => {
                console.log("error occured during read specific user tasks" + err)
            })
            break
        case 'intermediate':
            await Task.find({ approvalPath: req.user._id }).populate(["assignedSubcon", "assignedMobitelOfficer", "boqs", "approvalPath"]).then((tasks) => {
                chartData = getChartData(tasks)
                res.send({ 'tasks': tasks, 'chartData': chartData })
            }).catch((err) => {
                console.log("error occured during read specific user tasks" + err)
            })
            break
    }

})

//Check Loging status
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash("error","You need to be logged in to do that!!!");
        console.log("You need to be logged in to do that!!,Islogin, Task Routes")
        res.json("You need to be logged in to do that!!, Islogin, Task Routes")
        //res.redirect("/login");
    }
}

//Check admin rights status
function checkAdminRights(req, res, next) {

    if (req.isAuthenticated()) {
        User.findById(req.user._id, (err, foundUser) => {
            if (err) {
                //req.flash("error", err.message);
                console.log("User not found while checking admin right " + err)
                res.json(err)
                //return res.redirect("/login");
            } else {
                if (foundUser.adminRights) {
                    next();
                } else {
                    //req.flash("error", "You don't have permission to do that, Please login from Admin acccount");
                    console.log("You don't have permission to do that, Please login from Admin acccount ")
                    res.json("You don't have permission to do that, Please login from Admin acccount" + foundUser.username)
                    //  return res.redirect("/login");
                }
            }
        });

    } else {
        //req.flash("error","You need to be logged in to do that!!!");
        console.log("You need to be logged in to do that!!, Admin Rights, Task Routes")
        res.json("You need to be logged in to do that!!, Admin Rights, Task Routes")
        //res.redirect("/login");
    }
}

function getChartData(tasks) {
    var chartData = []
    var date = new Date()
    date.setDate(date.getDate() - 30)

    for (var i = 0; i <= 30; i++) {

        chartData[i] = {
            date: date.toISOString().split('T')[0],
            taskRaised: tasks.filter((obj) => typeof obj.taskHistory.find(x => x.taskStatus === 'Subcon allocated') !== 'undefined').filter((obj) => obj.taskHistory.find(x => x.taskStatus === 'Subcon allocated').performedDate.toISOString().split('-')[1] == date.toISOString().split('T')[0]).length,
            boqSubmitted: tasks.filter((obj) => typeof obj.taskHistory.find(x => x.taskStatus === 'BOQ submitted') !== 'undefined').filter((obj) => obj.taskHistory.find(x => x.taskStatus === 'BOQ submitted').performedDate.toISOString().split('T')[0] == date.toISOString().split('T')[0]).length,
            boqApproved: tasks.filter((obj) => typeof obj.taskHistory.find(x => x.taskStatus === 'BOQ approved') !== 'undefined').filter((obj) => obj.taskHistory.find(x => x.taskStatus === 'BOQ approved').performedDate.toISOString().split('T')[0] == date.toISOString().split('T')[0]).length,
            prRaised: tasks.filter((obj) => typeof obj.taskHistory.find(x => x.taskStatus === 'PR Raised') !== 'undefined').filter((obj) => obj.taskHistory.find(x => x.taskStatus === 'PR Raised').performedDate.toISOString().split('T')[0] == date.toISOString().split('T')[0]).length


        }

        date.setDate(date.getDate() + 1)
    }
    return chartData;
}
export default router
