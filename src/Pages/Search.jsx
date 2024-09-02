import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

let SearchData = ({ allData }) => {
  const { searchquery } = useParams();
  const [filteredData, setFilteredData] = useState(allData);

  useEffect(() => {
    if (searchquery) {
      let regex = new RegExp(searchquery, 'i');
      setFilteredData(
        allData.filter((e) =>
          regex.test(e.name) ||
          regex.test(e.brand) ||
          regex.test(e.size) ||
          regex.test(e.price) ||
          regex.test(e.description)
        )
      );
    } else {
      setFilteredData(allData);
    }
  }, [searchquery, allData]);

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {filteredData.map((e) => (
        <React.Fragment key={e._id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={e.name} src={e.imageUrl} sx={{ width: "100%" }} />
            </ListItemAvatar>
            <ListItemText
              primary={e.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'block' }}
                  >
                    {e.brand}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'block' }}
                  >
                    {e.price}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'block' }}
                  >
                    {e.color}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'block' }}
                  >
                    {e.description}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

export default SearchData;