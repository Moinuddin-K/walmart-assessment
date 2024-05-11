import React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <SearchBox>
      <TextField
        id="search-field"
        label="Search Items..."
        variant="outlined"
        value={searchQuery}
        onChange={handleInputChange}
        fullWidth
        sx={{
          maxWidth: "800px", 
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                aria-label="search" 
                sx={{
                  color: "white", 
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0", 
                  },
                  borderRadius: "50%", 
                  p: '10px' 
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </SearchBox>
  );
}

export default SearchBar;
