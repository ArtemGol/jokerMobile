import TeamList from './teamList';

const PastScreen = ({route}: {route: any}) => (
  <TeamList teamId={route.params.teamId} listType="past" />
);

export default PastScreen;
