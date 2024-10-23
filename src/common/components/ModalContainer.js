import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Grid2,
  Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./ModalContainer.css"; // Import your CSS file

const ModalContainer = ({
  open,
  onClose,
  title,
  content,
  imageUrl,
  imageAlt = "Preview image",
  enlargedImageSize = 1.5,
}) => {
  const [enlargedImageOpen, setEnlargedImageOpen] = useState(false);

  const handleImageClick = () => {
    setEnlargedImageOpen(true);
  };

  const handleCloseEnlargedImage = () => {
    setEnlargedImageOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        classes={{ paper: "modalPaper" }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" className="title">
              {title}
            </Typography>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Grid2 container spacing={2}>
            <Grid2
              sx={{ xs: 12, sm: 5 }}
              size={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {imageUrl ? (
                <Box className="previewContainer">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="image"
                    height={300}
                    onClick={handleImageClick}
                  />
                  <Typography className="italicText">
                    Click on the image to preview
                  </Typography>
                </Box>
              ) : (
                <Card className="noImageFoundContainer">
                  <Typography className="noImageText">
                    NO IMAGE FOUND
                  </Typography>
                </Card>
              )}
            </Grid2>

            <Grid2 sx={{ xs: 12, sm: 7 }}>
              <Box className="contentBox">{content}</Box>
            </Grid2>
          </Grid2>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end", pr: 3 }}>
          <Button onClick={onClose} className="closeButtonText">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {imageUrl && (
        <Dialog
          open={enlargedImageOpen}
          onClose={handleCloseEnlargedImage}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" className="title">
                Image Preview
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleCloseEnlargedImage}
                className="closeButton"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              padding: 2,
            }}
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              className="enlargedImage"
              style={{ width: `${enlargedImageSize * 100}%` }} // Inline style to apply dynamic width
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ModalContainer;
