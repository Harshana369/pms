<Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Dependencies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Site Status--------------------
                InputLabelProps={{ shrink: true }}
                name="Site_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Site Status"
                size="small"
                value={Site_Status}
              >
                {Site_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Site_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------ Dependency --------------------
                InputLabelProps={{ shrink: true }}
                name="Dependency"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Dependency"
                size="small"
                value={Dependency}
              >
                {Dependencies.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Dependencies === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  Responsible--------------------
                InputLabelProps={{ shrink: true }}
                name="Responsible"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Responsible"
                size="small"
                value={Responsible}
              >
                {Responsibles.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Responsibles === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Dependencies_On_Air_Target -----------------------------------------
                size="small"
                value={Dependencies_On_Air_Target}
                InputLabelProps={{ shrink: true }}
                name="Dependencies_On_Air_Target"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Dependencies On Air Target"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword4} edge="end">
                        <Icon icon={showCheckMark4 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- Civil PAT Date-------------------
                size="small"
                value={Civil_PAT_Date}
                InputLabelProps={{ shrink: true }}
                name="Civil_PAT_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Civil PAT Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword5} edge="end">
                        <Icon icon={showCheckMark5 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- SAQ Clearance Date-----------------
                size="small"
                value={SAQ_Clearance_Date}
                InputLabelProps={{ shrink: true }}
                name="SAQ_Clearance_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="SAQ Clearance Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword6} edge="end">
                        <Icon icon={showCheckMark6 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------ TSSR_Referance------------------------------
                InputLabelProps={{ shrink: true }}
                name="TSSR_Referance"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={TSSR_Referance}
                fullWidth
                type="text"
                label="TSSR Reference"
                inputProps={{ style: { color: 'gray' } }}
                variant="outlined"
              />
              <TextField // ------------------------------------------------------------------- TSSR_Submitted_Date -------------------------
                size="small"
                value={TSSR_Submitted_Date}
                InputLabelProps={{ shrink: true }}
                name="TSSR_Submitted_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="TSSR Submitted Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword7} edge="end">
                        <Icon icon={showCheckMark7 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- TSSR_Approved_Date -------------------------
                size="small"
                value={TSSR_Approved_Date}
                InputLabelProps={{ shrink: true }}
                name="TSSR_Approved_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="TSSR Approved Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword8} edge="end">
                        <Icon icon={showCheckMark8 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- Supply_BOQ_Submitted -------------------------
                size="small"
                value={Supply_BOQ_Submitted}
                InputLabelProps={{ shrink: true }}
                name="Supply_BOQ_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply BOQ Submitted"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword9} edge="end">
                        <Icon icon={showCheckMark9 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- Supply_BOQ_Approved -------------------------
                size="small"
                value={Supply_BOQ_Approved}
                InputLabelProps={{ shrink: true }}
                name="Supply_BOQ_Approved"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply BOQ Approved"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword10} edge="end">
                        <Icon icon={showCheckMark10 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- Approval_Received_Date -------------------------
                size="small"
                value={Approval_Received_Date}
                InputLabelProps={{ shrink: true }}
                name="Approval_Received_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Approval Received Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword11} edge="end">
                        <Icon icon={showCheckMark11 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- MCW_Requested_Date -------------------------
                size="small"
                value={MCW_Requested_Date}
                InputLabelProps={{ shrink: true }}
                name="MCW_Requested_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="MCW Requested Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword12} edge="end">
                        <Icon icon={showCheckMark12 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- MCW_Completed_Date -------------------------
                size="small"
                value={MCW_Completed_Date}
                InputLabelProps={{ shrink: true }}
                name="MCW_Completed_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="MCW Completed Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword13} edge="end">
                        <Icon icon={showCheckMark13 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>