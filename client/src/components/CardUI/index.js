import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const CardItem = ({
  imageUrl,
  title,
  subtitle,
  description,
  onView,
  onEdit,
  onDelete,
}) => (
  <Card sx={{ maxWidth: 345, m: 2, boxShadow: 4, borderRadius: 2 }}>
    <CardMedia
      component="img"
      height="180"
      image={imageUrl || "/default-image.png"}
      alt={title}
      sx={{ objectFit: "scale-down", borderRadius: "2px 2px 0 0" }}
    />
    <CardContent>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
        }}
      >
        {description}
      </Typography>
    </CardContent>
    <Box display="flex" justifyContent="center" p={2}>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        onClick={onView}
      >
        View
      </Button>
      <Button
        size="medium"
        variant="contained"
        color="success"
        onClick={onEdit}
        sx={{ mx: 1 }}
      >
        Edit
      </Button>
      <Button
        size="medium"
        variant="contained"
        color="error"
        onClick={onDelete}
      >
        Delete
      </Button>
    </Box>
  </Card>
);

CardItem.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CardItem;
