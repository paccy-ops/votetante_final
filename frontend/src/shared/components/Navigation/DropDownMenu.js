import React from 'react';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import profile from '../../images/profile.svg';

const DropDownMenu = (props) => {
  <PopupState variant='popover' popupId='demo-popup-menu'>
    {(popupState) => (
      <>
        <Button {...bindTrigger(popupState)}>
          <img className='image-profile' src={profile} alt='profile' />
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>Cake</MenuItem>
          <MenuItem onClick={popupState.close}>Death</MenuItem>
        </Menu>
      </>
    )}
  </PopupState>;
};

export default DropDownMenu;
