<Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
    <Typography color="primary">Payment</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Stack spacing={2} direction="row" mb={3}>
        <TextField // -----------------------------------------------------------  COW_Number ---------------------------------
        InputLabelProps={{ shrink: true }}
        name="COW_Number"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={COW_Number}
        fullWidth
        type="text"
        label="COW Number"
        inputProps={{ style: { color: 'gray' } }}
        variant="outlined"
        />
        <TextField // -----------------------------------------------------------  COW_Submitted --------------------------------
        size="small"
        value={COW_Submitted}
        InputLabelProps={{ shrink: true }}
        name="COW_Submitted"
        onChange={(e) => onInputChange(e)}
        fullWidth
        type="Date"
        label="COW Submitted"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword37} edge="end">
                <Icon icon={showCheckMark37 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
        <TextField // -----------------------------------------------------------  COW_Approved----------------------------------------
        size="small"
        value={COW_Approved}
        InputLabelProps={{ shrink: true }}
        name="COW_Approved"
        onChange={(e) => onInputChange(e)}
        fullWidth
        type="Date"
        label="COW Approved"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword38} edge="end">
                <Icon icon={showCheckMark38 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
        <TextField // -----------------------------------------------------------  CPL_Number-----------------------------------------
        InputLabelProps={{ shrink: true }}
        name="CPL_Number"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={CPL_Number}
        fullWidth
        type="text"
        label="CPL Number"
        inputProps={{ style: { color: 'gray' } }}
        />
    </Stack>
    <Stack spacing={2} direction="row" mb={3}>
        <TextField // ------------------------------------------------------------ CPL_Submitted---------------------------
        InputLabelProps={{ shrink: true }}
        name="CPL_Submitted"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={CPL_Submitted}
        fullWidth
        type="date"
        label="CPL Submitted"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword39} edge="end">
                <Icon icon={showCheckMark39 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
        <TextField // ---------------------------------------------------------------- CPL_Approved--------------------------
        size="small"
        value={CPL_Approved}
        InputLabelProps={{ shrink: true }}
        name="CPL_Approved"
        onChange={(e) => onInputChange(e)}
        fullWidth
        type="Date"
        label="CPL Approved"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword40} edge="end">
                <Icon icon={showCheckMark40 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
        <TextField // ------------------------------------------------------------------ PAC_Invoice_Number------------------------------
        size="small"
        value={PAC_Invoice_Number}
        InputLabelProps={{ shrink: true }}
        name="PAC_Invoice_Number"
        onChange={(e) => onInputChange(e)}
        fullWidth
        type="text"
        label="PAC/Invoice Number"
        inputProps={{ style: { color: 'gray' } }}
        />
        <TextField // ------------------------------------------------------------------- PAC_Invoice_Submitted -------------------------
        size="small"
        value={PAC_Invoice_Submitted}
        InputLabelProps={{ shrink: true }}
        name="PAC_Invoice_Submitted"
        onChange={(e) => onInputChange(e)}
        fullWidth
        type="Date"
        label="PAC/Invoice Submitted"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword41} edge="end">
                <Icon icon={showCheckMark41 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
    </Stack>
    <Stack spacing={2} direction="row" mb={3}>
        <TextField // ------------------------------------------------------------------ PAC_Invoice_Approved-------------------------
        InputLabelProps={{ shrink: true }}
        name="PAC_Invoice_Approved"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={PAC_Invoice_Approved}
        fullWidth
        type="date"
        label="PAC/Invoice Approved"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword42} edge="end">
                <Icon icon={showCheckMark42 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
        <TextField // ------------------------------------------------------------------  FAC_Number------------------------------
        InputLabelProps={{ shrink: true }}
        name="FAC_Number"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={FAC_Number}
        fullWidth
        type="text"
        label="FAC Number"
        inputProps={{ style: { color: 'gray' } }}
        />
        <TextField // ------------------------------------------------------------------  FAC_Submitted ---------------------------
        InputLabelProps={{ shrink: true }}
        name="FAC_Submitted"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={FAC_Submitted}
        fullWidth
        type="date"
        label="FAC Submitted"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword43} edge="end">
                <Icon icon={showCheckMark43 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
        <TextField // -------------------------------------------------------------------  FAC_Approved-------------------------
        InputLabelProps={{ shrink: true }}
        name="FAC_Approved"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={FAC_Approved}
        fullWidth
        type="date"
        label="FAC Approved"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword44} edge="end">
                <Icon icon={showCheckMark44 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
    </Stack>
    <Stack spacing={2} direction="row" mb={3}>
        <TextField // ------------------------------------------------------------------ PO_Status-------------------------
        InputLabelProps={{ shrink: true }}
        name="PO_Status"
        onChange={(e) => onInputChange(e)}
        fullWidth
        select
        inputProps={{ style: { color: 'gray' } }}
        label="PO Status"
        size="small"
        value={PO_Status}
        >
        {POStatus.map((option) => (
            <MenuItem
            key={option.value}
            value={option.value}
            selected={POStatus === option.value ? 'selected' : ''}
            >
            {option.label}
            </MenuItem>
        ))}
        </TextField>
        <TextField // ------------------------------------------------------------------  PO_Closed_Date------------------------------
        InputLabelProps={{ shrink: true }}
        name="PO_Closed_Date"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={PO_Closed_Date}
        fullWidth
        type="date"
        label="PO Closed Date"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword45} edge="end">
                <Icon icon={showCheckMark45 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
        <TextField // ------------------------------------------------------------------  Capitalization_Status ---------------------------
        InputLabelProps={{ shrink: true }}
        name="Capitalization_Status"
        onChange={(e) => onInputChange(e)}
        fullWidth
        select
        inputProps={{ style: { color: 'gray' } }}
        label="Capitalization Status"
        size="small"
        value={Capitalization_Status}
        >
        {CapitalizationStatus.map((option) => (
            <MenuItem
            key={option.value}
            value={option.value}
            selected={CapitalizationStatus === option.value ? 'selected' : ''}
            >
            {option.label}
            </MenuItem>
        ))}
        </TextField>
        <TextField // ------------------------------------------------------------------  Capitalized_Date ---------------------------
        InputLabelProps={{ shrink: true }}
        name="Capitalized_Date"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={Capitalized_Date}
        fullWidth
        type="date"
        label="Capitalized Date"
        InputProps={{
            style: { color: 'gray' },
            endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword46} edge="end">
                <Icon icon={showCheckMark46 ? CheckMark : Clear} />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
    </Stack>
    <Stack spacing={2} direction="row" mb={3}>
        <TextField // ------------------------------------------------------------------  Finance_Remarks-------------------------
        InputLabelProps={{ shrink: true }}
        name="Finance_Remarks"
        onChange={(e) => onInputChange(e)}
        size="small"
        value={Finance_Remarks}
        fullWidth
        type="text"
        label="Finance Remarks"
        inputProps={{ style: { color: 'gray' } }}
        />
        <TextField // ------------------------------------------------------------------  currentUser-------------------------
        InputLabelProps={{ shrink: true }}
        disabled
        name="currentUser"
        onChange={handleChange}
        size="small"
        value={CurrentUserName}
        fullWidth
        type="text"
        label="Modified By"
        inputProps={{ style: { color: 'gray' } }}
        />
    </Stack>
  </AccordionDetails>
</Accordion>