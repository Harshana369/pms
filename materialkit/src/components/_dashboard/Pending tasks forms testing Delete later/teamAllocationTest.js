<Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Team Allocation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Sub Contractors--------------------
                InputLabelProps={{ shrink: true }}
                name="Sub_Contractor"
                onChange={(e) => onInputChange(e)}
                id="outlined-select"
                select
                fullWidth
                inputProps={{ style: { color: 'gray' } }}
                label="Sub Contractor"
                size="small"
                value={Sub_Contractor}
              >
                {Sub_Contractors.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Sub_Contractors === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------  Sub_Contractor_Remarks---------------------------
                InputLabelProps={{ shrink: true }}
                name="Sub_Contractor_Remarks"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Sub_Contractor_Remarks}
                fullWidth
                type="text"
                label="Sub Contractor Remarks"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>