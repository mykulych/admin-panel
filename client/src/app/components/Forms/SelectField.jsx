import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";

function SelectField({ id, value, label, onChange, options }) {
  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        id={id}
        name={id}
        labelId={id}
        value={value || "default"}
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
    </Box>
  );
}

export { SelectField };
