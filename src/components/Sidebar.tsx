import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Sidebar() {
  return (
    <List className="w-64">
      <ListItem>
        <ListItemText primary="Coming soon" />
      </ListItem>
    </List>
  );
}
