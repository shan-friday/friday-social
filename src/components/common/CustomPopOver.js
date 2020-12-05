import React, { useState } from 'react';
import { Button, Popover, PopoverBody } from 'reactstrap';

const CustomPopOver = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Button id="Popover1" className={props.styles}>
        {props.buttonText}
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} hideArrow popperClassName="rounded-circle" target="Popover1" toggle={toggle}>
        {/* <div className="msg-arrow"></div> */}
        <PopoverBody>{props.children}</PopoverBody>
      </Popover>
    </div>
  );
}

export default CustomPopOver;