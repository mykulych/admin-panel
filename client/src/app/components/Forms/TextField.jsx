import { TextField as Input } from "@mui/material";

function TextField({ id, register, validationOpt, label, type }) {
  return <Input {...register(id, validationOpt)} label={label} type={type} />;
}

export { TextField };
