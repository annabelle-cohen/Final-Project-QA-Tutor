import { makeStyles } from "@material-ui/core/styles";
import { CenterFocusStrong } from "@material-ui/icons";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    marginLeft: "200px",
    marginRight: "100px",
    paddingLeft: "20px",
  },
  root: {
    flexGrow: 1,
  },
}));
