        <Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Work Allocation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Site Engineers--------------------
                InputLabelProps={{ shrink: true }}
                name="Site_Engineer"
                onChange={(e) => onInputChange(e)}
                id="outlined-select"
                select
                sx={{ width: 250 }}
                inputProps={{ style: { color: 'gray' } }}
                label="Site Engineer"
                size="small"
                value={Site_Engineer}
              >
                {Site_Engineers.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Site_Engineers === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------- Assigned_Date-------------------
                size="small"
                fullWidth
                sx={{ width: 250 }}
                value={Assigned_Date}
                InputLabelProps={{ shrink: true }}
                name="Assigned_Date"
                onChange={(e) => onInputChange(e)}
                type="Date"
                label="Assigned Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword2} edge="end">
                        <Icon icon={showCheckMark2 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- Special_Tag-------------------
                InputLabelProps={{ shrink: true }}
                name="Special_Tag"
                onChange={(e) => onInputChange(e)}
                id="outlined-select"
                select
                sx={{ width: 250 }}
                inputProps={{ style: { color: 'gray' } }}
                label="Special Tag"
                size="small"
                value={Special_Tag}
              >
                {specialTag.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={specialTag === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------  Coordinator_Comments---------------------------
                InputLabelProps={{ shrink: true }}
                name="Coordinator_Comments"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Coordinator_Comments}
                sx={{ width: 250 }}
                type="text"
                label="Coordinator Comments"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>