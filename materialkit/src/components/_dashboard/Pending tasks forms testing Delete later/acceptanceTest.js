<Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Acceptance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------ SAR_Reference --------------------------
                InputLabelProps={{ shrink: true }}
                name="SAR_Reference"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={SAR_Reference}
                fullWidth
                type="text"
                label="SAR Reference"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ SAR Status--------------------
                InputLabelProps={{ shrink: true }}
                name="SAR_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="SAR Status"
                size="small"
                value={SAR_Status}
              >
                {SAR_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={SAR_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------ SAR Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="SAR_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={SAR_Date}
                fullWidth
                type="date"
                label="SAR Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------ PAT_Reference --------------------------
                InputLabelProps={{ shrink: true }}
                name="PAT_Reference"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={PAT_Reference}
                fullWidth
                type="text"
                label="PAT Reference"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ PAT Status--------------------
                InputLabelProps={{ shrink: true }}
                name="PAT_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="PAT Status"
                size="small"
                value={PAT_Status}
              >
                {PAT_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={PAT_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------ PAT_Submitted --------------------------
                InputLabelProps={{ shrink: true }}
                name="PAT_Submitted"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={PAT_Submitted}
                fullWidth
                type="date"
                label="PAT Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------  PAT_Pass_Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="PAT_Pass_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={PAT_Pass_Date}
                fullWidth
                type="date"
                label="PAT Pass Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------ Check List Submitted Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Check_List_Submitted"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Check_List_Submitted}
                fullWidth
                type="date"
                label="Check List Submitted Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword33} edge="end">
                        <Icon icon={showCheckMark33 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------ Check List Verified Date--------------------------
                InputLabelProps={{ shrink: true }}
                name="Check_List_Verified"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Check_List_Verified}
                fullWidth
                type="date"
                label="Check List Verified Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword34} edge="end">
                        <Icon icon={showCheckMark34 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // -----------------------------------------------------------  On Air Status--------------------
                InputLabelProps={{ shrink: true }}
                name="On_Air_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="On Air Status"
                size="small"
                value={On_Air_Status}
              >
                {On_Air_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={On_Air_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------  On Air Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="On_Air_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={On_Air_Date}
                fullWidth
                type="date"
                label="On Air Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------  Material_Reconciled --------------------------
                InputLabelProps={{ shrink: true }}
                name="Material_Reconciled"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Material_Reconciled}
                fullWidth
                type="date"
                label="Material Reconciled"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword35} edge="end">
                        <Icon icon={showCheckMark35 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------  Balance_Material_Returned_Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Balance_Material_Returned_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Balance_Material_Returned_Date}
                defaultValue="Not Available"
                fullWidth
                type="date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword36} edge="end">
                        <Icon icon={showCheckMark36 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                label="Balance Material Returned Date"
              />
            </Stack>
          </AccordionDetails>
        </Accordion>