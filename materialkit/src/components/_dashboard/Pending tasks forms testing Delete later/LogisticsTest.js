        <Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Logistics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  PI_Number ---------------------------------
                size="small"
                value={PI_Number}
                InputLabelProps={{ shrink: true }}
                name="PI_Number"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="text"
                label="PI Number"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  PI_Submitted --------------------------------
                size="small"
                value={PI_Submitted}
                InputLabelProps={{ shrink: true }}
                name="PI_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="date"
                label="PI Submitted"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword22} edge="end">
                        <Icon icon={showCheckMark22 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // -----------------------------------------------------------  PI_Approved_ENG ---------------------------------
                size="small"
                value={PI_Approved_ENG}
                InputLabelProps={{ shrink: true }}
                name="PI_Approved_ENG"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="PI Approved ENG"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword23} edge="end">
                        <Icon icon={showCheckMark23 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- TRC_Approved------------------------
                InputLabelProps={{ shrink: true }}
                name="TRC_Approved"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={TRC_Approved}
                fullWidth
                type="date"
                label="TRC Approved"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword24} edge="end">
                        <Icon icon={showCheckMark24 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // --------------------------------------------------------------------  BOI_Approved ---------------------------------
                size="small"
                value={BOI_Approved}
                InputLabelProps={{ shrink: true }}
                name="BOI_Approved"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="BOI Approved"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword25} edge="end">
                        <Icon icon={showCheckMark25 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // -----------------------------------------------------------  ICL_Approved ---------------------------------
                size="small"
                value={ICL_Approved}
                InputLabelProps={{ shrink: true }}
                name="ICL_Approved"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="ICL Approved"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword26} edge="end">
                        <Icon icon={showCheckMark26 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // -----------------------------------------------------------  Payment_Method ---------------------------------
                size="small"
                value={Payment_Method}
                InputLabelProps={{ shrink: true }}
                name="Payment_Method"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="text"
                label="Payment Method"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- Payment_Confirmed -------------------------
                size="small"
                value={Payment_Confirmed}
                InputLabelProps={{ shrink: true }}
                name="Payment_Confirmed"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Payment Confirmed"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword27} edge="end">
                        <Icon icon={showCheckMark27 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- ETA -------------------------
                size="small"
                value={ETA}
                InputLabelProps={{ shrink: true }}
                name="ETA"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="ETA"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword28} edge="end">
                        <Icon icon={showCheckMark28 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------ Received_To_Port------------------------------
                InputLabelProps={{ shrink: true }}
                name="Received_To_Port"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Received_To_Port}
                fullWidth
                type="date"
                label="Received To Port"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword29} edge="end">
                        <Icon icon={showCheckMark29 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------- Port_Clearance -------------------------
                size="small"
                value={Port_Clearance}
                InputLabelProps={{ shrink: true }}
                name="Port_Clearance"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Port Clearance"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword30} edge="end">
                        <Icon icon={showCheckMark30 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // -------------------------------------------------------------------  Logistics_Remarks-------------------------
                InputLabelProps={{ shrink: true }}
                name="Logistics_Remarks"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Logistics_Remarks}
                fullWidth
                type="text"
                label="Logistics Remarks"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>