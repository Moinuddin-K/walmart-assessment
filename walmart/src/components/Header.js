import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from 'react-router-dom';
function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Walmart_Spark.svg/1925px-Walmart_Spark.svg.png"
          alt="Logo"
          style={{ height: "30px", width: "30px", margin: "10px" }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Walmart Inventory
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Search
        </Button>
        <Button color="inherit" component={RouterLink} to="/create">
          Create Item
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default Header;