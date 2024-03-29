import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrVNslator",
  description: "Vietnamese Translator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0}>
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                TrVNslator
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        {children}
      </body>
    </html>
  );
}
