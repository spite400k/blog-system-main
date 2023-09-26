import { ReactElement } from 'react';
import { List, ListItem, Stack, Tooltip, Typography } from '@mui/material';

export const Event = (args: any): ReactElement => {
  const event = args.event;
  const { title } = event;

  const CustomToolTip = ({ name }: any): ReactElement => {
    return (
      <Stack>
        <Typography variant="body1">{name}</Typography>
        <List>
          <ListItem>Category 1</ListItem>
          <ListItem>Category 2</ListItem>
          <ListItem>Category 3</ListItem>
          <ListItem>Category 4</ListItem>
        </List>
      </Stack>
    );
  };

  if (title === 'background') {
    const resource = event.getResources()[0].title;

    console.log(args);

    //args.backgroundColor = 'transparent';
    args.backgroundColor = '#FB9263';

    return (
      <Tooltip
        arrow
        placement="right"
        title={<CustomToolTip name={resource} />}>
        <div
          style={{
            height: '100%',
            width: '100%',
          }}>
          &nbsp;
        </div>
      </Tooltip>
    );
  }

  return <div>{title}</div>;
};
