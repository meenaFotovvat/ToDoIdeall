import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Home from "../pages/Home";

export default function Sidebar() {
  return (
    <List className="w-64">
      <ListItem component={Home}>
        <ListItemText primary="Coming soon" />
      </ListItem>
    </List>
  );
}
