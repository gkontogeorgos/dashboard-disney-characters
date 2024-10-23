import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import ModalContainer from "common/components/ModalContainer";

const CharacterModal = ({ character, open, onClose }) => {
  if (!character) return null;

  const content = (
    <>
      <Typography
        variant="subtitle1"
        sx={{ mt: 2 }}
        style={{ fontWeight: "bold" }}
      >
        TV Shows:
      </Typography>
      <List dense>
        {character.tvShows?.length > 0 ? (
          character.tvShows.map((show, index) => (
            <ListItem key={index}>
              <ListItemText primary={show} style={{ fontStyle: "italic" }} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="-" />
          </ListItem>
        )}
      </List>

      <Typography
        variant="subtitle1"
        sx={{ mt: 2 }}
        style={{ fontWeight: "bold" }}
      >
        Video Games:
      </Typography>
      <List dense>
        {character.videoGames?.length > 0 ? (
          character.videoGames.map((game, index) => (
            <ListItem key={index}>
              <ListItemText primary={game} style={{ fontStyle: "italic" }} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="-" />
          </ListItem>
        )}
      </List>
    </>
  );

  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      title={character.name}
      content={content}
      imageUrl={character.imageUrl}
    />
  );
};

export default CharacterModal;
