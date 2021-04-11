import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: "100%",
    height: "440px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "static",
    justifyContent: "flex-end",
  },
  cardContent: {
    justifyContent: "space-between",
    height: "200px",
  },
  link: {
    color: "black",
    "&:hover": {
      color: "rgb(38, 38, 194)",
    },
  },
}));
