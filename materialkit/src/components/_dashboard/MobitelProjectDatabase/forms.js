<Stack spacing={2} direction="row" mb={3}>
    <TextField // -----------------------------------------------------------  Project ID---------------------------------
        InputLabelProps={{ shrink: true }}
        size="small"
        disabled
        value={Planning_ID}
        fullWidth
        type="text"
        label="Planning ID"
        inputProps={{ style: { color: 'gray' } }}
        variant="outlined"
        onChange={(e) => {
            setPlanning_ID(e.target.value);
        }}
    />
    <TextField // -----------------------------------------------------------  Implemented by--------------------------------
        fullWidth
        required="required"
        InputLabelProps={{ shrink: true }}
        id="outlined-select-currency"
        select
        inputProps={{ style: { color: 'gray' } }}
        label="Implemented By"
        size="small"
        value={Implementation_By}
        onChange={handleChange1}
    >
        {Implementation_ByVendor.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
    </TextField>
    <TextField // -----------------------------------------------------------  Project----------------------------------------
        fullWidth
        required="required"
        InputLabelProps={{ shrink: true }}
        id="outlined-select-currency"
        select
        inputProps={{ style: { color: 'gray' } }}
        label="Project Name"
        size="small"
        value={Project}
        onChange={handleChange2}
    >
        {Projects.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
    </TextField>
    <TextField // -----------------------------------------------------------  Site ID-----------------------------------------
        InputLabelProps={{ shrink: true }}
        required="required"
        size="small"
        value={Site_ID}
        fullWidth
        type="text"
        label="Site ID"
        inputProps={{ style: { color: 'gray' } }}
        onChange={(e) => {
            setSite_ID(e.target.value);
        }}
    />
    <TextField // ------------------------------------------------------------  Site Name---------------------------
        InputLabelProps={{ shrink: true }}
        required="required"
        size="small"
        value={Site_Name}
        fullWidth
        type="text"
        label="Site Name"
        inputProps={{ style: { color: 'gray' } }}
        onChange={(e) => {
            setSite_Name(e.target.value);
        }}
    />
</Stack>
<Stack spacing={2} direction="row" mb={3}>
    <TextField // ------------------------------------------------------------------- HO Date--------------------------
        size="small"
        required="required"
        value={HO_Date}
        InputLabelProps={{ shrink: true }}
        fullWidth
        type="Date"
        label="Handover Date"
        inputProps={{ style: { color: 'gray' } }}
        onChange={(e) => {
        setHO_Date(e.target.value);
        }}
    />
    <TextField // ------------------------------------------------------------------ HO_Modification------------------------------
        InputLabelProps={{ shrink: true }}
        fullWidth
        required="required"
        id="outlined-select"
        select
        inputProps={{ style: { color: 'gray' } }}
        label="HO Modification"
        size="small"
        value={HO_Modification}
        onChange={handleChange4}
    >
        {HandoverModification.map((option) => (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
        ))}
    </TextField>
    <TextField // ------------------------------------------------------------------- HO_Modified_Date -------------------------
        size="small"
        value={HO_Modified_Date}
        InputLabelProps={{ shrink: true }}
        fullWidth
        type="Date"
        label="HO Modified Date"
        inputProps={{ style: { color: 'gray' } }}
        onChange={(e) => {
        setHO_Modified_Date(e.target.value);
        }}
    />
    <TextField // ------------------------------------------------------------------ Scope-------------------------
        InputLabelProps={{ shrink: true }}
        fullWidth
        required="required"
        id="outlined-select"
        select
        inputProps={{ style: { color: 'gray' } }}
        label="Scope"
        size="small"
        value={Scope}
        onChange={handleChange3}
    >
        {Scopes.map((option) => (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
        ))}
    </TextField>
    <TextField // ------------------------------------------------------------------ New RAT------------------------------
        InputLabelProps={{ shrink: true }}
        fullWidth
        required="required"
        id="outlined-select"
        select
        inputProps={{ style: { color: 'gray' } }}
        label="New RAT"
        size="small"
        value={New_RAT}
        onChange={handleChange4}
    >
        {RATs.map((option) => (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
        ))}
    </TextField>
</Stack>