import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import "./styles.css";

const ProductAdd = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:8080/products', {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
        name, price, quantity
      })
    });
    navigate("/");
}

  return (
    <Container maxWidth="md">
      <Link to="/">
        <IconButton sx={{ justifyContent: "center" }} edge="end">
          <ArrowBackIcon sx={{ mt: 2 }} />
          <Typography sx={{ marginTop: "16px"}}>Back</Typography>
        </IconButton>
      </Link>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          mt: 20
        }}
        noValidate
        autoComplete="off"
      >
        <Card variant="outlined">
          <CardHeader
            title="Add a new item"
            titleTypographyProps={{
              gutterBottom: true,
              variant: "h5",
              color: "text.secondary"
            }}
          />
          <CardContent>
            <TextField
              id="outlined-required"
              label="Name"
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              id="outlined-number"
              label="Price"
              type="number"
              defaultValue={price}
              onChange={e => setPrice(e.target.value)}
            />
            <TextField
              id="outlined-number"
              label="Quantity"
              type="number"
              defaultValue={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="outlined" color="success" onClick={handleSubmit}>Submit</Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default ProductAdd;
