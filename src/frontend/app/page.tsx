"use client"
// @refresh reset
import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([""]);

  useEffect(() => {
    const timeoutID = setTimeout(async () => {
      try {
        const { data } = await axios.post('http://172.16.10.110:8081/', {
          query: query,
        });
        setItems(data.items);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
      }

    }, 500);
    return () => clearTimeout(timeoutID);
  }, [query]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ width: '100%' }}>
          <Box>
            <Tabs
              value="en"
              aria-label="English"
            >
              <Tab value="en" label="English" />
            </Tabs>
            <TextField
              id="txt-content"
              multiline
              rows={5}
              sx={{ width: '100%' }}
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item md={6} sx={{ width: '100%' }}>
          <Box>
            <Tabs
              value="vn"
              aria-label="Vietnamese"
            >
              <Tab value="vn" label="Vietnamese" />
            </Tabs>

            <List disablePadding>
              {items.map((value, index) => (
                <ListItem key={index} sx={{ backgroundColor: '#f5f5f5', mb: '2px' }}>
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
