import { Modal, Box, Typography, Button } from "@mui/material";
import { TextField } from "../Forms/TextField";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { SelectField } from "../Forms/SelectField";
import { countriesConstants } from "../../utils/countries.constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserModal({ open, modalTitle, data, onSubmit, handleClose, isLoading }) {
  const { register, setValue, control, reset, handleSubmit } = useForm();

  useEffect(() => {
    if (Object.keys(data).length) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    } else {
      reset();
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ position: "absolute", top: 4, right: "0" }}>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography sx={{ mb: 2, fontSize: "24px", fontWeight: "600" }}>
          {modalTitle}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              id="name"
              register={register}
              label="Name"
              validationOpt={{ required: true }}
            />
            <TextField
              id="surname"
              register={register}
              label="Surname"
              validationOpt={{ required: true }}
            />
            <TextField
              id="number_phone"
              register={register}
              label="Phone number"
              validationOpt={{ required: true }}
            />
            {/* <TextField
              id="country"
              register={register}
              label="Country"
              validationOpt={{ required: true }}
            /> */}
            <SelectField id="country" label="Country" control={control} options={countriesConstants} />
            <TextField
              id="height"
              register={register}
              label="Height"
              validationOpt={{ required: true }}
              type="number"
            />
            <TextField
              id="weight"
              register={register}
              label="Weight"
              validationOpt={{ required: true }}
              type="number"
            />
            <LoadingButton loading={isLoading} type="submit">Submit</LoadingButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export { UserModal };
