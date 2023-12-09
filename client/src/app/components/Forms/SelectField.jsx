import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";

function SelectField({ id, control, label, options }) {
  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={id}
        control={control}
        render={({ field: {onChange, value} }) => (
          <Select
            id={id}
            name={id}
            labelId={id}
            value={value}
            onChange={onChange}
            sx={{
              width: "100%",
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Box>
  );
}

export { SelectField };
