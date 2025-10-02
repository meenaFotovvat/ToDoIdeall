import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      {/* Top bar */}
      <AppBar
        position="fixed"
        className="bg-white text-black shadow flex !flex-row !items-center justify-between"
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Typography
          variant="h6"
          className="!pr-[20px]"
        >
          To Do Ideall Web App
        </Typography>
      </AppBar>

      {/* Sidebar (temporary on mobile) */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Sidebar />
      </Drawer>

      {/* Main content */}
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
}
