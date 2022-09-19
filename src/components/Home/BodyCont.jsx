import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from '@material-ui/core';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { OrderList } from './order/OrderList';
import { OrderCont } from './order/OrderCont';

const styles = makeStyles({
  indicator: {
    background: 'none'
  },
  tabs: {
    border: '3px solid red'
  }
});

function TabPanel(props) {
  const { children, value = 0, index } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const MainContent = (props) => {
  const theme = useTheme();
  const { type, setType, day, setDay, time, setTime, timeList, setOrderList, userID, orderList } =
    props || {};

  const handleChange = (event, newValue) => {
    setType(newValue);
  };

  const handleChangeIndex = (index) => {
    setType(index);
  };

  return (
    <div>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <AppBar position="static">
          <Tabs
            className={styles.tabs}
            value={type}
            onChange={handleChange}
            sx={{ bgcolor: '#1BCFB4' }}
            textColor="inherit"
            variant="fullWidth"
            indicatorColor={''}
            aria-label="full width tabs example">
            <Tab label="Захиалах" />
            <Tab label="Захиалга" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={type}
          onChangeIndex={handleChangeIndex}>
          <TabPanel value={type} index={0} dir={theme.direction}>
            <OrderCont
              day={day}
              setDay={setDay}
              time={time}
              setTime={setTime}
              timeList={timeList}
              setOrderList={setOrderList}
              setType={setType}
              userID={userID}
            />
          </TabPanel>
          <TabPanel value={type} index={1} dir={theme.direction}>
            <OrderList orderList={orderList} setOrderList={setOrderList} userId={userID} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
};
