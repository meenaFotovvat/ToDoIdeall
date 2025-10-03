import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { type TAddTaskDialogProps } from "../../../types/taskTypes";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  createTask,
  fetchTasks,
} from "../taskSlice";

export default function AddTaskDialog({
  open,
  onClose,
}: TAddTaskDialogProps) {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [startDate, setStartDate] =
    useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] =
    useState<Dayjs | null>(dayjs());
  const [titleError, setTitleError] =
    useState("");
  const [descError, setDescError] = useState("");

  const handleSave = async () => {
    if (!title) return;
    const hasTitle = title.trim().length > 0;
    const hasDesc = description.trim().length > 0;
    setTitleError(
      hasTitle ? "" : "Title is required"
    );
    setDescError(
      hasDesc ? "" : "Description is required"
    );
    if (!hasTitle || !hasDesc) return;

    await dispatch(
      createTask({
        title,
        description,
        start_date: startDate
          ? startDate.toISOString()
          : "",
        end_date: endDate
          ? endDate.toISOString()
          : "",
      })
    );

    // Refresh list
    dispatch(fetchTasks({ page: 1, limit: 10 }));

    // reset form
    setTitle("");
    setDescription("");
    setStartDate(dayjs());
    setEndDate(dayjs());
    setTitleError("");
    setDescError("");

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2">
        <TextField
          className="!mt-5"
          label="Title"
          fullWidth
          value={title}
          required
          error={Boolean(titleError)}
          helperText={titleError || ""}
          onChange={(e) => {
            setTitle(e?.target?.value);
            if (e.target.value.trim())
              setTitleError("");
          }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          required
          error={Boolean(descError)}
          helperText={descError || ""}
          onChange={(e) => {
            setDescription(e.target.value);
            if (e.target.value.trim())
              setDescError("");
          }}
        />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
        >
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) =>
              setStartDate(date)
            }
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </LocalizationProvider>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={
            !title.trim() || !description.trim()
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
