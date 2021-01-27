import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Search from "@material-ui/icons/Search";
import { InputAdornment, TextField } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { FONT_SIZE } from "../constants/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#f2f2f2",
  },
  // necessary for content to be below app bar
  toolbar: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px 0px",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  textField: {
    backgroundColor: "white",
    fontSize: FONT_SIZE.medium,
    padding: 5,
    borderRadius: 4,
    borderBottom: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItem: {
    fontSize: FONT_SIZE.medium,
  },
}));

export default function Sidemenu(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <TextField
            InputProps={{
              classes: { root: classes.textField },
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="disabled" fontSize="small" />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            placeholder="Search"
          />
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                classes={{ primary: classes.listItem }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                classes={{ primary: classes.listItem }}
              />
            </ListItem>
          ))}
        </List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText
                primary="Starred"
                classes={{ primary: classes.listItem }}
              />
            </ListItem>
          </List>
        </Collapse>
      </Drawer>
      {props.children}
    </div>
  );
}
