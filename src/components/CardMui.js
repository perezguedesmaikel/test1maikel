import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import pcImage from "../images/computadoras2_11zon.webp";

export default function CardMui({ item, onDelete, setIsEdit }) {
  let f = new Date();

  return (
    <Card sx={{ maxWidth: 345 }} className="m-1">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Response to the test 1."
        subheader={
          "To day is" +
          f.getDate() +
          "/" +
          (f.getMonth() + 1) +
          "/" +
          f.getFullYear()
        }
      />
      <CardMedia component="img" height="194" image={pcImage} alt="test 1" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span className="text-info">Original phrase:</span>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span className="text-info">In alphabetical order:</span>
          {item.stringOrder}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => setIsEdit(true)}
        >
          <AiFillEdit className="text-info" />
        </IconButton>
        <IconButton aria-label="share" onClick={() => onDelete(item.id)}>
          <AiTwotoneDelete className={"delete"} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
