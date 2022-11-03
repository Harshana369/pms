        <Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">PR/PO Progress</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  Supply_PR_Submitted ---------------------------------
                size="small"
                value={Supply_PR_Submitted}
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply PR Submitted"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword14} edge="end">
                        <Icon icon={showCheckMark14 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // -----------------------------------------------------------  Supply_PR_Status --------------------------------
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Status"
                onChange={(e) => onInputChange(e)}
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Supply PR Status"
                size="small"
                value={Supply_PR_Status}
              >
                {SupplyPRStatus.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={SupplyPRStatus === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Supply_PR_Approved_Date ---------------------------------
                size="small"
                value={Supply_PR_Approved_Date}
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Approved_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply PR Approved Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword15} edge="end">
                        <Icon icon={showCheckMark15 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- Supply_PR_Number------------------------
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Supply_PR_Number}
                fullWidth
                type="text"
                label="Supply PR Number"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  Supply_PR_Raise ---------------------------------
                size="small"
                value={Supply_PR_Raise}
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Raise"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply PR Raised"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword16} edge="end">
                        <Icon icon={showCheckMark16 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- Supply_PO_Number------------------------
                InputLabelProps={{ shrink: true }}
                name="Supply_PO_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Supply_PO_Number}
                fullWidth
                type="text"
                label="Supply PO Number"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  Supply_PO_Issued ---------------------------------
                size="small"
                value={Supply_PO_Issued}
                InputLabelProps={{ shrink: true }}
                name="Supply_PO_Issued"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply PO Issued"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword17} edge="end">
                        <Icon icon={showCheckMark17 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- IMP_PR_Submitted -------------------------
                size="small"
                value={IMP_PR_Submitted}
                InputLabelProps={{ shrink: true }}
                name="IMP_PR_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="IMP PR Submitted"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword18} edge="end">
                        <Icon icon={showCheckMark18 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- IMP_PR_Approved_Date -------------------------
                size="small"
                value={IMP_PR_Approved_Date}
                InputLabelProps={{ shrink: true }}
                name="IMP_PR_Approved_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="IMP PR Approved Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword19} edge="end">
                        <Icon icon={showCheckMark19 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------ IMP_PR_Number------------------------------
                InputLabelProps={{ shrink: true }}
                name="IMP_PR_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={IMP_PR_Number}
                fullWidth
                type="text"
                label="IMP PR Number"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- IMP_PR_Raised -------------------------
                size="small"
                value={IMP_PR_Raised}
                InputLabelProps={{ shrink: true }}
                name="IMP_PR_Raised"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="IMP PR Raised"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword20} edge="end">
                        <Icon icon={showCheckMark20 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // -------------------------------------------------------------------  IMP_PO_Number-------------------------
                InputLabelProps={{ shrink: true }}
                name="IMP_PO_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={IMP_PO_Number}
                fullWidth
                type="text"
                label="IMP PO Number"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -------------------------------------------------------------------  IMP_PO_Issued -------------------------
                InputLabelProps={{ shrink: true }}
                name="IMP_PO_Issued"
                onChange={(e) => onInputChange(e)}
                size="small"
                type="Date"
                value={IMP_PO_Issued}
                fullWidth
                label="IMP PO Issued"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword21} edge="end">
                        <Icon icon={showCheckMark21 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------  AWR_1------------------------------
                InputLabelProps={{ shrink: true }}
                name="AWR_1"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={AWR_1}
                fullWidth
                type="text"
                label="AWR 1"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  AWR_2 ---------------------------
                InputLabelProps={{ shrink: true }}
                name="AWR_2"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={AWR_2}
                fullWidth
                type="text"
                label="AWR 2"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  AWR_3 ---------------------------
                InputLabelProps={{ shrink: true }}
                name="AWR_3"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={AWR_3}
                fullWidth
                type="text"
                label="AWR 3"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>