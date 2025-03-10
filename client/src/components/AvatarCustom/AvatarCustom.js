import { Avatar, styled, Tooltip } from "@mui/material";
import React from "react";
import "./AvatarCustom.scss";
import AvatarCard from "../AvatarCard/AvatarCard";
import { tooltipClasses } from "@mui/material";

const AvatarCardTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
  },
}));

const StyledAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;

  &:hover {
    background-color: #999;
    cursor: pointer;
  }
`;

export default function AvatarCustom({ children, user }) {
  return (
    <AvatarCardTooltip
      title={<AvatarCard user={user} />}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -14],
              },
            },
          ],
        },
      }}
    >
      {children ? children : <StyledAvatar src={user?.avatar} />}
    </AvatarCardTooltip>
  );
}
