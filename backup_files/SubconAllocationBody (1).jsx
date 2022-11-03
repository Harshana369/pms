import React, {useState, useEffect, useCallback }  from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Form, Button, Row, Col} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function SubconAllocationBody(props) {

    let [users, setUsers] = useState([]);
    let [companies, setCompanies] = useState([]);
    let [approvalPath, setApprovalPath] = useState([]);
    let [verificationOne, setVerificationOne] = useState([]);
    let [verificationTwo, setVerificationTwo] = useState([]);
    let [approval, setApproval] = useState([]);
    
    let [form, setForm] = useState({})
    let [errors, setErrors] = useState({})
    let [open, setOpen] = useState(false);

    let setField = (field, value) => {
    setForm({
            ...form,
            [field]: value
        })
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }
    
    const findFormErrors = () => {
        const { siteID, siteName, plannedTaskStartDate, targetTaskComDate, taskAssignedDiv, assignedMobitelOfficer, workScope, assignedSubcon} = form
        const newErrors = {}
        // name errors
        if ( !siteID || siteID === '' ) newErrors.siteID = 'cannot be blank!'
        if ( !siteName || siteName === '' ) newErrors.siteName = 'cannot be blank!'
        if ( !plannedTaskStartDate || plannedTaskStartDate === '') newErrors.plannedTaskStartDate = 'cannot be blank!'
            else if(new Date(plannedTaskStartDate).getTime() <= new Date().getTime() ) newErrors.plannedTaskStartDate = 'Select a correct date!'
        if ( !targetTaskComDate || targetTaskComDate === '') newErrors.targetTaskComDate = 'cannot be blank!'
            else if((new Date(targetTaskComDate).getTime() <= new Date().getTime() )|| (new Date(targetTaskComDate).getTime() <= new Date(plannedTaskStartDate).getTime())) newErrors.targetTaskComDate = 'Select a correct date!'
        if ( !taskAssignedDiv || taskAssignedDiv === '' || taskAssignedDiv === 'Choose...') newErrors.taskAssignedDiv = 'Choose a division!'
        if ( !assignedMobitelOfficer || assignedMobitelOfficer === '' || assignedMobitelOfficer === 'Choose...') newErrors.assignedMobitelOfficer = 'Choose a Mobitel Officer!'
        if ( !workScope || workScope === '' ) newErrors.workScope = 'cannot be blank!'
        if ( !assignedSubcon || assignedSubcon === '' ) newErrors.assignedSubcon = 'Choose a Subcontractor!'

        return newErrors
    }
    
    useEffect(() => {
        axios.get('http://localhost:5000/projonline/users',{withCredentials: true }).then(res=>{
            
            setUsers(res.data.users.filter((obj) => (obj["userCanAssignForTask"] === true)))
            setCompanies(res.data.companys.filter((obj) => (obj.companyName !== 'Mobitel')))
            setApprovalPath(res.data.users)

            setVerificationOne([{_id:"",name:"Choose..."}])
            setVerificationTwo([{_id:"",name:"Choose..."}])
            setApproval([{_id:"",name:"Choose..."}])
            setForm({})
            return
        }).catch(err=>{
            console.log(err)
        })

    } , [ ] )


    const onSubmit=(e)=> {
        e.preventDefault()

        const newErrors = findFormErrors()
        // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            const taskObject = {
                siteID: form.siteID,
                siteName: form.siteName,
                plannedTaskStartDate: form.plannedTaskStartDate,
                targetTaskComDate: form.targetTaskComDate,
                taskAssignedDiv: form.taskAssignedDiv,
                assignedMobitelOfficer: form.assignedMobitelOfficer,
                workScope: form.workScope,
                assignedSubcon: form.assignedSubcon,
                taskStatus: 'Subcon allocated',
                approvalPath: [form.verificationOneId,form.verificationTwoId,form.approvalId].filter(element => element !="")
            };

            console.log(form.assignedMobitelOfficer)

            axios.post('http://localhost:5000/projonline/addTask', {taskObject,taskHistory:{taskStatus: taskObject.taskStatus}},{withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setOpen(true)
                    setVerificationOne([{_id:"",name:"Choose..."}])
                    setVerificationTwo([{_id:"",name:"Choose..."}])
                    setApproval([{_id:"",name:"Choose..."}])
                    setForm({
                        'siteID':'',
                        'siteName':'',
                        'plannedTaskStartDate':'',
                        'targetTaskComDate':'',
                        'taskAssignedDiv':'',
                        'verificationOneId': '',                     
                        'verificationTwoId': '',
                        'approvalId': '',
                        'assignedMobitelOfficer': '',
                        'workScope':'',
                        'assignedSubcon': '',
                        'approvalType': 'Default'
                    })
                }).catch((error) => {
                    console.log(error)
                });
            }
        

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    

    //Assigned Mobitel Officer Handler
    const onChangeAssignedMobitelOfficer=(e)=>{

        if(e.target.value==='Choose...'){
            setField('assignedMobitelOfficer',e.target.value)
            setVerificationOne([{_id:"",name:"Choose..."}])
            setVerificationTwo([{_id:"",name:"Choose..."}])
            setApproval([{_id:"",name:"Choose..."}])
        }
        

        for (let i = 0; i < approvalPath.length; i++) {
            if(approvalPath[i]._id===e.target.value){
                
                console.log(e.target.value)
                console.log(form)

                switch(approvalPath[i].approvalPath.length){
                    case 0:
                        setVerificationOne([{_id:"",name:"Choose..."}])
                        setVerificationTwo([{_id:"",name:"Choose..."}])
                        setApproval([{_id:"",name:"Choose..."}])
                        setForm({
                            ...form,
                            'verificationOneId': '',
                            'verificationTwoId': '',
                            'approvalId': '',
                            'assignedMobitelOfficer': e.target.value,
                            'approvalType': 'Default'
                        })
                        if ( !!errors['assignedMobitelOfficer'] ) setErrors({
                            ...errors,
                            assignedMobitelOfficer: null
                        })
                        break
                    case 1:
                        setVerificationOne([{_id:approvalPath[i].approvalPath[0]._id,name:approvalPath[i].approvalPath[0].name}])
                        setField('verificationOneId', approvalPath[i].approvalPath[0]._id)
                        setVerificationTwo([{_id:"",name:"Choose..."}])
                        setApproval([{_id:"",name:"Choose..."}])
                        setForm({
                            ...form,
                            'verificationOneId': approvalPath[i].approvalPath[0]._id,
                            'verificationTwoId': '',
                            'approvalId': '',
                            'assignedMobitelOfficer': e.target.value,
                            'approvalType': 'Default'
                        })
                        if ( !!errors['assignedMobitelOfficer'] ) setErrors({
                            ...errors,
                            assignedMobitelOfficer: null
                        })
                        
                        break
                    case 2:
                        setVerificationOne([{_id:approvalPath[i].approvalPath[0]._id,name:approvalPath[i].approvalPath[0].name}])
                        setVerificationTwo([{_id:"",name:"Choose...."}])
                        setApproval([{_id:approvalPath[i].approvalPath[1]._id,name:approvalPath[i].approvalPath[1].name}])
                        setForm({
                            ...form,
                            'verificationOneId': approvalPath[i].approvalPath[0]._id,
                            'verificationTwoId': "",
                            'approvalId': approvalPath[i].approvalPath[1]._id,
                            'assignedMobitelOfficer': e.target.value,
                            'approvalType': 'Default'
                        })
                        if ( !!errors['assignedMobitelOfficer'] ) setErrors({
                            ...errors,
                            assignedMobitelOfficer: null
                        })
                        break
                    case 3:
                        setVerificationOne([{_id:approvalPath[i].approvalPath[0]._id,name:approvalPath[i].approvalPath[0].name}])
                        setVerificationTwo([{_id:approvalPath[i].approvalPath[1]._id,name:approvalPath[i].approvalPath[1].name}])
                        setApproval([{_id:approvalPath[i].approvalPath[2]._id,name:approvalPath[i].approvalPath[2].name}])
                        setForm({
                            ...form,
                            'verificationOneId': approvalPath[i].approvalPath[0]._id,
                            'verificationTwoId': approvalPath[i].approvalPath[1]._id,
                            'approvalId': approvalPath[i].approvalPath[2]._id,
                            'assignedMobitelOfficer': e.target.value,
                            'approvalType': 'Default'
                        })
                        if ( !!errors['assignedMobitelOfficer'] ) setErrors({
                            ...errors,
                            assignedMobitelOfficer: null
                        })
                        
                        break
                }
                
                
            }
            
            
          }
          
        
      }
    
      //Approval Path Handler
      const onChangeApprovalType=(e)=>{
        console.log(e.target.value)
        console.log(form.approvalType)

        if(e.target.value==='New'){
            setVerificationOne(approvalPath.filter((obj) => (obj.company.companyName === 'Mobitel')))
            setVerificationTwo(approvalPath.filter((obj) => (obj.company.companyName === 'Mobitel')))
            setApproval(approvalPath.filter((obj) => (obj.company.companyName === 'Mobitel')))
            setForm({
                ...form,
                'approvalType': e.target.value
            })
            if ( !!errors['approvalType'] ) setErrors({
                ...errors,
                assignedMobitelOfficer: null
            })

        }else if(e.target.value==='Default'){
            
            for (let i = 0; i < approvalPath.length; i++) {
                if(approvalPath[i]._id===form.assignedMobitelOfficer){
                    switch(approvalPath[i].approvalPath.length){
                        case 0:
                            setVerificationOne([{_id:"",name:"Choose..."}])
                            setVerificationTwo([{_id:"",name:"Choose..."}])
                            setApproval([{_id:"",name:"Choose..."}])
                            setForm({
                                ...form,
                                'verificationOneId': '',
                                'verificationTwoId': '',
                                'approvalId': '',
                                'approvalType': e.target.value
                            })
                            if ( !!errors['approvalType'] ) setErrors({
                                ...errors,
                                approvalType: null
                            })
                            break
                        case 1:
                            setVerificationOne([{_id:approvalPath[i].approvalPath[0]._id,name:approvalPath[i].approvalPath[0].name}])
                            setField('verificationOneId', approvalPath[i].approvalPath[0]._id)
                            setVerificationTwo([{_id:"",name:"Choose..."}])
                            setApproval([{_id:"",name:"Choose..."}])
                            setForm({
                                ...form,
                                'verificationOneId': approvalPath[i].approvalPath[0]._id,
                                'verificationTwoId': '',
                                'approvalId': '',
                                'approvalType': e.target.value
                            })
                            if ( !!errors['approvalType'] ) setErrors({
                                ...errors,
                                approvalType: null
                            })
                            
                            break
                        case 2:
                            setVerificationOne([{_id:approvalPath[i].approvalPath[0]._id,name:approvalPath[i].approvalPath[0].name}])
                            setVerificationTwo([{_id:"",name:"Choose...."}])
                            setApproval([{_id:approvalPath[i].approvalPath[1]._id,name:approvalPath[i].approvalPath[1].name}])
                            setForm({
                                ...form,
                                'verificationOneId': approvalPath[i].approvalPath[0]._id,
                                'verificationTwoId': "",
                                'approvalId': approvalPath[i].approvalPath[1]._id,
                                'approvalType': e.target.value
                            })
                            if ( !!errors['approvalType'] ) setErrors({
                                ...errors,
                                approvalType: null
                            })
                            break
                        case 3:
                            setVerificationOne([{_id:approvalPath[i].approvalPath[0]._id,name:approvalPath[i].approvalPath[0].name}])
                            setVerificationTwo([{_id:approvalPath[i].approvalPath[1]._id,name:approvalPath[i].approvalPath[1].name}])
                            setApproval([{_id:approvalPath[i].approvalPath[2]._id,name:approvalPath[i].approvalPath[2].name}])
                            setForm({
                                ...form,
                                'verificationOneId': approvalPath[i].approvalPath[0]._id,
                                'verificationTwoId': approvalPath[i].approvalPath[1]._id,
                                'approvalId': approvalPath[i].approvalPath[2]._id,
                                'approvalType': e.target.value
                            })
                            if ( !!errors['approvalType'] ) setErrors({
                                ...errors,
                                approvalType: null
                            })
                            
                            break
                    }
                    
                    
                }
                
                
              }
        }
          
      }
    
    return (
        <div>
            
                        {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
            <section className="content-header">
                    <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1>Initiate Sub-Contractor Allocation</h1>
                        </div>
                    </div>
                    </div>{/* /.container-fluid */}
                </section>
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                <Form onSubmit={onSubmit}>
                    
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Label>Site ID</Form.Label>
                            <Form.Control onChange={ e => setField('siteID', e.target.value) } value = {form.siteID} className="col-md-9" type="text" placeholder="Enter site ID" isInvalid={ !!errors.siteID }/>
                            <Form.Control.Feedback type='invalid'>
                                { errors.siteID }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Site Name</Form.Label>
                            <Form.Control  onChange={ e => setField('siteName', e.target.value) } value = {form.siteName} type="text" placeholder="Enter site Name" isInvalid={ !!errors.siteName }/>
                            <Form.Control.Feedback type='invalid'>
                                { errors.siteName }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        </Form.Group>

                    </Row>
                    

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Planned Work Commencement Date</Form.Label>
                            <Form.Control onChange={ e => setField('plannedTaskStartDate', e.target.value) } value = {form.plannedTaskStartDate}  className="col-md-9" type="date" isInvalid={ !!errors.plannedTaskStartDate }/>
                            <Form.Control.Feedback type='invalid'>
                                { errors.plannedTaskStartDate }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} >
                        <Form.Label>Planned Work Completion Date</Form.Label>
                        <Form.Control onChange={ e => setField('targetTaskComDate', e.target.value) } value = {form.targetTaskComDate} className="col-md-9" type="date" isInvalid={ !!errors.targetTaskComDate }/>
                        <Form.Control.Feedback type='invalid'>
                                { errors.targetTaskComDate }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} >
                        
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Label>Task Assigned Division</Form.Label>
                            <Form.Control onChange={ e => setField('taskAssignedDiv', e.target.value) } value = {form.taskAssignedDiv} as="select" defaultValue="Choose..." isInvalid={ !!errors.taskAssignedDiv }>
                                <option>Choose...</option>
                                <option>IBS</option>
                                <option>Radio & Core Network</option>
                                <option>Transmission</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                { errors.taskAssignedDiv }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Assigned Mobitel Officer</Form.Label>
                            <Form.Control onChange={onChangeAssignedMobitelOfficer} as="select" value = {form.assignedMobitelOfficer} defaultValue="Choose..." isInvalid={ !!errors.assignedMobitelOfficer }>
                                <option>Choose...</option>
                                {users.map(opt => (
                                    <option value={opt._id}>{opt.name}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                { errors.assignedMobitelOfficer }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} >
                        <Form.Label>Approval Path</Form.Label>
                            <Form.Control onChange={onChangeApprovalType} as="select" value={form.approvalType} defaultValue="Choose..." isInvalid={ !!errors.name }>
                                <option>Default</option>
                                <option>New</option>
                            </Form.Control>
                        </Form.Group>

                    </Row>

                    <Row>
                        <Form.Group as={Col} >
                            <Form.Label>Verification by (Level 1)</Form.Label>
                            <Form.Control as="select" onChange={ e => setField('verificationOneId', e.target.value) } value={form.verificationOneId} defaultValue="Choose...">
                                {verificationOne.map(opt => (
                                    <option value={opt._id}>{opt.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Verification by (Level 2)</Form.Label>
                            <Form.Control as="select" onChange={ e => setField('verificationTwoId', e.target.value) }  value={form.verificationTwoId}  defaultValue="Choose...">
                                {verificationTwo.map(opt => (
                                    <option value={opt._id}>{opt.name}</option>
                                ))}
                                
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Approval by</Form.Label>
                            <Form.Control as="select" onChange={ e => setField('approvalId', e.target.value) } value={form.approvalId} defaultValue="Choose...">
                                {approval.map(opt => (
                                    <option value={opt._id}>{opt.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                    </Row>
                    
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Label>High level work scope</Form.Label>
                            <Form.Control onChange={ e => setField('workScope', e.target.value) } value={form.workScope}  as="textarea" rows={2}  placeholder="" isInvalid={ !!errors.workScope } />
                            <Form.Control.Feedback type='invalid'>
                                { errors.workScope }
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    


                    <Row className="mb-3">

                    <Form.Group as={Col} >
                        <Form.Label>Assigned subcontractor</Form.Label>
                        <Form.Control onChange={ e => setField('assignedSubcon', e.target.value) } value={form.assignedSubcon} as="select" defaultValue="Choose..." isInvalid={ !!errors.assignedSubcon } >
                            <option>Choose...</option>
                            {companies.map(opt => (
                                    <option value={opt._id}>{opt.companyName}</option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                                { errors.assignedSubcon }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} >
                        </Form.Group>

                        <Form.Group as={Col} >
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit">
                        Assign Subcontractor
                    </Button>
                </Form>
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
            
            
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "center"}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
                    Task added successfully!!!
                </Alert>
            </Snackbar>


        </div>
    )
}

export default withRouter(SubconAllocationBody)