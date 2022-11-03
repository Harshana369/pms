        <Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Handover Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  Planning_ID ---------------------------------
                InputLabelProps={{ shrink: true }}
                name="Planning_ID"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Planning_ID}
                fullWidth
                type="text"
                label="Planning ID"
                inputProps={{ style: { color: 'gray' } }}
                variant="outlined"
              />
              <TextField // -----------------------------------------------------------  Implemented by--------------------------------
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="Implementation_By"
                onChange={(e) => onInputChange(e)}
                id="outlined-select-currency"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Implemented By"
                size="small"
                value={Implementation_By}
              >
                {Implementation_ByVendor.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Implementation_ByVendor === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Project----------------------------------------
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="Project_ID"
                onChange={(e) => onInputChange(e)}
                id="outlined-select-currency"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Project Name"
                size="small"
                value={Project}
              >
                {Projects.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Projects === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Site ID-----------------------------------------
                InputLabelProps={{ shrink: true }}
                name="Site_ID"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Site_ID}
                fullWidth
                type="text"
                label="Site ID"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------  Site Name---------------------------
                InputLabelProps={{ shrink: true }}
                name="Site_Name"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Site_Name}
                fullWidth
                type="text"
                label="Site Name"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- HO Date--------------------------
                size="small"
                value={HO_Date}
                InputLabelProps={{ shrink: true }}
                name="Project_ID"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Handover Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ HO_Modification------------------------------
                InputLabelProps={{ shrink: true }}
                name="HO_Modification"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="HO Modification"
                size="small"
                value={HO_Modification}
              >
                {HandoverModification.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={HandoverModification === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------- HO_Modified_Date -------------------------
                size="small"
                value={HO_Modified_Date}
                InputLabelProps={{ shrink: true }}
                name="HO_Modified_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="HO Modified Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword3} edge="end">
                        <Icon icon={showCheckMark3 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Scope-------------------------
                InputLabelProps={{ shrink: true }}
                name="Scope"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Scope"
                size="small"
                value={Scope}
              >
                {Scopes.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Scopes === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------ New RAT------------------------------
                InputLabelProps={{ shrink: true }}
                name="New_RAT"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="New RAT"
                size="small"
                value={New_RAT}
              >
                {RATs.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={RATs === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  New_Sector ---------------------------
                InputLabelProps={{ shrink: true }}
                name="New_Sector"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={New_Sector}
                fullWidth
                type="text"
                label="New Sector"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -------------------------------------------------------------------  Approval_Status-------------------------
                InputLabelProps={{ shrink: true }}
                name="Approval_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Approval Status"
                size="small"
                value={Approval_Status}
              >
                {ApprovalStatus.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={ApprovalStatus === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Approval_Ref-------------------------
                InputLabelProps={{ shrink: true }}
                name="Approval_Ref"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Approval_Ref}
                fullWidth
                type="text"
                label="Approval Ref"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  IMP_Scenario------------------------------
                InputLabelProps={{ shrink: true }}
                name="IMP_Scenario"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={IMP_Scenario}
                fullWidth
                type="text"
                label="IMP Scenario"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  blank1 ---------------------------
                InputLabelProps={{ shrink: true }}
                name="blank1"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={blank1}
                fullWidth
                type="text"
                label="blank1"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  blank2 ---------------------------
                InputLabelProps={{ shrink: true }}
                name="blank2"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={blank2}
                fullWidth
                type="text"
                label="blank2"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ blank3-------------------------
                InputLabelProps={{ shrink: true }}
                name="blank3"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={blank3}
                fullWidth
                type="text"
                label="blank3"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Tilt------------------------------
                InputLabelProps={{ shrink: true }}
                name="Tilt"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Tilt}
                fullWidth
                type="text"
                label="Tilt"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Azimuth ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Azimuth"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Azimuth}
                fullWidth
                type="text"
                label="Azimuth"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Antenna_Height ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Antenna_Height"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Antenna_Height}
                fullWidth
                type="text"
                label="Antenna Height"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ New_RRU_Type-------------------------
                InputLabelProps={{ shrink: true }}
                name="New_RRU_Type"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={New_RRU_Type}
                fullWidth
                type="text"
                label="New RRU Type"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  RRU_From------------------------------
                InputLabelProps={{ shrink: true }}
                name="RRU_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={RRU_From}
                fullWidth
                type="text"
                label="RRU From"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  New_BTS_Type ---------------------------
                InputLabelProps={{ shrink: true }}
                name="New_BTS_Type"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={New_BTS_Type}
                fullWidth
                type="text"
                label="New BTS Type"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  BTS_From ---------------------------
                InputLabelProps={{ shrink: true }}
                name="BTS_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={BTS_From}
                fullWidth
                type="text"
                label="BTS From"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ New_Antenna_Type-------------------------
                InputLabelProps={{ shrink: true }}
                name="New_Antenna_Type"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={New_Antenna_Type}
                fullWidth
                type="text"
                label="New Antenna Type"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Antenna_From------------------------------
                InputLabelProps={{ shrink: true }}
                name="Antenna_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Antenna_From}
                fullWidth
                type="text"
                label="Antenna From"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Cards_Type_n_From ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Cards_Type_n_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Cards_Type_n_From}
                fullWidth
                type="text"
                label="Cards Type and From"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Battery_count_n_From ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Battery_count_n_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Battery_count_n_From}
                fullWidth
                type="text"
                label="Battery count and From"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Mobitel_Region-------------------------
                InputLabelProps={{ shrink: true }}
                name="Mobitel_Region"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Mobitel_Region}
                fullWidth
                type="text"
                label="Mobitel Region"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Planning_Engineer------------------------------
                InputLabelProps={{ shrink: true }}
                name="Planning_Engineer"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Planning_Engineer}
                fullWidth
                type="text"
                label="Planning Engineer"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  On_Air_Target ---------------------------
                size="small"
                value={On_Air_Target}
                InputLabelProps={{ shrink: true }}
                name="On_Air_Target"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="On Air Target"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword1} edge="end">
                        <Icon icon={showCheckMark1 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------  Planning_Comments ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Planning_Comments"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Planning_Comments}
                fullWidth
                type="text"
                label="Planning Comments"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>