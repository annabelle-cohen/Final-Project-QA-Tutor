import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
    marginRight: "50px",
    top: -25,
    left: -30,
    position: "relative",
    zIndex: 1,
    color: "grey",
  },
  media: {
    height: 100,
    width: 100,
    paddingTop: "56.25%", // 16:9
    position: "relative",
    zIndex: -1,
  },
  title: {
    color: "black",
    "&:hover": {
      color: "blue",
    },
  },
}));
