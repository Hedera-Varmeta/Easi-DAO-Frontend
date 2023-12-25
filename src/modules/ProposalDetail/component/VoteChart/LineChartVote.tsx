import dayjs from 'dayjs';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomizedDot from './CustomizedDot';
import { TimelineVote } from './VoteChart';

type Props = {
  data: TimelineVote[]
}

const LineChartVote = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis
          includeHidden
          dataKey="createdAt"
          // padding={{ left: 50 }}
          tickMargin={15}
          tickLine={false}
          tickFormatter={timeStr => dayjs(timeStr).format('MMM D, HH:mm')}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          type="number"
          padding={{ top: 30 }}
        />
        <Tooltip content={CustomTooltip} />
        <Line
          dataKey="sumForVotePower"
          stroke="var(--for-vote-color)"
          strokeWidth={2}
          activeDot={false}
          dot={(props) => <CustomizedDot {...props} showFor="For" />}
        />
        <Line
          dataKey="sumAgainstVotePower"
          stroke="var(--against-vote-color)"
          strokeWidth={2}
          activeDot={false}
          dot={(props) => <CustomizedDot {...props} showFor="Against" />}
        />
        <Line
          dataKey="sumAbstainVotePower"
          stroke="var(--abstain-vote-color)"
          strokeWidth={2}
          activeDot={false}
          dot={(props) => <CustomizedDot {...props} showFor="Abstain" />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartVote;