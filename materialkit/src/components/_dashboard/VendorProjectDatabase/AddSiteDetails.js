import react, { useState } from 'react';
import axios from 'axios';
// -----------------{/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}

export default function AddSiteDetails() {
  const [siteid, setSiteid] = useState('');
  const [sitename, setSitename] = useState('');
  const [sename, setSename] = useState('');
  const [targetdate, setTargetDate] = useState('');
  const [subcon, setSubcon] = useState('');
  const [impscope, setImpScope] = useState('');
  const [workcompletion, setWorkCompletion] = useState('');
  const [patsub, setPatSub] = useState('');
  const [rmvsub, setRmvSub] = useState('');
  const [remarks, setRemarks] = useState('');

  function sendData(e) {
    e.preventDefault();
    const newSiteDetails = {
      siteid,
      sitename,
      sename,
      targetdate,
      subcon,
      impscope,
      workcompletion,
      patsub,
      rmvsub,
      remarks
    };
    axios
      .post('/site/add', newSiteDetails)
      .then(() => {
        alert('New Site Details Added');
        setSiteid('');
        setSitename('');
        setSename('');
        setImpScope('');
        setWorkCompletion('');
        setRemarks('');
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="siteid">Site ID</label>
          <input
            type="text"
            className="form-control"
            id="siteid"
            placeholder="Enter Site ID"
            onChange={(e) => {
              setSiteid(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="sitename">Site Name</label>
          <input
            type="text"
            className="form-control"
            id="sitename"
            placeholder="Enter Site Name"
            onChange={(e) => {
              setSitename(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="sename">Assigned SE</label>
          <input
            type="text"
            className="form-control"
            id="sename"
            placeholder="Enter Assigned SE Name "
            onChange={(e) => {
              setSename(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="targetdate">Target Date</label>
          <input
            type="text"
            className="form-control"
            id="targetdate"
            placeholder="Enter Target Date"
            onChange={(e) => {
              setTargetDate(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="subcon">Sub Contractor Name</label>
          <input
            type="text"
            className="form-control"
            id="subcon"
            placeholder="Enter Sub Contractor Name"
            onChange={(e) => {
              setSubcon(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="impscope">Implementation Scope</label>
          <input
            type="text"
            className="form-control"
            id="impscope"
            placeholder="Enter Implementation Scope"
            onChange={(e) => {
              setImpScope(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="workcompletion">Work Completion</label>
          <input
            type="text"
            className="form-control"
            id="workcompletion"
            placeholder="Enter Work Completion Status"
            onChange={(e) => {
              setWorkCompletion(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="patsub">PAT Submission</label>
          <input
            type="text"
            className="form-control"
            id="patsub"
            placeholder="Enter PAT Submission Details"
            onChange={(e) => {
              setPatSub(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="rmvsub">RMV Submission</label>
          <input
            type="text"
            className="form-control"
            id="rmvsub"
            placeholder="Enter RMV Submission Details"
            onChange={(e) => {
              setRmvSub(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="remarks">Remarks</label>
          <input
            type="text"
            className="form-control"
            id="remarks"
            placeholder="Enter Remarks"
            onChange={(e) => {
              setRemarks(e.target.value);
            }}
          />
        </div>
        <div className="w-25 p-2">
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
