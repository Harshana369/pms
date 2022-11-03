<Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Implementation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Mobilization Status --------------------
                InputLabelProps={{ shrink: true }}
                name="Mobilization_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Mobilization Status"
                size="small"
                value={Mobilization_Status}
              >
                {Mobilization_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Mobilization_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------- Mobilized Date --------------------------
                size="small"
                value={Mobilized_Date}
                InputLabelProps={{ shrink: true }}
                name="Mobilized_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Mobilized Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ Installation Status--------------------
                InputLabelProps={{ shrink: true }}
                name="Installation_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Installation Status"
                size="small"
                value={Installation_Status}
              >
                {Installation_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Installation_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------ Installation Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Installation_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Installation_Date}
                fullWidth
                type="date"
                label="Installation Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------ Power Connected Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Power_Connected_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Power_Connected_Date}
                fullWidth
                type="date"
                label="Power Connected Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword31} edge="end">
                        <Icon icon={showCheckMark31 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------ TX Connected Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="TX_Connected_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={TX_Connected_Date}
                fullWidth
                type="date"
                label="TX Connected Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword32} edge="end">
                        <Icon icon={showCheckMark32 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------ Commisioning Status--------------------
                InputLabelProps={{ shrink: true }}
                name="Commissioning_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Commisioning Status"
                size="small"
                value={Commissioning_Status}
              >
                {Commissioning_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Commissioning_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------ Commisioning Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Commisioned_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Commisioned_Date}
                fullWidth
                type="date"
                label="Commisioning Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>