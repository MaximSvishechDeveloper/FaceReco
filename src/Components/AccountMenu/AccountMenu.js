import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import AccountCircleFilledIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import Profile from "../Profile/Profile";

const AccountMenu = ({ user, onRouteChange, updateUserData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <AccountCircleFilledIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => setShowModal(true)}>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          View Profile
        </MenuItem>
        <MenuItem onClick={() => onRouteChange("signIn")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
      {showModal &&
        createPortal(
          <Modal>
            <Profile
              user={user}
              updateUserData={updateUserData}
              onClose={() => setShowModal(false)}
            ></Profile>
          </Modal>,
          document.body
        )}
    </React.Fragment>
  );
};

export default AccountMenu;
