import { IProposalItemResponse } from '@/api/proposal';
import Avatar from '@/components/Avatar';

interface CustomDotProps {
  cx: number;
  cy: number;
  payload: IProposalItemResponse;
  showFor: string;
}

const CustomizedDot = ({ cx, cy, payload, showFor }: CustomDotProps) => {

  if (payload.voteOptionName !== showFor) return null;

  return (
    <svg height="30" width="30" x={cx - 15} y={cy - 15}>
      <g>
        <foreignObject width={30} height={30}>
          <Avatar
            username={payload?.userUsername ?? ""}
            avatarUrl={payload?.userAvatarUrl ?? ""}
            sx={{ width: 30, height: 30 }}
          />
        </foreignObject>
      </g>
    </svg>
  );
};

export default CustomizedDot;