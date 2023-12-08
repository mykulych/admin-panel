import { TextField as Input } from "@mui/material";

function TextField({ id, register, validationOpt, label }) {
  return <Input {...register(id, validationOpt)} label={label} />;
}

export { TextField };
