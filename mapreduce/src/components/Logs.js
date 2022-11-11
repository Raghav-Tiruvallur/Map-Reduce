import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LogItems from './LogItems';
import axios from 'axios'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Logs() {
  const [value, setValue] = React.useState(0);
  const [items,setItems]=React.useState([])
  const workers=["6000","6001","6002","6003","6004"]

  const getLogs=()=>{
    axios.get("http://localhost:5000/master/logs")
    .then(({data})=>{
      setItems(data.data)
      console.log("lol1",items)

    })
    console.log("items",items)
  }

  React.useEffect(()=>{
    getLogs()

  },[])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Worker 1" {...a11yProps(0)} />
        <Tab label="Worker 2" {...a11yProps(1)} />
        <Tab label="Worker 3" {...a11yProps(2)} />
        <Tab label="Worker 4" {...a11yProps(3)} />
        <Tab label="Worker 5" {...a11yProps(4)} />
        <Tab label="Worker 6" {...a11yProps(5)} />
        <Tab label="Worker 7" {...a11yProps(6)} />
        <Tab label="Worker 8" {...a11yProps(7)} />
        <Tab label="Worker 9" {...a11yProps(8)} />
        <Tab label="Worker 10" {...a11yProps(9)} />
      </Tabs>
      {
            items.map((item,idx)=>{
               return(
                <TabPanel value={value} index={idx}>
                <LogItems items={item}/>
                </TabPanel>
               )
            })
      }
      
    </Box>
  );
}
